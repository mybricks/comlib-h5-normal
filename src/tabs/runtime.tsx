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
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [TabID, setTabID] = useState(getTabId(6));

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
            setTabsHeight(rect.height);
            setTabsTopReady(true);
          }
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

  useEffect(() => {
    if (!tabsTopReady) return;
    env?.rootScroll?.onScroll?.((e) => {
      if (!data.sticky) return;
      const { scrollTop } = e.detail ?? {};
      //tabs初始化时已经在屏幕顶部了
      if (tabsTop === 0) {
        // console.log("设置为吸顶", TabID, scrollTop, tabsTop);
        setShowPlaceholder(true);
        setIsFixed(true);
        return;
      }
      if (scrollTop >= tabsTop) {
        // console.log("设置为吸顶", TabID, scrollTop, tabsTop);
        setIsFixed(true);
        setShowPlaceholder(true);
      } else {
        // console.log("设置为不吸顶", TabID, scrollTop, tabsTop);
        setIsFixed(false);
        setShowPlaceholder(false);
      }
    });
  }, [tabsTop, tabsTopReady]);

  // 当前选中的tab
  const [currentTabId, setCurrentTabId] = useState(
    getDefaultCurrTabId(data.tabs)
  );

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
                id="tabpane"
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
