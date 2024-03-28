import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import { Tabs } from "brickd-mobile";
import css from "./style.less";

function getDefaultCurrTabId(tabs) {
  if (tabs.length > 0) {
    return tabs[0]._id || "";
  }
  return "";
}

function getTabId(length) {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    var randomPos = Math.floor(Math.random() * chars.length);
    result += chars.substring(randomPos, randomPos + 1);
  }
  return "tabs-" + result;
}

export default function ({ data, inputs, outputs, title, slots, env }) {
  const [isFixed, setIsFixed] = useState(false);
  const [tabsTop, setTabsTop] = useState(0);
  const [tabsTopReady, setTabsTopReady] = useState(false);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [tabsPaneHeight, setTabsPaneHeight] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [TabID, setTabID] = useState(getTabId(6));
  const [customNavigationHeight, setCustomNavigationHeight] = useState(0);
  const [pxDelta, setPxDelta] = useState(0);

  // 当前选中的tab
  const [currentTabId, setCurrentTabId] = useState(
    getDefaultCurrTabId(data.tabs)
  );

  //判断是否是真机运行态
  const isRelEnv = () => {
    if (env.runtime.debug || env.edit) {
      return false;
    } else {
      return true;
    }
  };

  // 真机运行时获取tab的高度和距离顶部的距离
  useEffect(() => {
    console.log("env", env);
    if (isRelEnv()) {
      const query = Taro.createSelectorQuery();
      query
        .select(`#${TabID}`)
        .boundingClientRect()
        .exec((res) => {
          const rect = res[0];
          console.log("rect", rect);
          if (rect) {
            setTabsTop(rect.top);
            //减去6px防止真机预览抖动，先这样处理
            setTabsHeight(rect.height - 6);
            setTabsTopReady(true);
          }
        });

      //真机运行时，获取自定义导航栏的高度，如果没有则为0
      const query2 = Taro.createSelectorQuery();
      query2
        .select(`#custom_navigation`)
        .boundingClientRect()
        .exec((res) => {
          if (res) {
            const rect = res[0];
            setCustomNavigationHeight(rect.height);
          }
        });

        Taro.getSystemInfo().then((res) => {
        const { windowHeight, windowWidth } = res;
        const pxDelta = windowWidth / 375;
        setPxDelta(pxDelta);
      });
    }
  }, []);

  useEffect(() => {
    inputs["dataSource"]?.((ds) => {
      if (Array.isArray(ds)) {
        data.tabs = ds.map((item) => {
          return {
            _id: item.id,
            tabName: item.tabName,
          };
        });
      }
    });

    inputs["activeTabId"]?.((tabId) => {
      if (tabId !== undefined || tabId !== null) {
        _setCurrentTabId(tabId);
      }
    });
  }, []);

  // 切换tab时获取tabpane的高度，用于tabpane滑出屏幕时，退场处理
  useEffect(() => {
    if (isRelEnv()) {
      const query = Taro.createSelectorQuery();
      query
        .select(`#tabpane`)
        .boundingClientRect()
        .exec((res) => {
          const rect = res[0];
          setTabsPaneHeight(rect.height);
        });
    }
  }, [currentTabId]);

  useEffect(() => {
    if (!tabsTopReady) return;
    env?.rootScroll?.onScroll?.((e) => {
      if (!data.sticky) return;
      const { scrollTop } = e.detail ?? {};
      console.log("自定义导航栏高度", customNavigationHeight);
      if (customNavigationHeight + scrollTop >= tabsTop) {
        //判断tab是否已经滑动离开页面
        if (tabsPaneHeight + tabsTop < scrollTop + customNavigationHeight) {
          console.log(
            "滑动到页面外部",
            TabID,
            tabsPaneHeight,
            tabsTop,
            scrollTop
          );
          setIsFixed(false);
          setShowPlaceholder(false);
          return;
        }

        console.log("设置为吸顶", TabID, tabsPaneHeight, tabsTop, scrollTop);
        setIsFixed(true);
        setShowPlaceholder(true);
      } else {
        console.log("设置为不吸顶", TabID, tabsPaneHeight, tabsTop, scrollTop);
        setIsFixed(false);
        setShowPlaceholder(false);
      }
    });
  }, [tabsTop, tabsTopReady, tabsPaneHeight, customNavigationHeight]);

  // useEffect(() => {
  //   if (data.initChangeTab) {
  //     const index = data.tabs.findIndex((tab) => tab._id == currentTabId);
  //     if (index === -1) {
  //       return;
  //     }
  //     const findItem = data.tabs[index];

  //     outputs.changeTab?.({
  //       id: findItem._id,
  //       title: findItem.tabName,
  //       index,
  //     });
  //   }
  // }, []);

  //点击tab进行切换
  const _setCurrentTabId = (currentTabId) => {
    setCurrentTabId(currentTabId);
    const index = data.tabs.findIndex((tab) => tab._id == currentTabId);
    if (index === -1) {
      return;
    }
    const findItem = data.tabs[index];
    outputs.changeTab?.({
      id: findItem._id,
      title: findItem.tabName,
      index,
    });

    if (isRelEnv() && isFixed) {
      //默认在顶部，切换后先滑动到页面顶部
      env.rootScroll.scrollTo({ scrollTop: tabsTop, duration: 0 });
      console.log("触发滚动复位,scrollTop", TabID, tabsTop);
    }
  };

  // 编辑模式下，切换tab
  // useEffect(() => {
  //   if (env.edit && data.edit.currentTabId) {
  //     setCurrentTabId(data.edit.currentTabId);
  //   }
  // }, [env.edit, data.edit.currentTabId]);

  const emptyView = useMemo(() => {
    if (env.edit && data.tabs.length === 0) {
      return <View className={css.empty}>暂无内容，请配置标签项</View>;
    } else {
      return null;
    }
  }, [env.edit, data.tabs]);

  return (
    emptyView || (
      <View>
        {showPlaceholder && <View style={{ height: `${tabsHeight}px` }}></View>}
        <Tabs
          id={TabID}
          className={isFixed ? css.fix_tabs : css.tabs}
          style={isFixed ? {top: `${customNavigationHeight / pxDelta }px`} : {}}
          value={currentTabId}
          onChange={_setCurrentTabId}
          swipeable={data.swipeable}
        >
          {data.tabs.map((tab, index) => {
            // let style = {};
            // if (tab.useIndependentStyle) {
            //   style = tab._id == currentTabId ? tab.activeNavItemStyle : tab.normalNavItemStyle;
            // } else {
            //   style = tab._id == currentTabId ? data.activeNavItemStyle : data.normalNavItemStyle;
            // }
            return (
              <Tabs.TabPane
                // style={{ ...style }}
                key={tab._id}
                title={tab.tabName}
                value={tab._id}
              ></Tabs.TabPane>
            );
          })}
        </Tabs>

        {data.tabs.map((tab, index) => {
          if (currentTabId === tab._id) {
            return (
              <View
                key={tab._id}
                id="tabpane"
                // style={{
                //   display: currentTabId === tab._id ? "block" : "none",
                // }}
              >
                {data.hideContent
                  ? null
                  : slots[data.tabs_dynamic ? "item" : tab._id].render?.({
                      inputValues: {
                        itemData: tab,
                        index: index,
                      },
                      key: tab._id,
                    })}
              </View>
            );
          }
        })}
      </View>
    )
  );
}
