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
import { Button, Text, Image, View } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import DynamicIcon from "../components/dynamic-icon";
import { isEmpty } from "./../utils/core";

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
    inputs?.["buttonText"]?.((val: string) => {
      data.text = val;
    });

    inputs?.["buttonImg"]?.((val: string) => {
      data.buttonImg = val;
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
      return (
        data.useBeforeIcon &&
        ((data.useBeforeIconImg && data.beforeIconUrl) ||
          (!data.useBeforeIconImg && data.beforeIcon))
      );
    }
  }, [
    env,
    data.useBeforeIcon,
    data.beforeIconUrl,
    data.useBeforeIconImg,
    data.beforeIcon,
  ]);

  const useAfterIcon = useMemo(() => {
    if (env.edit) {
      return data.useAfterIcon;
    } else {
      return (
        data.useAfterIcon &&
        ((data.useAfterIconImg && data.afterIconUrl) ||
          (!data.useAfterIconImg && data.afterIcon))
      );
    }
  }, [
    env,
    data.useAfterIcon,
    data.afterIconUrl,
    data.useAfterIconImg,
    data.afterIcon,
  ]);

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
      if (val === false) {
        data.disabled = false;
      } else {
        data.disabled = true;
      }
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

  const buttonStyle = useMemo(() => {
    if (!data?.useButtonImg) return;

    return {
      paddingLeft: 0,
      paddingRight: 0,
    };
  }, [data.useButtonImg]);

  return (
    <Button
      className={cx(
        css.button,
        data.disabled ? "mybricks-button-disable" : "mybricks-button"
      )}
      {...disabled}
      {...openType}
      style={buttonStyle}
    >
      {/* 前置 */}
      {useBeforeIcon && !data?.useButtonImg ? (
        <View
          style={{
            marginRight: !isEmpty(data.text) ? data.beforeIconSpacing ?? 8 : 0,
          }}
        >
          {!data?.useBeforeIconImg ? (
            <DynamicIcon
              name={data.beforeIcon ?? "HM_plus"}
              size={data.beforeIconSize ?? 16}
              color={data.beforeIconColor ?? "#fff"}
            />
          ) : (
            <Image
              className={cx("mybricks-beforeIcon", css.icon)}
              src={data.beforeIconUrl || extra?.imageUrl}
              mode="scaleToFill"
            />
          )}
        </View>
      ) : null}

      {!data?.useButtonImg ? (
        <Text className={cx(css.text, "mybricks-button-text")}>
          {data.text}
        </Text>
      ) : null}

      {data?.useButtonImg ? (
        <Image
          style={{ width: "100%", height: "100%" }}
          src={data.buttonImg}
        ></Image>
      ) : null}

      {/* 后置 */}
      {useAfterIcon && !data?.useButtonImg ? (
        <View
          style={{
            marginLeft: !isEmpty(data.text) ? data.afterIconSpacing ?? 8 : 0,
          }}
        >
          {!data?.useAfterIconImg ? (
            <DynamicIcon
              name={data.afterIcon ?? "HM_plus"}
              size={data.afterIconSize ?? 16}
              color={data.afterIconColor ?? "#fff"}
            />
          ) : (
            <Image
              className={cx("mybricks-afterIcon", css.icon)}
              src={data.afterIconUrl || extra?.imageUrl}
              mode="scaleToFill"
            />
          )}
        </View>
      ) : null}
    </Button>
  );
}
