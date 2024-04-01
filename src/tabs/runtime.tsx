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

const getTabsId = (prefix, length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (var i = 0; i < length; i++) {
    var randomPos = Math.floor(Math.random() * chars.length);
    result += chars.substring(randomPos, randomPos + 1);
  }
  return `${prefix}-${result}`;
}

export default function ({ data, inputs, outputs, title, slots, env }) {
  const [isFixed, setIsFixed] = useState(false);
  const [tabsTop, setTabsTop] = useState(0);
  const [tabsTopUpdate, setTabsTopUpdate] = useState(-1);
  const [tabsTopReady, setTabsTopReady] = useState(false);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [tabsPaneHeight, setTabsPaneHeight] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [customNavigationHeight, setCustomNavigationHeight] = useState(0);
  const [pxDelta, setPxDelta] = useState(0);
  const [TabID, setTabID] = useState(getTabsId("tab", 6));
  const [tabholderId, setTabholderId] = useState(getTabsId("tabholder", 6));
  const [tabpaneId, setTabpaneId] = useState(getTabsId("tabpane", 6));

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
            // setTabsHeight(rect.height - 6);
            setTabsHeight(rect.height);
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
        .select(`#${tabpaneId}`)
        .boundingClientRect()
        .exec((res) => {
          const rect = res[0];
          setTabsPaneHeight(rect.height);
        });
    }
  }, [currentTabId]);

  function throttle(fn, delay = 200) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      fn.apply(this, args);
    };
  }

  const updateTabTop = async (tabpaneId, e) => {
    console.log("触发一次TabTop查询", tabpaneId);
    const query = Taro.createSelectorQuery();
    query
      .select(`#${tabpaneId}`)
      .boundingClientRect()
      .exec((res) => {
        const rect = res[0];
        if (rect) {
          const realtime_tabToTop = rect.top;
          const { scrollTop } = e.detail;
          const tabToTop = Number(
            (realtime_tabToTop + scrollTop - tabsHeight).toFixed(0)
          );
          // console.log("实时取到的TabToTop", tabpaneId, tabToTop);
          setTabsTopUpdate(tabToTop);
        } else {
          console.log("未能找到元素或其他错误");
        }
      });
  };

  const debouncedUpdateTabTop = useCallback(throttle(updateTabTop), []);

  useEffect(() => {
    if (!tabsTopReady || !isRelEnv()) return;

    env?.rootScroll?.onScroll?.((e) => {
      if (!data.sticky) return;
      
      let _tabtop = 0;
      if (tabsTopUpdate === -1) {
         _tabtop = tabsTop;
        // console.log("tabsTopUpdate未更新",tabsTopUpdate);
      } else {
        _tabtop = tabsTopUpdate;
        // console.log("tabsTopUpdate已经更新", tabsTopUpdate);
      }
      debouncedUpdateTabTop(tabpaneId, e);
      const { scrollTop } = e.detail ?? {};
      if (customNavigationHeight + scrollTop >= _tabtop) {
        //判断tab是否已经滑动离开页面
        if (tabsPaneHeight + _tabtop < scrollTop + customNavigationHeight) {
          setIsFixed(false);
          setShowPlaceholder(false);
          return;
        }

        // console.log(
        //   "吸顶，id-",
        //   TabID,
        //   "tabsPaneHeight-",
        //   tabsPaneHeight,
        //   "tabsTop-",
        //   tabsTop,
        //   "_tabtop",
        //   _tabtop,
        //   "scrollTop-",
        //   scrollTop
        // );
        setIsFixed(true);
        setShowPlaceholder(true);
      } else {
        // console.log(
        //   "吸顶，id-",
        //   TabID,
        //   "tabsPaneHeight-",
        //   tabsPaneHeight,
        //   "tabsTop-",
        //   tabsTop,
        //   "_tabtop",
        //   _tabtop,
        //   "scrollTop-",
        //   scrollTop
        // );
        setIsFixed(false);
        setShowPlaceholder(false);
      }
    });
  }, [
    tabsTop,
    tabsTopReady,
    tabsPaneHeight,
    customNavigationHeight,
    tabholderId,
    TabID,
    tabpaneId,
    tabsTopUpdate,
  ]);

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
      env.rootScroll.scrollTo({ id: tabholderId });
      setTabholderId(getTabsId("tabholder", 6));
    }
  };

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
        {showPlaceholder && (
          <View id={tabholderId} style={{ height: `${tabsHeight}px` }}></View>
        )}
        <Tabs
          id={TabID}
          className={isFixed ? css.fix_tabs : css.tabs}
          style={
            isFixed ? { top: `${customNavigationHeight / pxDelta}px` } : {}
          }
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
              <View key={tab._id} id={tabpaneId}>
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
