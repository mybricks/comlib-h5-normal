import React, { useState, useCallback } from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isDesigner } from "../../utils/env";

export default function ({ env, data, inputs, outputs, slots }) {
  const app = Taro.getApp();

  const [status] = useState(app?.mybricks?.status);

  const onSuccess = useCallback(() => {
    if (data.myOnSuccess) {
      outputs["onSuccess"]();
    } else {
      setTimeout(() => {
        Taro.navigateBack({
          delta: 1,
        });
      }, 1000);
    }
  }, [data.myOnSuccess]);

  const signup = useCallback(
    (openid) => {
      return new Promise((resolved, rejected) => {
        Taro.request({
          url: `${status.callServiceHost}/runtime/api/auth/register`,
          method: "POST",
          data: {
            projectId: status.projectId,
            username: openid,
            password: openid,
          },
          success: (res) => {
            if (res?.data?.code === 1 && res.data.data && res.data.data.id) {
              Taro.setStorageSync("userInfo", {
                id: res.data.data.id,
              });

              Taro.showToast({
                title: `登录成功`,
                icon: "none",
                duration: 1000,
              });

              onSuccess();

              resolved(res.data.data);
            } else {
              rejected();
            }
          },
        });
      });
    },
    [onSuccess, status]
  );

  const signin = useCallback(
    (openid) => {
      return new Promise((resolved, rejected) => {
        Taro.request({
          url: `${status.callServiceHost}/runtime/api/auth/login`,
          method: "POST",
          data: {
            projectId: status.projectId,
            username: openid,
            password: openid,
          },
          success: (res) => {
            if (res?.data?.code === 1) {
              Taro.setStorageSync("userInfo", {
                id: res.data.data.id,
              });

              Taro.showToast({
                title: `登录成功`,
                icon: "none",
                duration: 1000,
              });

              onSuccess();

              resolved(res.data.data);
            } else {
              rejected();
            }
          },
        });
      });
    },
    [onSuccess, status]
  );

  const getOpenid = useCallback(() => {
    return new Promise((resolved, rejected) => {
      Taro.login({
        success: (res) => {
          let API = `${status?.callServiceHost}/runtime/api/domain/service/run`;

          Taro.request({
            url: API,
            method: "POST",
            data: {
              projectId: status?.appid,
              fileId: status?.appid,
              serviceId: "jscode2session",
              params: {
                code: res.code,
              },
            },
            success: (res) => {
              resolved(res.data.data.openid);
            },
            fail: () => {
              rejected();
            },
          });
        },
        fail: () => {
          rejected();
        },
      });
    });
  }, [status]);

  // 一键登录
  let isThrottled = false;

  const onLogin = () => {
    if (isThrottled) {
      return;
    }

    isThrottled = setTimeout(() => {
      _onLogin();
      isThrottled = false;
    }, 1000);
  };

  const _onLogin = useCallback(() => {
    if (!env.runtime) {
      return;
    }

    //
    if (env?.runtime.debug) {
      // mock 登录成功
      return;
    }

    Taro.showLoading({
      title: "登录中",
    });

    getOpenid()
      .then((openid) => {
        // 登录
        signin(openid)
          .then(() => {
            //noop
          })
          .catch(() => {
            // 登录失败，自动注册
            signup(openid)
              .then(() => {})
              .catch(() => {
                Taro.showToast({
                  title: `登录失败，请重试`,
                  icon: "none",
                  duration: 1000,
                });
              });
          });
      })
      .catch(() => {
        Taro.showToast({
          title: `登录失败，请重试`,
          icon: "none",
          duration: 1000,
        });
      });
  }, [env.runtime]);

  const onExit = useCallback(() => {
    if (!env.runtime) {
      return;
    }

    Taro.navigateBack({
      delta: 1,
    });
  }, [env.edit, env.runtime]);

  return (
    <View className={cx(css.login, { [css.edit]: isDesigner(env) })}>
      {data.useLogo && data.logo ? (
        <Image
          className={cx(css.logo, "mybricks-logo")}
          style={{ ...data.logoStyle }}
          src={data.logo}
        />
      ) : null}

      {data.useLoginSlot ? (
        slots["loginSlot"].size ? (
          <View className={css.loginSlot}>
            {slots["loginSlot"].render({
              style: data.loginSlotStyle,
            })}
          </View>
        ) : (
          <View className={css.emptySlot}>{slots["loginSlot"].render()}</View>
        )
      ) : (
        <View className={cx(css.button, "mybricks-button")} onClick={onLogin}>
          一键登录
        </View>
      )}

      <View className={cx(css.exit, "mybricks-exit")} onClick={onExit}>
        暂不登录
      </View>
    </View>
  );
}
