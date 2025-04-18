import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { runRender } from "./utils";
import * as Taro from "@tarojs/components";
import * as TaroAPI from "@tarojs/taro";
import * as BrickdMobile from "brickd-mobile";
import dayjs from "dayjs";
import { View } from "@tarojs/components";
import F2ForTaro from "./f2-for-taro";
import { copyToClipboard } from "./utils/ai-code";
import css from "./runtime.less";

const ErrorStatus = ({ title = "未知错误", children = null, onError }) => {
  onError(title); //向外抛出错误

  return (
    <View style={{ color: "red" }}>
      {title}
      <br />
      {children}
    </View>
  );
};

const IdlePlaceholder = ({ examples = [] }) => {
  const copy = useCallback((text) => {
    copyToClipboard(text).then((res) => {
      window?.antd?.message
        ? window?.antd?.message.success("复制成功")
        : alert("复制成功");
    });
  }, []);

  const CopyIcon = useCallback(() => {
    return (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path
          d="M337.28 138.688a27.968 27.968 0 0 0-27.968 27.968v78.72h377.344c50.816 0 92.032 41.152 92.032 91.968v377.344h78.656a28.032 28.032 0 0 0 27.968-28.032V166.656a28.032 28.032 0 0 0-27.968-27.968H337.28z m441.408 640v78.656c0 50.816-41.216 91.968-92.032 91.968H166.656a92.032 92.032 0 0 1-91.968-91.968V337.28c0-50.816 41.152-92.032 91.968-92.032h78.72V166.656c0-50.816 41.152-91.968 91.968-91.968h520c50.816 0 91.968 41.152 91.968 91.968v520c0 50.816-41.152 92.032-91.968 92.032h-78.72zM166.656 309.312a27.968 27.968 0 0 0-27.968 28.032v520c0 15.424 12.544 27.968 27.968 27.968h520a28.032 28.032 0 0 0 28.032-27.968V337.28a28.032 28.032 0 0 0-28.032-28.032H166.656z"
          fill="#707070"
        ></path>
      </svg>
    );
  }, []);

  return (
    <View className={css.tip}>
      {/* <View className={css.title}>AI组件</View> */}
      <View className={css.content}>
        欢迎使用 MyBricks AI组件，
        <strong>请和我对话完成组件开发吧</strong>
      </View>

      <View className={css.examples}>
        {examples.map((example) => {
          return (
            <View
              className={css.example}
              key={example}
              onClick={() => copy(example)}
            >
              {example} <CopyIcon />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ({ env, data, inputs, outputs, slots, logger, id, onError }) => {
  const container = useRef(
    env.edit || env.runtime.debug
      ? document.querySelector("#_mybricks-geo-webview_")!.shadowRoot
      : null
  );
  useMemo(() => {
    if (env.edit) {
      data._editors = void 0;
    }
  }, []);

  const dynCss = useMemo(() => {
    const cssAPI = env.canvas?.css || {
      set() {},
      remove() {},
    };
    return {
      set(content) {
        const myContent = content.replace(/__id__/g, id); //替换模板
        cssAPI.set(id, myContent);
      },
      remove() {
        return cssAPI.remove(id);
      },
    };
  }, [env]);

  useMemo(() => {
    if (data._styleCode) {
      dynCss.set(decodeURIComponent(data._styleCode));
    }
  }, [data._styleCode, dynCss]);

  // useEffect(() => {
  //   return () => {
  //     dynCss.remove()
  //   }
  // }, [])

  const errorInfo = useMemo(() => {
    if (!!data._jsxErr) {
      return {
        title: "JSX 编译失败",
        tip: data._jsxErr,
      };
    }

    if (!!data._cssErr) {
      return {
        title: "Less 编译失败",
        tip: data._cssErr,
      };
    }
  }, [data._jsxErr, data._cssErr]);

  const ReactNode = useMemo(() => {
    if (errorInfo) return errorInfo.tip;
    if (data._renderCode) {
      console.log("ai: start");
      try {
        const oriCode = decodeURIComponent(data._renderCode);
        const com = runRender(oriCode, {
          react: React,
          "@tarojs/components": Taro,
          "@tarojs/taro": TaroAPI,
          mybricks: env.mybricksSdk,
          "f2-for-taro": F2ForTaro,
          "brickd-mobile": BrickdMobile,
          dayjs: dayjs,
        });
        return com;
      } catch (error) {
        console.log("ai 解析错误: ", error);
        console.log("ai 解析错误: ", error?.message);
        console.log("ai 解析错误: ", error?.toString());
        console.log("ai 解析错误: ", String(error));
        return error?.toString();
      }
    } else {
      if (env.edit) {
        return function () {
          return (
            <IdlePlaceholder
              examples={[
                "生成一个登录表单",
                "实现一个九宫格导航入口",
                "绘制一个图书馆书本借用次数的环形图",
                "用雷达图展示MBTI不同人格在男性女性间占比的对比",
              ]}
            />
          );
        };
      } else {
        return null;
      }
    }
  }, [data._renderCode, errorInfo]);

  const scope = useMemo(() => {
    return {
      data,
      inputs: new Proxy(
        {},
        {
          get(_, id) {
            if (env.runtime) {
              return (fn) => {
                inputs[id]((value, relOutputs) => {
                  fn(
                    value,
                    new Proxy(
                      {},
                      {
                        get(_, key) {
                          ///TODO
                        },
                      }
                    )
                  );
                });
              };
              return () => {};
            }
            return () => {};
          },
        }
      ),
      outputs: new Proxy(
        {},
        {
          get(obj, id) {
            if (env.runtime) {
              const rtn = outputs[id];

              if (rtn) {
                return rtn;
              }
            }

            return () => {};
          },
        }
      ),
      slots: new Proxy(
        {},
        {
          get(obj, id) {
            const rtn = slots[id];

            if (rtn) {
              return rtn;
            } else {
              return {
                render() {},
              };
            }
          },
        }
      ),
      env,
      context: { React },
      logger,
    };
  }, [slots]);

  return (
    <>
      {typeof ReactNode === "function" ? (
        <ReactNode {...scope} />
      ) : null
      // <ErrorStatus title={errorInfo?.title} onError={onError}>
      // {ReactNode}
      // </ErrorStatus>
      }
    </>
  );
};
