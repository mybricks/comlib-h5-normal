import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import CustomTabBar from "../modules/customTabBar";
import EmptyCom from "../../components/empty-com";
import * as EventBus from "../modules/eventBus";

export default function ({ env, data, inputs, outputs, slots }) {

  /**
   * 监听 tabBar 广播，更新 data
  */
  const onHandleTabBar = useCallback((value) => {
    data.tabBar = value;
  }, []);

  useEffect(() => {
    // 监听数据
    EventBus.on("tabBar", onHandleTabBar);
    return () => {
      EventBus.off("tabBar", onHandleTabBar);
    }
  }, []);

  //
  if (!data.useTabBar) {
    return (
      <View style={{ width: 375, height: 60 }}>
        <EmptyCom title="未显示底部标签栏" />
      </View>
    );
  }

  if (data.tabBar.length < 2 || data.tabBar.length > 5) {
    return (
      <View style={{ width: 375, height: 60 }}>
        <EmptyCom title="标签项数量须大于等于2且小于等于5" />
      </View>
    );
  }

  return (
    <View className={css.canvas}>
      <CustomTabBar data={data} env={env} />
    </View>
  );
}
