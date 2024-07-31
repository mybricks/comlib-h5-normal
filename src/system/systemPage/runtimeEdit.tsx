import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "@tarojs/components";
import css from "./styleEdit.less";
import cx from "classnames";
import DefaultNavigation from "../modules/defaultNavigation";
import CustomNavigation from "../modules/customNavigation";
import NoneNavigation from "../modules/noneNavigation";
import CustomTabBar from "../modules/customTabBar";
import { defaultSelectedIconPath, defaultNormalIconPath } from "./const";

export default function ({ env, data, inputs, outputs, slots }) {
  data.id = env.canvas.id;

  /**
   * 监听 tabBar 广播，更新 data
   */
  const onHandleTabBar = useCallback(
    (value) => {
      console.warn("监听到广播", env.canvas.id, value);
      data.tabBar = value;
    },
    [data.tabBar, env.canvas.id]
  );

  /**
   * 页面初始化
   */
  useEffect(() => {
    console.warn(`[systemPage] 页面初始化`, data.id);
    let defaultTabBar = window.__tabbar__?.get() ?? [];

    // 回滚
    if (data.tabBar.length > defaultTabBar.length) {
      // noop
      window.__tabbar__?.set(JSON.parse(JSON.stringify(data.tabBar)));
    } else {
      onHandleTabBar(defaultTabBar);
    }

    // 监听数据
    window.__tabbar__?.on(data.id, onHandleTabBar);
    return () => {
      // 这里顺序不能变，先 off 再 set，否则回滚操作会失效
      window.__tabbar__?.off(data.id, onHandleTabBar);
    };
  }, []);

  //
  let isContain = useCallback((sceneId, sceneList) => {
    return sceneList.find((item) => {
      return item.scene.id == sceneId;
    });
  }, []);

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

  // const editFinishRef = useRef();
  const tabBar = useMemo(() => {
    switch (useTabBar) {
      case 0:
        return null;
      case -1:
        return (
          <View className={css.tabBarErrorTip}>
            （标签页数量小于2，不显示底部标签栏）
          </View>
        );
      case -2:
        return (
          <View className={css.tabBarErrorTip}>
            （标签页数量大于5，不显示底部标签栏）
          </View>
        );
      default:
        return <CustomTabBar data={data} env={env} />;
    }
  }, [data, useTabBar]);

  const pageBackgroundStyle = useMemo(() => {
    let result = {};

    if (data.backgroundImage) {
      result["backgroundImage"] = `url(${data.backgroundImage})`;
    }

    if (data.backgroundSize) {
      result["backgroundSize"] = data.backgroundSize;
    }

    if (data.backgroundRepeat) {
      result["backgroundRepeat"] = data.backgroundRepeat;
    }

    if (data.backgroundPosition) {
      result["backgroundPosition"] = data.backgroundPosition;
    }

    if (data.background) {
      result["backgroundColor"] = data.background;
    }

    return result;
  }, [
    data.backgroundImage,
    data.backgroundSize,
    data.backgroundRepeat,
    data.backgroundPosition,
    data.background,
  ]);

  return (
    <View
      className={css.page}
      //自定义导航和隐藏导航，在这里配置背景
      style={{
        height: "100%",
        ...(data.useNavigationStyle !== "default" ? pageBackgroundStyle : {}),
      }}
    >
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
          <NoneNavigation env={env} data={data} />
        ) : null}
      </View>
      {/* Header end */}

      {/* content start*/}
      <View
        className={cx(css.content, { [css.edit]: env?.edit })}
        //导航栏为默认的时候，在这里配置背景
        style={data.useNavigationStyle === "default" ? pageBackgroundStyle : {}}
      >
        {slots["content"]?.render?.()}

        {/* 底部空间留存 */}
        {/* {data.bottomSpace ? (
          <View
            className={css.bottomSpace}
            style={{ height: `${data.bottomSpace}px` }}
          ></View>
        ) : null} */}
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
