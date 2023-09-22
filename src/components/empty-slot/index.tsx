import React, { Children, CSSProperties, useMemo, ReactNode } from "react";
import { View } from "@tarojs/components";
import css from "./index.less";

export default ({ title = "暂未选择卡片，请从右侧面板添加卡片", slot }) => {
  return (
    <View className={css.emptySlot}>
      {/* {title} */}
      {slot.render()}
    </View>
  );
};
