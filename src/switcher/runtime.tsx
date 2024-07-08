import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import { uuid, debounce } from "../utils";
import cx from "classnames";

export default function ({ env, data, inputs, outputs, slots }) {
  const [selectedIndex, setSelectedIndex] = useState(data.defaultSelectedIndex);

  const onChange = useCallback(
    ({ item, index }) => {
      if (!env.runtime) {
        return;
      }

      if (selectedIndex === index) {
        return;
      }

      setSelectedIndex(index);

      outputs["onChange"]({
        index,
        item: {
          text: item.text,
        },
      });
    },
    [selectedIndex]
  );

  const $items = useMemo(() => {
    return data.items.map((item, index) => {
      let isSelected = selectedIndex === index;

      // 全局样式
      let defaultItemStyle = isSelected
        ? data.defaultSelectedItemStyle
        : data.defaultUnselectedItemStyle;

      let defaultIconStyle = isSelected
        ? data.defaultSelectedIconStyle
        : data.defaultUnselectedIconStyle;

      let defaultTextStyle = isSelected
        ? data.defaultSelectedTextStyle
        : data.defaultUnselectedTextStyle;

      // 自定义样式
      let customItemStyle = isSelected
        ? item.selectedItemStyle
        : item.unselectedItemStyle;
      let customIconStyle = isSelected
        ? item.selectedIconStyle
        : item.unselectedIconStyle;
      let customTextStyle = isSelected
        ? item.selectedTextStyle
        : item.unselectedTextStyle;

      // 样式
      let itemStyle = item.useCustomStyle ? customItemStyle : defaultItemStyle;
      let iconStyle = item.useCustomStyle ? customIconStyle : defaultIconStyle;
      let textStyle = item.useCustomStyle ? customTextStyle : defaultTextStyle;

      // 内容
      let icon = isSelected ? item.selectedIcon : item.unselectedIcon;

      return (
        <View
          className={cx([
            css.item,
            "mybricks-item",
            {
              [css.selected]: isSelected,
            },
          ])}
          style={{ ...itemStyle }}
          onClick={() => {
            onChange({
              item,
              index,
            });
          }}
        >
          {icon ? (
            <Image
              className={css.icon}
              style={{ ...iconStyle }}
              src={icon}
            ></Image>
          ) : null}
          {item.text ? (
            <View className={css.text} style={{ ...textStyle }}>
              {item.text}
            </View>
          ) : null}
        </View>
      );
    });
  }, [
    data.items,
    selectedIndex,
    data.defaultUnselectedItemStyle,
    data.defaultUnselectedIconStyle,
    data.defaultUnselectedTextStyle,
    data.defaultSelectedItemStyle,
    data.defaultSelectedIconStyle,
    data.defaultSelectedTextStyle,
  ]);

  return (
    <View className={cx([css.switcher, "mybricks-switcher"])}>
      <View className={cx([css.inner, { [css.wrap]: data.wrap }])}>
        {$items}
      </View>
    </View>
  );
}
