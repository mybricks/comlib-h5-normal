import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import DynamicIcon from "../../../components/dynamic-icon";

export default ({ data, env, _inputsCallable }) => {
  const onClickItem = useCallback(
    (raw) => {
      if (!env.runtime?.debug) {
        return;
      }

      if (raw.scene.id) {
        env.canvas.open(raw.scene.id, {}, "popup");
        _inputsCallable["_open"]({});
      }
    },
    [env]
  );

  const iconRender = (itemData, isSelected) => {
    let useImgIcon = isSelected
      ? itemData.selectedIconUseImg !== false
      : itemData.normalIconUseImg !== false;
    let icon = isSelected ? itemData.selectedIcon : itemData.normalIcon;

    let iconStyle = isSelected
      ? itemData.selectedFontIconStyle
      : itemData.normalFontIconStyle;

    let imgIcon = isSelected
      ? itemData.selectedIconPath
      : itemData.normalIconPath;

    let imgIconStyle = isSelected
      ? itemData.selectedIconStyle
      : itemData.normalIconStyle;

    let iconSlotCx = cx({
      [css.iconSlot]: true,
      [css.iconSlotCenter]: !itemData.text,
    });
    return (
      <View className={iconSlotCx}>
        {useImgIcon ? (
          <Image
            style={{
              display: "block",
              width: "22px",
              height: "22px",
              ...imgIconStyle,
            }}
            src={imgIcon}
          />
        ) : (
          <DynamicIcon
            className={css.fontIcon}
            name={icon}
            size={iconStyle?.fontSize}
            color={iconStyle?.color}
          />
        )}
      </View>
    );
  };

  const $tabBars = useMemo(() => {
    return data.tabBar.map((raw, index) => {
      let isSelected = data.id == raw.scene.id;

      // 如果有强制覆盖的时候
      if (
        data.selectedTabItemIndex !== undefined &&
        data.selectedTabItemCatelog !== undefined
      ) {
        isSelected = data.selectedTabItemIndex === index;
        if (isSelected) {
          isSelected =
            data.selectedTabItemCatelog === "激活样式" ? true : false;
        }
      }

      let itemCx = cx({
        "mybricks-tabItem": env.edit,
        [css.item]: true,
        [css.selected]: isSelected,
      });
      let textStyle = isSelected ? raw.selectedTextStyle : raw.normalTextStyle;
      let backgroundStyle = isSelected
        ? raw.selectedBackgroundStyle
        : raw.normalBackgroundStyle;

      return (
        <View
          className={itemCx}
          style={{ ...backgroundStyle }}
          onClick={() => {
            onClickItem(raw);
          }}
        >
          {iconRender(raw, isSelected)}
          {raw.text && (
            <View
              className={cx(css.textSlot, "mybricks-tabbar-text")}
              style={{ ...textStyle }}
            >
              {raw.text}
            </View>
          )}
        </View>
      );
    });
  }, [
    data.tabBar,
    env.canvas.id,
    data.id,
    data.selectedTabItemIndex,
    data.selectedTabItemCatelog,
  ]);

  return (
    <View className={css.tabBar}>
      <View className={css.items}>{$tabBars}</View>
    </View>
  );
};
