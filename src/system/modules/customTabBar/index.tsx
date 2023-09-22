import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import css from './style.less';
import cx from "classnames";

export default ({ data, env }) => {

  const onClickItem = useCallback((raw) => {
    if (!env.runtime?.debug) {
      return;
    }

    if (raw.scene.id) {
      env.canvas.open(raw.scene.id, {});
    }
  }, [env]);

  const $tabBars = useMemo(() => {
    return data.tabBar.map((raw, index) => {

      let isSelected = (env.canvas.id == raw.scene.id);

      // 如果有强制覆盖的时候
      if (data.selectedTabItemIndex !== undefined && data.selectedTabItemCatelog !== undefined) {
        isSelected = data.selectedTabItemIndex === index;
        if (isSelected) {
          isSelected = data.selectedTabItemCatelog === "激活样式" ? true : false;
        }
      }

      let itemCx = cx({
        "mybricks-tabItem": env.edit,
        [css.item]: true,
        [css.selected]: isSelected,
      });

      let icon = isSelected ? raw.selectedIconPath : raw.normalIconPath;

      let iconStyle = isSelected ? raw.selectedIconStyle : raw.normalIconStyle;
      let textStyle = isSelected ? raw.selectedTextStyle : raw.normalTextStyle;

      let iconSlotCx = cx({
        [css.iconSlot]: true,
        [css.iconSlotCenter]: !raw.text
      });

      return (
        <View className={itemCx} onClick={() => { onClickItem(raw) }}>
          <View className={iconSlotCx}>
            <Image
              className={css.icon}
              style={{ ...iconStyle }}
              src={icon}
            />
          </View>
          <View className={css.textSlot}>
            <View className={css.text} style={{ ...textStyle }}>{raw.text}</View>
          </View>
        </View>
      );
    });
  }, [
    data.tabBar,
    env.canvas.id,
    data.selectedTabItemIndex,
    data.selectedTabItemCatelog,
  ]);

  return (
    <View className={css.tabBar}>
      <View className={css.items}>
        {$tabBars}
      </View>
    </View>
  )
}