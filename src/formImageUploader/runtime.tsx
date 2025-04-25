import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Input, View, Button, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isNumber, isObject, isString, isEmpty } from "./../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { isDesigner, isH5 } from "../utils/env";
import { plus } from "./icon"

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    let result = [...val];

    // 如果是单选，且需要格式化为字符串
    if (data.maxCount == 1 && data.useValueString) {
      result = result[0] || "";
    }

    //
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: result,
    });

    //
    outputs["onChange"](result);
  });

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
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = [];
          break;
        }
        case isString(val):
          result = [val].filter((item) => !!item);
          break;

        case Array.isArray(val):
          result = val;
          break;

        default:
          // 其他类型的值，直接返回
          return;
      }

      setValue(result);
      outputRels["setValueComplete"]?.(result); // 表单容器调用 setValue 时，没有 outputRels
    });

    /* 获取值 */
    inputs["getValue"]((val, outputRels) => {
      let result = getValue();

      // 如果是单选，且需要格式化为字符串
      if (data.maxCount == 1 && data.useValueString) {
        result = result[0] || "";
      }

      outputRels["returnValue"](result);
    });

    /* 设置最大上传数量 */
    inputs["setMaxCount"]?.((val, outputRels) => {
      if (!isNumber(val) || val < 0) {
        return;
      }

      data.maxCount = val;

      if (val && value.length > val) {
        setValue(value.slice(0, val));
      }
    });

    inputs["resetValue"]?.((val, outputRels) => {
      setValue([]);
      outputRels["resetValueComplete"]?.()
    })

    // 上传完成
    slots["customUpload"]?.outputs["setFileInfo"]?.((filePath) => {
      if (!filePath && typeof filePath !== "string") {
        return;
      }

      let result = [filePath, ...value];
      result = result.slice(0, data.maxCount);
      setValue(result);
    });
  }, [value, data.maxCount]);

  useEffect(() => {
    //设置提示文本
    inputs["setPlaceholder"]?.((val, outputRels) => {
      data.placeholderText = val;
    });
  }, []);

  // const onChange = useCallback(
  //   (_value) => {
  //     let value = _value;

  //     // 如果是单选，且需要格式化为字符串
  //     if (data.maxCount == 1 && data.useValueString) {
  //       value = _value[0] || "";
  //     }

  //     parentSlot?._inputs["onChange"]?.({
  //       id: props.id,
  //       name: props.name,
  //       value,
  //     });
  //     outputs["onChange"](value);
  //   },
  //   [data.name, data.maxCount, data.useValueString]
  // );

  const onPreviewImage = useCallback((e, imageUrl) => {
    e.stopPropagation();
    Taro.previewImage({ urls: [imageUrl] });
  }, []);

  const onRemoveImage = useCallback(
    (e, index) => {
      e.stopPropagation();
      const newValue = value.filter((_, i) => i !== index);
      setValue(newValue);
    },
    [value]
  );

  const onChooseImage = useCallback(() => {
    if (env.edit) {
      return;
    }

    Taro.chooseImage({
      count: data.maxCount - value.length,
      sizeType: ["original", "compressed"],
      sourceType: isH5() ? ["album"] : ["album", "camera"],
      success: async (res) => {
        for (const tempFile of res.tempFiles) {
          console.log("tempFile", tempFile);

          let result = {
            filePath: tempFile.path,
            size: tempFile.size,
          };

          if (isH5()) {
            result.fileName = tempFile.originalFileObj?.name;
            result.type = tempFile.originalFileObj?.type;

            try {
              const response = await fetch(result.filePath);
              const blob = await response.blob();
              const formData = new FormData();
              formData.append(
                data.name ?? "name",
                blob,
                data.filename ?? "filename"
              );
              result.formData = formData;
            } catch (error) {
              console.error("Error fetching file:", error);
            }
          }

          slots["customUpload"]?.inputs["fileData"](result);
        }
      },
    });
  }, [env.edit, value, data.maxCount, slots["customUpload"]]);

  const onChooseAvatar = useCallback((res) => {
    let tempPath = res.detail.avatarUrl;
    slots["customUpload"]?.inputs["fileData"]({
      filePath: tempPath,
    });
  }, []);

  const uploader = useMemo(() => {
    if (data.maxCount && value.length >= data.maxCount) {
      return null;
    }

    if (data.chooseAvatar && !isDesigner(env)) {
      return (
        <View className={cx(css.uploader, css.card, "mybricks-square")}>
          <Button
            className={css.chooseAvatar}
            openType={"chooseAvatar"}
            onChooseAvatar={onChooseAvatar}
          ></Button>
        </View>
      );
    } else {
      return (
        <View
          className={cx(css.uploader, css.card, "mybricks-square")}
          onClick={onChooseImage}
        >
          {data.iconSlot ? (
            <View>{slots["iconSlot"]?.render({})}</View>
          ) : (
            <View className={cx(css.icon_placeholder,"mybricks-icon")}>+</View>
          )}
        </View>
      );
    }
  }, [env, value, data.maxCount, data.chooseAvatar, data.iconSlot]);

  const thumbnails = useMemo(() => {
    return value.map((raw, index) => {
      return (
        <View
          className={cx(css.item, css.card, "mybricks-square")}
          onClick={(e) => {
            onPreviewImage(e, raw);
          }}
          key={raw + "_" + index}
        >
          <Image
            className={css.thumbnail}
            mode={"aspectFill"}
            src={raw}
          ></Image>
          <View
            className={css.remove}
            onClick={(e) => {
              onRemoveImage(e, index);
            }}
          ></View>
        </View>
      );
    });
  }, [value]);

  const placeholder = useMemo(() => {
    if (!data.placeholder) return null;
    if (value.length > 0) return null;


    return (
      <View
        className={cx(css.placeholder, "mybricks-square")}
        onClick={(e) => {
          onPreviewImage(e, data.placeholder);
        }}
      >
        <Image
          className={css.thumbnail}
          mode={"aspectFill"}
          src={data.placeholder}
        ></Image>
        <View className={css.text}>示例图片</View>
      </View>
    );
  }, [data.placeholder,value]);

  const placeholderText = useMemo(() => {
    if (!data.placeholderText) return null;

    return <View className={css.placeholderText}>{data.placeholderText}</View>;
  }, [data.placeholderText]);

  return (
    <View className={css.value}>
      {uploader}
      {thumbnails}
      {placeholderText}
      {placeholder}
      {slots["customUpload"]?.render({
        style: {
          display: "none",
        },
      })}
    </View>
  );
}
