import React, { useMemo } from "react";
import * as Taro from "@tarojs/components";
import * as TaroAPI from "@tarojs/taro";
import { View } from "@tarojs/components";
import { isH5 } from "../utils/env";
import H5 from "./h5";
import F2ForTaro from "./f2-for-taro";
import * as BrickdMobile from "brickd-mobile";
import dayjs from "dayjs";

function getComponent(render, require) {
  const exports = {
    default: null,
  };

  render(exports, (key) => {
    return require[key];
  });

  return exports.default;
}

export default ({ env, data, inputs, outputs, slots, logger, id, onError }) => {
  if (isH5()) {
    return (
      <H5
        env={env}
        data={data}
        inputs={inputs}
        outputs={outputs}
        slots={slots}
        logger={logger}
        id={id}
        onError={onError}
      />
    );
  }

  const ReactNode = useMemo(() => {
    try {
      let render = env.mybricksSdk.render(id);

      if (typeof render === "string") {
        return <View>{render}</View>;
      }

      const Render = getComponent(render, {
        react: React,
        mybricks: env.mybricksSdk,
        "@tarojs/components": Taro,
        "@tarojs/taro": TaroAPI,
        "f2-for-taro": F2ForTaro,
        "brickd-mobile": BrickdMobile,
        dayjs: dayjs,
      });

      if (!Render) {
        return null;
      }

      return (
        <Render
          data={data}
          inputs={
            new Proxy(
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
            )
          }
          outputs={
            new Proxy(
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
            )
          }
          slots={
            new Proxy(
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
            )
          }
          env={env}
          context={{ React }}
          logger={logger}
        />
      );
    } catch (error) {
      console.error(`mybricks.taro.ai - ${id} - 组件渲染错误: `, error);
      return <View></View>;
    }
  }, []);

  return ReactNode;
};
