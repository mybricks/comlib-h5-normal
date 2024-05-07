import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import css from "./styleEdit.less";
import cx from "classnames";
import DefaultNavigation from "../modules/defaultNavigation";
import CustomNavigation from "../modules/customNavigation";
import NoneNavigation from "../modules/noneNavigation";
import CustomTabBar from "../modules/customTabBar";

export default function ({ env, data, inputs, outputs, slots }) {
  data.id = env.canvas.id;

  /**
   * 监听 tabBar 广播，更新 data
   */
  const onHandleTabBar = useCallback(
    (value) => {
      console.warn("监听到广播", value, env.canvas.id);
      data.tabBar = value;
    },
    [data.tabBar, env.canvas.id]
  );

  /**
   * 设置全局数据
   */
  useEffect(() => {
    let defaultTabBar = window.__tabbar__?.get() ?? [];
    data.tabBar = defaultTabBar;

    // 监听数据
    window.__tabbar__?.on(data.id, onHandleTabBar);
    return () => {
      // 这里顺序不能变，先 off 再 set，否则回滚操作会失效
      window.__tabbar__?.off(data.id, onHandleTabBar);
      refreshTabbar();
    };
  }, []);

  //
  let isContain = useCallback((sceneId, sceneList) => {
    return sceneList.find((item) => {
      return item.scene.id == sceneId;
    });
  }, []);

  const defaultTabItem = useMemo(() => {
    return {
      scene: {
        id: env.canvas.id,
      },
      text: "标签项",
      selectedIconPath:
        "data:image/png;base64,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",
      selectedIconStyle: {
        width: "22px",
        height: "22px",
      },
      selectedTextStyle: {
        fontSize: 12,
        color: "#FD6A00",
      },
      normalIconPath:
        "data:image/png;base64,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",
      normalIconStyle: {
        width: "22px",
        height: "22px",
      },
      normalTextStyle: {
        fontSize: 12,
        color: "#909093",
      },
    };
  }, [env.canvas.id]);

  useEffect(() => {
    // 获取最新的 tabbar 数据
    let globalTabBar = window.__tabbar__?.get() ?? [];

    if (data.useTabBar && !isContain(env.canvas.id, globalTabBar)) {
      // 标签页，但是不在 tabbar 里面
      // 添加到 tabbar 里面
      console.warn("～添加操作", env.canvas.id);
      globalTabBar.push(defaultTabItem);
    } else if (!data.useTabBar && isContain(env.canvas.id, globalTabBar)) {
      // 非标签页，但是在 tabbar 里面
      // 从 tabbar 里面删除
      console.warn("～删除操作", env.canvas.id);
      globalTabBar = globalTabBar.filter((item) => {
        return item.scene.id != env.canvas.id;
      });
    }

    window.__tabbar__?.set(JSON.parse(JSON.stringify(globalTabBar)));
  }, [data.useTabBar, env.canvas.id, defaultTabItem]);

  // 刷新 tabbar
  const refreshTabbar = useCallback(() => {
    if (env.canvas.isValid(env.canvas.id)) {
      return;
    }

    //
    console.warn("删除操作", env.canvas.id);
    let globalTabBar = window.__tabbar__?.get() ?? [];
    globalTabBar = globalTabBar.filter((item) => {
      return item.scene.id != env.canvas.id;
    });

    window.__tabbar__?.set(globalTabBar);
  }, [env.canvas.id]);

  const useTabBar = useMemo(() => {
    if (!data.useTabBar) {
      return 0;
    }
    if (data.tabBar.length < 2) {
      return -1;
    }
    if (data.tabBar.length > 5) {
      return -2;
    }
    let isContain = data.tabBar.find((item) => {
      return item.scene.id == env.canvas.id;
    });
    if (!isContain) {
      return 0;
    }
    return true;
  }, [data.useTabBar, data.tabBar, env.canvas.id]);

  const tabBar = useMemo(() => {
    switch (useTabBar) {
      case 0:
        return null;
      case -1:
        return (
          <View className={css.tabBarErrorTip}>
            标签页数量小于2，不显示底部标签栏
          </View>
        );
      case -2:
        return (
          <View className={css.tabBarErrorTip}>
            标签页数量大于5，不显示底部标签栏
          </View>
        );
      default:
        return <CustomTabBar data={data} env={env} />;
    }
  }, [data, useTabBar]);

  return (
    <View className={css.page} style={{ background: data.background }}>
      {/* Header start */}
      <View className={"mybricks-navigation"}>
        {/* 默认样式 */}
        {data.useNavigationStyle === "default" ? (
          <DefaultNavigation data={data} />
        ) : null}

        {/* 自定义导航栏 */}
        {data.useNavigationStyle === "custom" ? (
          <CustomNavigation env={env} data={data} slots={slots} />
        ) : null}

        {/* 隐藏导航栏 */}
        {data.useNavigationStyle === "none" ? (
          <NoneNavigation data={data} />
        ) : null}
      </View>
      {/* Header end */}

      {/* content start*/}
      <View
        className={cx(css.content, { [css.edit]: env?.edit })}
        style={
          {
            // background: data.backgroundColor,
          }
        }
      >
        {slots["content"]?.render?.()}
      </View>
      {/* content end*/}

      {/* Footer start */}
      {tabBar}
      {/* Footer end */}

      {!useTabBar && data.useFooter ? (
        <View className={cx(css.footer, "mybricks-footer")}>
          {slots["footerBar"]?.render?.({
            style: {
              minHeight: !slots["footerBar"].size ? "60px" : "unset",
            },
          })}
          {/* <View className={css.safearea}></View> */}
        </View>
      ) : null}

      {}
    </View>
  );
}
