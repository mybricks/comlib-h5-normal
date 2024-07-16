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
import MyBricksNavigation from "../modules/MyBricksNavigation";
import { defaultSelectedIconPath, defaultNormalIconPath } from "./const";
import { getNavigationHeight } from "../../utils";

export default function (props) {
  const { env, data, inputs, outputs, slots } = props;

  // 设置页面 id
  data.id = env.canvas.id;

  /**
   * 监听 tabBar 广播，更新 data
   */
  const onHandleTabBar = useCallback(
    (value) => {
      // console.warn("监听到广播", value, env.canvas.id);
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
      selectedIconPath: defaultSelectedIconPath,
      selectedIconStyle: {
        width: "22px",
        height: "22px",
      },
      selectedTextStyle: {
        fontSize: 12,
        color: "#FD6A00",
      },
      normalIconPath: defaultNormalIconPath,
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
    <View className={css.page}>
      {/* 导航栏开始 */}
      <React.Fragment>
        {data.useNavigation ? (
          <View className={"mybricks-navigation"}></View>
        ) : (
          <View className={"mybricks-navigation"}></View>
        )}
      </React.Fragment>

      {/* 导航栏结束 */}

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
