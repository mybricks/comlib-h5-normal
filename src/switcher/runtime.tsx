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
import { Mode } from "./constants";

export default function ({ env, data, inputs, outputs, slots }) {
  const [selectedIndex, setSelectedIndex] = useState(data.defaultSelectedIndex);
  const [showIcon, setShowIcon] = useState(data.showIcon);
  const [mode, setMode] = useState(data.mode);
  const [tabKey, setTabKey] = useState(data.tabKey);

  useEffect(() => {
    //搭建态使用text tabKey，防止显示为空
    if (env.edit) {
      setTabKey("text");
    } else {
      setTabKey(data.tabKey);
    }
  }, [data.tabKey, env]);

  //判断 是否开启了初始化时触发「选中项变化」事件 开关
  useMemo(() => {
    if (data.initChangeTab) {
      outputs["onChange"]({
        index: data.defaultSelectedIndex,
        item: data.items[data.defaultSelectedIndex],
      });
    }
  }, [data.items]);

  useEffect(() => {
    //老组件没有选择图标的开关，升级后默认打开
    if (data.showIcon == undefined) {
      setShowIcon(true);
    } else {
      setShowIcon(data.showIcon);
    }
    //老组件没有排列方式选项，升级后默认选中横向排列
    if (data.mode == undefined) {
      setMode(Mode.horizontal);
    } else {
      setMode(data.mode);
    }
  }, [data.showIcon, data.mode]);

  useMemo(() => {
    inputs["setData"]((val, relOutputs) => {
      data.items = val;
      relOutputs["afterSetData"]?.(val);
    });
  }, [inputs, data]);

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
        item,
      });
    },
    [selectedIndex]
  );

  const boxStyle = useMemo(() => {
    if (mode == Mode.gridding) {
      return {
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        rowGap: `${data.gutter[0] || 0}px`,
        columnGap: `${data.gutter[1] || 0}px`,
      };
    }

    if (mode == Mode.horizontal) {
      return {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: `${data.horizontalGutter}px`,
        height: "100%",
        overflowX: `auto`,
      };
    }

    if (mode == Mode.vertical) {
      return {
        // flexDirection: "column",
        // justifyContent: "space-between",
        // gap: `${data.verticalGutter}px`,
        display: "block",
      };
    }
  }, [mode, data.horizontalGutter, data.verticalGutter, data.gutter]);

  const griddingItemStyle = useMemo(() => {
    if (mode == Mode.gridding) {
      return {
        maxWidth: `calc((100% - ${
          (data.column - 1) * data.gutter[1] || 0
        }px) / ${data.column})`,
        flexBasis: `calc((100% - ${
          (data.column - 1) * data.gutter[1] || 0
        }px) / ${data.column})`,
        flexGrow: 1,
        flexShrink: 0,
      };
    }

    if (mode == Mode.horizontal) {
      return {
        flexGrow: 1,
        flexShrink: 0,
        minWidth: `100px`,
        height: "100%",
      };
    }

    if (mode == Mode.vertical) {
      return {
        // flexGrow: 1,
        // flexShrink: 0,
        width: "100%",
        marginBottom: `${data.verticalGutter}px`,
      };
    }
  }, [
    mode,
    data.column,
    data.gutter,
    data.horizontalGutter,
    data.verticalGutter,
  ]);

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
          style={{ ...itemStyle, ...griddingItemStyle, ...data.switcherSize }}
          onClick={() => {
            onChange({
              item,
              index,
            });
          }}
        >
          {showIcon && icon ? (
            <Image
              className={css.icon}
              style={{ ...iconStyle }}
              src={icon}
            ></Image>
          ) : null}
          {item[tabKey || "text"] ? (
            <View className={css.text} style={{ ...textStyle }}>
              {item[tabKey || "text"]}
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
    griddingItemStyle,
    data.switcherSize,
    showIcon,
    tabKey,
  ]);

  return (
    <View className={cx([css.switcher, "mybricks-switcher"])}>
      <View
        className={cx([css.inner, { [css.wrap]: data.wrap }])}
        style={boxStyle}
      >
        {$items}
      </View>
    </View>
  );
}