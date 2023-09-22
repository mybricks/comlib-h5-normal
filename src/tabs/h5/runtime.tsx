import React, { useState, useCallback, useEffect, useMemo } from "react";
import css from "../style.less";
import Tabs from "../../components-h5/tabs";
import { View, Text } from "./../../components-h5";

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

  useEffect(() => {
    if (data.initChangeTab) {
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
    }
  }, []);

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
    inputs["tabList"]?.((ds) => {
      if (Array.isArray(ds)) {
        data.tabs = ds;
      }
    });

    inputs["activeTabId"]?.((tabId) => {
      if (tabId !== undefined || tabId !== null) {
        _setCurrentTabId(tabId);
      }
    });
  }, []);

  // 编辑模式下，切换tab
  useEffect(() => {
    if (env.edit && data.edit.currentTabId) {
      setCurrentTabId(data.edit.currentTabId);
    }
  }, [env.edit, data.edit.currentTabId]);

  const emptyView = useMemo(() => {
    if (env.edit && data.tabs.length === 0) {
      return <View className={css.empty}>暂无内容，请配置标签项</View>;
    } else {
      return null;
    }
  }, [env.edit, data.tabs]);

  return (
    emptyView || (
      <Tabs value={currentTabId} items={data.tabs} onChange={_setCurrentTabId}>
        {data.tabs.map((tab) => {
          if(currentTabId !== tab._id) return null
          return (
            <div>
              <div>{data.hideContent ? null : slots[tab._id]?.render?.()}</div>
            </div>
          );
        })}
      </Tabs>
    )
  );
}
