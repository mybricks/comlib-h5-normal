import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View } from "@tarojs/components";
import { Tabs } from "brickd-mobile";
import css from "./style.less";

function getDefaultCurrTabId(tabs) {
  if (tabs.length > 0) {
    return tabs[0]._id || "";
  }
  return "";
}

export default function ({ data, inputs, outputs, title, slots, env }) {
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

  const _setCurrentTabId = useCallback((currentTabId) => {
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
  }, []);

  useEffect(() => {
    inputs["dataSource"]?.((ds) => {
      if (Array.isArray(ds)) {
        data.tabs = ds.map(item => {
          return {
            _id: item.id,
            tabName: item.tabName,
          }
        });
      }
    });

    inputs["activeTabId"]?.((tabId) => {
      if (tabId !== undefined || tabId !== null) {
        _setCurrentTabId(tabId);
      }
    });
  }, []);

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
      <Tabs
        className={css.tabs}
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
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    )
  );
}
