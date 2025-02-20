import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import css from "./style.less";
import { ButtonType } from "./constant";
import cx from "classnames";
import { Button, Text, Image } from "@tarojs/components";
import * as Taro from "@tarojs/taro";

export default function ({
  env,
  data,
  logger,
  slots,
  inputs,
  outputs,
  title,
  extra,
}) {
  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    inputs["buttonText"]((val: string) => {
      data.text = val;
    });
  }, []);

  const openType = useMemo(() => {
    switch (true) {
      case data.openType === "getPhoneNumber": {
        return {
          openType: "getPhoneNumber",
          onGetPhoneNumber: (e) => {
            if (!!e.detail.errno) {
              outputs["getPhoneNumberFail"]({
                ...e.detail,
              });
            } else {
              outputs["getPhoneNumberSuccess"]({
                ...e.detail,
              });
            }
          },
        };
      }

      case data.openType === "getRealtimePhoneNumber": {
        return {
          openType: "getRealtimePhoneNumber",
          onGetRealtimePhoneNumber: (e) => {
            if (!!e.detail.errno) {
              outputs["getRealtimePhoneNumberFail"]({
                ...e.detail,
              });
            } else {
              outputs["getRealtimePhoneNumberSuccess"]({
                ...e.detail,
              });
            }
          },
        };
      }

      case data.openType === "share": {
        return {
          openType: "share",
          onClick: (e) => {
              outputs["share"]({
                ...e.detail,
              });
          },
        };
      }

      case data.openType === "contact": {
        return {
          openType: "contact",
          onContact: (e) => {
            outputs["onContact"]({
              ...e.detail,
            });
          },
        };
      }

      case data.openType === "feedback": {
        return {
          openType: "feedback",
        };
      }

      case data.openType === "openSetting": {
        return {
          openType: "openSetting",
          // onClick: (e) => {
          //   if (env.runtime) {
          //     e.stopPropagation();
          //     outputs["onClick"](data.text);
          //   }
          // },
        };
      }

      case data.openType === "chooseAvatar": {
        return {
          openType: "chooseAvatar",
          onChooseAvatar: (e) => {
            outputs["chooseAvatarSuccess"](e.mpEvent.detail.avatarUrl);
          },
          // onClick: (e) => {
          //   if (env.runtime) {
          //     e.stopPropagation();
          //     outputs["onClick"](data.text);
          //   }
          // },
        };
      }

      default: {
        return {
          onClick: (e) => {
            if (env.runtime && !data.disabled) {
              if (outputs["onClick"].getConnections().length) {
                e.stopPropagation();
              }

              outputs["onClick"](data.text);
            }
          },
        };
      }
    }
  }, [data.openType, data.text, env.runtime, data.disabled]);

  const useBeforeIcon = useMemo(() => {
    if (env.edit) {
      return data.useBeforeIcon;
    } else {
      return data.useBeforeIcon && data.beforeIconUrl;
    }
  }, [env, data.useBeforeIcon, data.beforeIconUrl]);

  const useAfterIcon = useMemo(() => {
    if (env.edit) {
      return data.useAfterIcon;
    } else {
      return data.useAfterIcon && data.afterIconUrl;
    }
  }, [env, data.useAfterIcon, data.afterIconUrl]);

  const disabled = useMemo(() => {
    if (data.disabled) {
      return {
        disabled: true,
      };
    } else {
      return {};
    }
  }, [data.disabled]);

  // input禁用按钮
  useEffect(() => {
    inputs["setDisabled"]?.((val, relOutputs) => {
      data.disabled = !!val;
      relOutputs["setDisabledSuccess"]?.(val);
    });
  }, []);

  // input启用按钮
  useEffect(() => {
    inputs["setEnabled"]?.((val, relOutputs) => {
      data.disabled = false;
      relOutputs["setEnabledSuccess"]?.(val);
    });
  }, []);

  return (
    <Button
      className={cx(
        css.button,
        data.disabled ? "mybricks-button-disable" : "mybricks-button"
      )}
      {...disabled}
      {...openType}
    >
      {/* 前置 */}
      {useBeforeIcon ? (
        <Image
          className={cx("mybricks-beforeIcon", css.icon)}
          src={data.beforeIconUrl || extra?.imageUrl}
          mode="scaleToFill"
        />
      ) : null}

      <Text className={css.text}>{data.text}</Text>

      {/* 后置 */}
      {useAfterIcon ? (
        <Image
          className={cx("mybricks-afterIcon", css.icon)}
          src={data.afterIconUrl || extra?.imageUrl}
          mode="scaleToFill"
        />
      ) : null}
    </Button>
  );
}
