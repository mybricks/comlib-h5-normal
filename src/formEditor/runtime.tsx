import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { isNumber, isObject, isString, isEmpty } from "../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { Input } from "brickd-mobile";
import { View, Editor, Image } from "@tarojs/components";
import css from "./style.less";
import { isH5, isDesigner } from "../utils/env";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { undoIcon, redoIcon, boldIcon, imageIcon, videoIcon } from "./icons";
import { uuid } from "../utils/index";

const fixMalformedURI = (str) => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str
      .split("%")
      .map((s, index) => {
        if (index === 0) return s;
        try {
          return decodeURIComponent("%" + s);
        } catch (e) {
          return "%" + s;
        }
      })
      .join("");
  }
};

export default function (props) {
  const { id, env, data, inputs, outputs, slots, parentSlot } = props;

  const sanitizedId = useMemo(() => uuid(), []);
  const [contentPool, setContentPool] = useState(null);

  // 不能使用组件自己的id，因为放在模块里面后，使用多次这个模块，id都是不会变的
  // const sanitizedId = useMemo(() => {
  //   return "u" + id.toLowerCase().replace(/^u_/, "");
  // }, [id]);

  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    //
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: val,
    });

    //
    outputs["onChange"](val);
  });

  const [ready, setReady] = useState(false);
  const [useFixedToolbar, setUseFixedToolbar] = useState(false);
  const [useBold, setUseBold] = useState(false);

  useEffect(() => {
    parentSlot?._inputs["setProps"]?.({
      id: props.id,
      name: props.name,
      value: {
        visible: props.style.display !== "none",
      },
    });
  }, [props.style.display]);

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select(`.mybricks_com >>> .${sanitizedId}e`).boundingClientRect();

    env?.rootScroll?.onScroll?.((e) => {
      query.exec((res) => {
        // 编辑器顶部超过屏幕上方，底部未超过屏幕上方
        // toolbar 切换为 fixed，吸在屏幕顶部
        // 否则 toolbar 切换回 static
        if (res[0].top < 0 && res[0].bottom > 40) {
          setUseFixedToolbar(true);
        } else {
          setUseFixedToolbar(false);
        }
      });
    });
  }, [sanitizedId]);

  /**
   * 生命周期
   */
  useEffect(() => {
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = "";
          break;
        }
        case isString(val): {
          try {
            result = decodeURIComponent(fixMalformedURI(val));
          } catch (e) {
            result = val;
          }
          break;
        }
        default:
          // 其他类型的值，直接返回
          return;
      }

      if (ready) {
        editorRef.current?.setContents({
          html: result,
          success: () => {
            setValue(result);
            outputRels["setValueComplete"]?.(result); // 表单容器调用 setValue 时，没有 outputRels
          },
        });
      } else {
        setContentPool({
          value: result,
          output: outputRels["setValueComplete"],
        });
      }
    });

    /* 获取值 */
    inputs["getValue"]((val, outputRels) => {
      editorRef.current?.getContents({
        success: (res) => {
          outputRels["returnValue"](res.html);
        },
      });
    });

    /* 重置值 */
    inputs["resetValue"]((val, outputRels) => {
      editorRef.current?.setContents({
        html: "",
        success: () => {
          setValue("");
          outputRels["resetValueComplete"]?.("");
        },
      });
    });

    /* 设置标题 */
    inputs["setLabel"]?.((val) => {
      if (!isString(val)) {
        return;
      }

      parentSlot?._inputs["setProps"]?.({
        id: props.id,
        name: props.name,
        value: {
          label: val,
        },
      });
    });

    /* 设置提示内容 */
    inputs["setPlaceholder"]((val) => {
      data.placeholder = val;
    });

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, [ready]);

  /**
   * Editor
   */
  const editorRef = useRef(null);

  /**
   * Toolbar
   */
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // 上传图片、视频
  useEffect(() => {
    // 图片上传完成
    slots["uploadImage"]?.outputs["setFileInfo"]?.((filePath) => {
      if (!filePath && typeof filePath !== "string") {
        return;
      }

      editorRef.current.insertImage({
        src: filePath,
        width: "100%",
        extClass: "editor-image",
        success: () => {
          // 插入成功
          editorRef.current.getContents({
            success: (res) => {
              setValue(res.html);
            },
          });
        },
      });
    });

    // 插件
    data.plugins.forEach((plugin) => {
      slots[plugin._id]?.outputs["insert"]?.((val) => {
        if (!val.src && typeof val.src !== "string") {
          return;
        }

        editorRef.current.insertImage({
          src: val.src,
          data: val.data || {},
          width: "100%",
          extClass: "custom-image",
          success: () => {
            // 插入成功
            editorRef.current.getContents({
              success: (res) => {
                setValue(res.html);
              },
            });
          },
        });
      });
    });
  }, [data.plugins]);

  // 监听键盘高度变化
  // const onKeyboardHeightChangeHandler = useCallback(({ height }) => {
  //   let ratio = Taro.getSystemInfoSync().windowWidth / 375;
  //   let _keyboardHeight = height / ratio;
  //   setKeyboardHeight(_keyboardHeight - 50);
  // }, []);

  // useEffect(() => {
  //   Taro.eventCenter.on(
  //     "onKeyboardHeightChange",
  //     onKeyboardHeightChangeHandler
  //   );

  //   return () => {
  //     Taro.eventCenter.off(
  //       "onKeyboardHeightChange",
  //       onKeyboardHeightChangeHandler
  //     );x
  //   };
  // }, []);

  const onChange = (e) => {
    if (!ready || !editorRef.current) {
      console.log("编辑器未准备好");
      return;
    }
    // console.log("内容变更",editorRef.current)
    editorRef.current.getContents({
      success: (res) => {
        setValue(res.html);
      },
    });
  };

  const onStatusChange = (e) => {
    // console.log("onStatusChange", e.mpEvent.detail?.bold);
    if (e.mpEvent.detail?.bold == "strong") {
      setUseBold(true);
    } else {
      setUseBold(false);
    }
  };

  const onBlur = useCallback((e) => {
    outputs["onBlur"]();
  }, []);

  /**
   * 插件
   */

  // 插入图片
  const insertImage = useCallback(() => {
    if (!env.runtime) {
      return;
    }
    editorRef.current.blur();

    Taro.chooseImage({
      count: data.maxImageCount,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        res.tempFiles.forEach((tempFile) => {
          let result = {
            filePath: tempFile.path,
            size: tempFile.size,
          };
          slots["uploadImage"].inputs["fileData"](result);
        });
      },
    });
  }, [env.runtime, data.maxImageCount]);

  // 插件点击
  const onClickPluginItem = useCallback((plugin) => {
    slots[plugin._id]?.inputs["onClick"]?.();
  }, []);

  const onEditorReady = useCallback(() => {
    console.log("onEditorReady-contentPool", contentPool, sanitizedId);
    //需要用deep selector，不然放在表单容器中，嵌套太深会选不到
    Taro.createSelectorQuery()
      .select(`.mybricks_com >>> .${sanitizedId}e`)
      ?.context?.((res) => {
        console.log("onEditorReady-context", res);
        if (res == null) {
          console.log("onEditorReady-为空");
        }
        editorRef.current = res.context;
        setReady(true);

        // 如果有内容池，则设置内容
        if (contentPool?.value) {
          editorRef.current.setContents({
            html: contentPool.value,
            success: () => {
              setValue(contentPool.value);
              contentPool.output?.(contentPool.value); // 表单容器调用 setValue 时，没有 outputRels
            },
          });
        }
      })
      .exec();
  }, [contentPool, sanitizedId]);

  useEffect(() => {
    console.log("onEditorReady-contentPool", contentPool, sanitizedId);
    //需要用deep selector，不然放在表单容器中，嵌套太深会选不到
    Taro.createSelectorQuery()
      .select(`.mybricks_com >>> .${sanitizedId}e`)
      ?.context?.((res) => {
        console.log("onEditorReady-context", res);
        if (res == null) {
          console.log("onEditorReady-重试");
        }
        editorRef.current = res.context;
        setReady(true);

        // 如果有内容池，则设置内容
        if (contentPool?.value) {
          editorRef.current.setContents({
            html: contentPool.value,
            success: () => {
              setValue(contentPool.value);
              contentPool.output?.(contentPool.value); // 表单容器调用 setValue 时，没有 outputRels
            },
          });
        }
      })
      .exec();
  }, [contentPool, sanitizedId]);

  const toggleBold = () => {
    if (!ready) {
      return;
    }
    editorRef.current?.format?.("bold");
    // setUseBold((prev) => {
    //   console.log("editorRef.current", editorRef.current);
    //   return !prev;
    // });
  };

  const undo = useCallback(() => {
    if (!ready) {
      return;
    }

    editorRef.current?.undo?.();
  }, [ready]);

  const redo = useCallback(() => {
    if (!ready) {
      return;
    }

    editorRef.current?.redo?.();
  }, [ready]);

  return (
    <View
      id={sanitizedId}
      className={cx({
        [css.editor]: true,
        "mybricks-editor": true,
      })}
    >
      {/* Toolbar */}
      <View
        id={`${sanitizedId}t`}
        className={cx({
          [css.toolbar]: true,
          [css.fixed]: useFixedToolbar,
          "mybricks-toolbar": true,
        })}
      >
        <View
          className={cx({
            [css.item]: true,
            [css.active]: useBold,
          })}
          onClick={toggleBold}
        >
          <Image
            className={cx("mybricks-boldIcon", css.icon)}
            src={data.boldIconUrl || boldIcon}
            svg={true}
          ></Image>
        </View>
        <View className={css.item} onClick={insertImage}>
          <Image
            className={cx("mybricks-imgIcon", css.icon)}
            src={data.imgIconUrl || imageIcon}
            svg={true}
          ></Image>
        </View>

        {/* 扩展 */}
        {data.plugins?.map((plugin) => {
          return (
            <View
              className={css.item}
              onClick={(e) => {
                e.stopPropagation();
                onClickPluginItem(plugin);
              }}
            >
              <Image className={css.icon} src={plugin.icon} svg={true}></Image>
            </View>
          );
        })}

        {data.showUndoRedo && (
          <>
            <View className={css.divider}></View>
            <View className={css.item} onClick={undo}>
              <Image
                className={cx("mybricks-backward", css.icon)}
                src={data.backwardIconUrl || undoIcon}
                svg={true}
              ></Image>
            </View>
            <View className={css.item} onClick={redo}>
              <Image
                className={cx("mybricks-forward", css.icon)}
                src={data.forwardIconUrl || redoIcon}
                svg={true}
              ></Image>
            </View>
          </>
        )}
      </View>
      <View className={css.placeholder}></View>

      {/* Editor */}
      <Editor
        // id={`${sanitizedId}e`}
        className={cx({
          [css.input]: true,
          "mybricks-input": true,
          [`${sanitizedId}e`]: true,
        })}
        showImgSize={true}
        showImgResize={true}
        showImgToolbar={true}
        value={value}
        type={data.type}
        placeholder={data.placeholder}
        disabled={data.disabled}
        onBlur={onBlur}
        onReady={onEditorReady}
        onInput={onChange}
        onStatusChange={onStatusChange}
      >
        该组件仅支持在微信小程序中运行
      </Editor>

      {slots["uploadImage"]?.render({
        style: {
          display: "none",
        },
      })}

      {data.plugins?.map((plugin) => {
        return slots[plugin._id]?.render({
          style: {
            display: "none",
          },
        });
      })}
    </View>
  );
}
