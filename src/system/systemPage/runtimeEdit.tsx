import React, { useCallback, useEffect, useMemo } from "react";
import { View } from "@tarojs/components";
import css from "./styleEdit.less";
import cx from "classnames";
import DefaultNavigation from "../modules/defaultNavigation";
import CustomNavigation from "../modules/customNavigation";
import CustomTabBar from "../modules/customTabBar";

export default function ({ env, data, inputs, outputs, slots }) {
  // 监听画布被删除
  if (!env.canvas.isValid(env.canvas.id)) {
    console.error("画布被删除", env.canvas.id);

    let defaultTabBar = window.__tabbar__.get();
    let tabBar = defaultTabBar.filter((item) => {
      return item.scene.id != env.canvas.id;
    });
    window.__tabbar__.set(tabBar);
  }

  data.id = data.id || env.canvas.id;

  /**
   * 监听 tabBar 广播，更新 data
   */
  const onHandleTabBar = useCallback((value) => {
    data.tabBar = value;
  }, []);

  /**
   * 设置全局数据
   */
  useEffect(() => {
    let defaultTabBar = window.__tabbar__.get();
    data.tabBar = defaultTabBar;

    // 监听数据
    window.__tabbar__.on(data.id, onHandleTabBar);
    return () => {
      window.__tabbar__.off(data.id, onHandleTabBar);
    };
  }, []);

  const useTabBar = useMemo(() => {
    if (!data.useTabBar) {
      return false;
    }
    if (data.tabBar.length < 2 || data.tabBar.length > 5) {
      return false;
    }
    let isContain = data.tabBar.find((item) => {
      return item.scene.id == env.canvas.id;
    });
    if (!isContain) {
      return false;
    }
    return true;
  }, [data.useTabBar, data.tabBar, env.canvas.id]);

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
        {data.useNavigationStyle === "none" ? null : null}
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
      {useTabBar ? <CustomTabBar data={data} env={env} /> : null}
      {/* Footer end */}

      {!useTabBar && data.useFooter ? (
        <View className={cx(css.footer, "mybricks-footer")}>
          {slots["footerBar"]?.render?.()}
          <View className={css.safearea}></View>
        </View>
      ) : null}
    </View>
  );
}
