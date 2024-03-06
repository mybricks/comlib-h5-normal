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

export default function ({ env, data, logger, slots, inputs, outputs, title }) {
  const onClick = useCallback((ev) => {
    if (env.runtime) {
      ev.stopPropagation();
      outputs["onClick"](true);
    }
  }, []);

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

      default: {
        return {
          onClick: (e) => {
            if (env.runtime) {
              e.stopPropagation();
              outputs["onClick"](data.text);
            }
          },
        };
      }
    }
  }, [data.openType, data.text, env.runtime]);

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

  return (
    <Button className={cx(css.button, "mybricks-button")} {...openType}>
      {/* 前置 */}
      {useBeforeIcon ? (
        <Image
          className={cx("mybricks-beforeIcon", css.icon)}
          src={data.beforeIconUrl || data.placeholderIconUrl}
          mode="scaleToFill"
        />
      ) : null}

      <Text className={css.text}>{data.text}</Text>

      {/* 后置 */}
      {useAfterIcon ? (
        <Image
          className={cx("mybricks-afterIcon", css.icon)}
          src={data.afterIconUrl || data.placeholderIconUrl}
          mode="scaleToFill"
        />
      ) : null}
    </Button>
  );
}
