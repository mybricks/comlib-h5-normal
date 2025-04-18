import React, {
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View, ScrollView, Image } from "@tarojs/components";
import { useShareAppMessage } from "@tarojs/taro";
import * as Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";
import DefaultNavigation from "../modules/defaultNavigation";
import CustomNavigation from "../modules/customNavigation";
import NoneNavigation from "../modules/noneNavigation";
import CustomTabBar from "../modules/customTabBar";
import { isH5, isDesigner } from "../../utils/env";

const isIOS = Taro.getSystemInfoSync().platform === "ios";

const defaultMenuButtonBoundingClientRect = {
  width: 87,
  height: 32,
  top: 48,
  right: 368,
  bottom: 80,
  left: 281,
};

const usePullDownRefresh = ({
  enabled = false,
  onLoad,
  setDisableScrollWhenPulling,
}) => {
  const [state, setState] = useState({
    refresherTriggered: false,
  });

  const onLoadRef = useRef(() => Promise.resolve());
  const loading = useRef(false);

  useEffect(() => {
    onLoadRef.current = onLoad;
  }, [onLoad]);

  const onRefresh = useCallback(() => {
    if (loading.current) {
      return;
    }

    setState({ refresherTriggered: true });

    loading.current = true;
    onLoadRef.current?.();
  }, []);

  const cancelPullRefresh = useCallback(() => {
    loading.current = false;
    setState({ refresherTriggered: false });
  }, []);

  // const onRestore = useCallback(() => {
  //   setState({ refresherTriggered: false })
  // }, [])

  if (!enabled) {
    return {
      cancelPullRefresh,
      refresherEnabled: false,
    };
  }

  return {
    cancelPullRefresh,
    refresherEnabled: true,
    refresherThreshold: 100,
    refresherDefaultStyle: "black",
    refresherBackground: "transparent",
    refresherTriggered: state.refresherTriggered,
    onRefresherRefresh: onRefresh,
    onRefresherPulling: (e) => {
      // 下拉时，禁止 scroll-view 滚动
      setDisableScrollWhenPulling(true);
    },
    onRefresherStatusChange: (e) => {
      console.log("onRefresherStatusChange", e.detail);
      if (e.detail === "releasing") {
        Taro.vibrateShort();
      }
    },
    onRefresherRestore: (e) => {
      console.log("onRefresherRestore", e.detail);
      setDisableScrollWhenPulling(false);
    },
    onRefresherAbort: (e) => {
      console.log("onRefresherAbort", e.detail);
      setDisableScrollWhenPulling(false);
    },
    // onRefresherRestore: onRestore,
  };
};

