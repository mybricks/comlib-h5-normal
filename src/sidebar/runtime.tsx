import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import { TreeSelect } from "brickd-mobile";
import { isDesigner } from "../utils/env";

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

  const _setCurrentTabId = useCallback((currentTabId) => {
    setCurrentTabId(currentTabId);
    const index = data.tabs.findIndex(tab => tab._id == currentTabId)
    if (index === -1) {
      return
    }
    const findItem = data.tabs[index];
    outputs.changeTab?.({
      id: findItem._id,
      title: findItem.tabName,
      index,
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

  const treeSelectCx = useMemo(() => {
    return cx({
      [css.treeSelect]: true,
      [css.edit]: isDesigner(env),
    });
  }, [env]);

  return (
    emptyView || (
      <TreeSelect
        className={treeSelectCx}
        tabValue={currentTabId}
        onTabChange={_setCurrentTabId}
      >
        {data.tabs.map((tab) => {
          return (
            <TreeSelect.Tab key={tab._id} title={tab.tabName} value={tab._id}>
              {/* 这里必须有一个带key的View，否则不会刷新 */}
              {/* <View key={`slot_${tab._id}`}>{data.hideContent ? null : slots[tab._id]?.render?.()}</View> */}
              <View key={`slot_${tab._id}`}>{data.hideContent ? null : slots['content']?.render?.()}</View>
            </TreeSelect.Tab>
          );
        })}
      </TreeSelect>
    )
  );
}