export default function (props) {
  const { id, env, data, inputs, outputs, slots } = props;
  const [ready, setReady] = useState(false);

  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef(null);

  const scrollRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const [disableScrollWhenPulling, setDisableScrollWhenPulling] =
    useState(false);

  /**
   * 监听页面重新显示、隐藏
   */
  useEffect(() => {
    Taro.eventCenter.on("pageDidShow", ({ path, query }) => {
      if (path.indexOf(env.canvas.id) === -1) {
        return;
      }
      outputs["pageDidShow"]?.({ ...query });
    });

    Taro.eventCenter.on("pageDidHide", ({ path, query }) => {
      if (path.indexOf(env.canvas.id) === -1) {
        return;
      }
      outputs["pageDidHide"]?.({ ...query });
    });
  }, []);

  useEffect(() => {
    if (isDesigner(env)) {
      return;
    }

    if (!footerRef.current) {
      return;
    }

    const query = Taro.createSelectorQuery();
    query.select(`#${id} .mybricks-footer`).boundingClientRect();
    query.exec((res) => {
      if (res[0]) {
        let windowWidth = isDesigner(env)
          ? 315
          : Taro.getSystemInfoSync().windowWidth;
        let height = (res[0].height / windowWidth) * 375;
        console.log("footerHeight", height);
        setFooterHeight(height);
      }
    });
  }, [footerRef.current]);

  // 获取菜单按钮的布局位置信息
  const relativeRect = useMemo(() => {
    if (isDesigner(env)) {
      return defaultMenuButtonBoundingClientRect;
    } else {
      let boundingClientRect = Taro.getMenuButtonBoundingClientRect();
      let ratio = Taro.getSystemInfoSync().windowWidth / 375;

      return {
        width: boundingClientRect.width / ratio,
        height: boundingClientRect.height / ratio,
        top: boundingClientRect.top / ratio,
        right: boundingClientRect.right / ratio,
        bottom: boundingClientRect.bottom / ratio,
        left: boundingClientRect.left / ratio,
      };
    }
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
  }, [data.useTabBar, data.tabBar, env.canvas.id, data.id]);

  useEffect(() => {
    env.useTabBar = useTabBar;
  }, [useTabBar]);

  const onLoad = useCallback(() => {
    outputs["pulldown"]?.(true);
  }, []);

  const [scrollToProps, setScrollToProps] = useState<any>({
    scrollWithAnimation: false,
    scrollAnimationDuration: 0,
    scrollIntoView: "u_000none",
    scrollTop: 0,
  });

  const { cancelPullRefresh, ...pulldownProps } = usePullDownRefresh({
    enabled: data.enabledPulldown,
    onLoad,
    setDisableScrollWhenPulling,
  });

  useEffect(() => {
    inputs["cancelPulldown"]?.(() => {
      cancelPullRefresh?.();
    });
  }, [cancelPullRefresh]);

  useEffect(() => {
    inputs["setShare"]?.((val) => {
      let msgConfig = {};
      let timelineConfig = {};
      if (val?.title || val?.imageUrl) {
        msgConfig = { title: val.title, imageUrl: val.imageUrl };

        // 分享给好友支持 path
        if (val?.path) {
          msgConfig["path"] = val.path;
        }

        timelineConfig = { title: val.title }; // 分享到朋友圈暂时不加图片
      } else {
        if (val.message) {
          msgConfig = val.message;
        }
        if (val.timeline) {
          timelineConfig = val.timeline;
        }
      }
      env?.setShareConfig?.("message", msgConfig);
      env?.setShareConfig?.("timeline", timelineConfig);
    });
  }, []);

  useMemo(() => {
    if (env?.rootScroll && !isDesigner(env)) {
      env.rootScroll.scrollTo = ({ scrollTop, id, duration = 0 }) => {
        /** 这里务必注意，scrollTop的优先级比scrollIntoView高，且这两个值只会在变化时生效，所以每次setScrollToProps务必只设置变化的字段，保证之前字段不变 */
        const isAnimte = duration > 0;
        if (id) {
          // H5
          if (isH5()) {
            let anchor = document.querySelector(id);
            if(anchor){
              document.querySelector("#root_scroll").scrollTo({
                top: anchor.offsetTop,
                behavior: isAnimte ? "smooth" : "auto",
              });
              return;
            }
          }

          setScrollToProps((c) => ({
            ...c,
            scrollIntoView: id,
            scrollTop: Math.random() + 20,
            scrollAnimationDuration: duration,
            scrollWithAnimation: isAnimte,
          }));
        } else {
          setScrollToProps((c) => ({
            ...c,
            scrollTop,
            scrollAnimationDuration: duration,
            scrollWithAnimation: isAnimte,
          }));

          // hack 设置当前滚动位置
          scrollRef.current = scrollTop;
        }
      };

      env.rootScroll.getBoundingClientRect = () =>
        new Promise((resolve, reject) => {
          Taro.createSelectorQuery()
            .select("#root_scroll")
            .boundingClientRect(function (rect) {
              resolve(rect);
            })
            .exec();
        });
    }
  }, []);

  const handleScroll = useCallback(
    (e) => {
      scrollRef.current = e.detail.scrollTop;
      env?.rootScroll?.emitScrollEvent?.(e);
    },
    [scrollRef.current]
  );

  useEffect(() => {
    if (!data?.enabledShareMessage) {
      Taro.hideShareMenu({
        menus: ["shareAppMessage", "shareTimeline"],
      });
    }
  }, [data?.enabledShareMessage]);

  /**
   * 骨架屏
   */
  useEffect(() => {
    inputs?.["ready"](() => {
      setReady(true);
    });
  }, []);

  const slotStyle = useMemo(() => {
    if (data.layout?.position === "smart") {
      return {
        overflow: "visible", // overflow 必须是visible，用于覆盖render-web给的overflow: hidden，否则子元素的sticky不生效
        // overflow: "hidden auto", // auto 会导致页面出现滚动条
        display: "inline-block", // 防止margin重叠用，触发BFC，不可以删除
        // height: "fit-content !important", // 说加了这个会导致页面不能铺满
        // paddingBottom: `${data.bottomSpace}px`,
      };
    }
    return {
      height: "fit-content !important", // 防止margin重叠用，触发BFC，不可以删除
      // display: "inline-block", // 防止margin重叠用，触发BFC，不可以删除
      // paddingBottom: `${data.bottomSpace}px`,
      ...data.layout,
    };
  }, [data.layout, data.bottomSpace]);

  let background = useMemo(() => {
    let result = {};

    if (data.backgroundImage) {
      result["backgroundImage"] = `${data.backgroundImage}`;
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

  if (data.useLoading && !ready) {
    return (
      <View className={css.loading}>
        <View className={css.icon}></View>
      </View>
    );
  }

  return (
    <View
      className={cx({ 
        [css.page]: true, 
        [css.h5page]: isH5(), 
        [css.debug]: isDesigner(env) 
      })}
      style={{ ...background }}
    >
      {/* Header ⬇️⬇️⬇️ */}
      {/* Header ⬇️⬇️⬇️ */}
      {/* Header ⬇️⬇️⬇️ */}

      {/* 默认样式 */}
      {data.useNavigationStyle === "default" ? (
        <>
          {/* debug 时渲染 fixedTop */}
          {/* runtime 时不渲染*/}
          {env.runtime.debug ? (
            <>
              <View style={{ width: 375, height: 84 }}></View>
              <View className={css.fixedTop}>
                <DefaultNavigation env={env} data={data} />
              </View>
            </>
          ) : null}
        </>
      ) : null}

      {/* 自定义导航栏 */}
      {data.useNavigationStyle === "custom" ? (
        <>
          {env.runtime?.debug ? (
            <>
              <View style={{ width: 375, height: 84 }}></View>
              <View className={css.fixedTop}>
                <CustomNavigation env={env} data={data} slots={slots} />
              </View>
            </>
          ) : (
            <>
              <View id="custom_navigation">
                <View
                  style={{
                    width: 375,
                    height: relativeRect.top - (40 - relativeRect.height) / 2,
                  }}
                ></View>
                <View style={{ width: 375, height: 40 }}></View>
              </View>
              <View className={css.fixedTop}>
                <CustomNavigation env={env} data={data} slots={slots} />
              </View>
            </>
          )}
        </>
      ) : null}

      {/* 隐藏导航栏 */}
      {data.useNavigationStyle === "none" ? (
        <NoneNavigation env={env} data={data} />
      ) : null}

      {/* content ⬇️⬇️⬇️ */}
      {/* content ⬇️⬇️⬇️ */}
      {/* content ⬇️⬇️⬇️ */}

      {/* {contentPlaceholder ? (
        <View className={cx(css.contentPlaceholder, "mybricks-contentPlaceholder")}></View>
      ) : ( */}
      <View id="root" className={css.fixedContainer}>
        <ScrollView
          key={"page"}
          id="root_scroll"
          scrollY={!data.disableScroll && !disableScrollWhenPulling}
          // scrollY={!data.disableScroll}
          enhanced={isIOS && data.enabledPulldown ? false : true}
          // enhanced={true}
          // enhancedBounce={false}
          bounce={false}
          enablePassive={true}
          showScrollbar={false}
          onScroll={handleScroll}
          enableBackToTop={true}
          using-sticky={true}
          {...scrollToProps}
          scrollTop={scrollRef.current}
          {...pulldownProps}
          className={css.contentScrollView}
          // style={{ height: contentScrollViewHeight }}
        >
          {slots["content"]?.render?.({
            style: {
              ...slotStyle,
            },
          })}
        </ScrollView>
      </View>

      {/* )} */}

      {/* Footer ⬇️⬇️⬇️ */}
      {/* Footer ⬇️⬇️⬇️ */}
      {/* Footer ⬇️⬇️⬇️ */}

      {/* debug 时渲染 tabbar */}
      {useTabBar && env.runtime.debug ? (
        <>
          <View style={{ width: 375, height: 60 }}></View>
          <View className={css.fixedBottom}>
            <CustomTabBar {...props} />
          </View>
        </>
      ) : null}

      {/* runtime 时渲染 tabbar placeholder */}
      {useTabBar && !env.runtime.debug && !isH5() ? (
        <View className={cx(css.tabBarPlaceholder)}></View>
      ) : null}

      {/* 开启了页脚插槽 */}
      {!useTabBar && data.useFooter ? (
        <>
          <View
            className={css.footerPlaceholder}
            style={{ height: footerHeight }}
          ></View>
          <View className={cx(css.footer, "mybricks-footer")} ref={footerRef}>
            {slots["footerBar"]?.render?.()}
            <View className={css.safearea}></View>
          </View>
        </>
      ) : null}
    </View>
  );
}
