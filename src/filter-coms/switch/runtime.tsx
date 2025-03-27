import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";
import { isEmpty, isString } from "./../../utils/core";
import { useFilterItemValue } from "./../common";

const UNSET_VALUE = "_UNSET_";

export default (props) => {
  const { id, env, data, inputs, outputs, slots } = props;

  const { filterValue, setFilterValue } = useFilterItemValue(
    {
      defaultValue: UNSET_VALUE,
      onReceiveValue: (value) => {
        switch (true) {
          case isEmpty(value): {
            setFilterValue(UNSET_VALUE);
            break;
          }
          case isString(value):
            setFilterValue(value);
            break;
          default:
            break;
        }
      },
      onChangeValue: (value) => {
        return value === UNSET_VALUE ? "" : value;
      },
    },
    props
  );

  const _optionMap = useMemo(() => {
    return data.optionMap ? data.optionMap : {};
  }, [data.optionMap]);

  const handleClick = useCallback(() => {
    if (env.edit) {
      return;
    }

    // 点击按顺序选择下一个
    const valueQueue = [data.options.normal.value, data.options.actived.value];
    const currentIndex = valueQueue.indexOf(filterValue);

    let nextIndex;
    if (currentIndex <= 0) {
      nextIndex = 1;
    } else {
      nextIndex = 0;
    }
    
    setFilterValue(valueQueue[nextIndex]);
  }, [filterValue, data.options]);

  const actived = useMemo(() => {
    if (env.edit) {
      return data._editState_ === "选中样式" ? true : false;
    }
    return filterValue === data.options.actived.value ? true : false;
  }, [env.edit, data._editState_, filterValue, data.options]);

  const switchCx = useMemo(() => {
    return cx({
      [css.switch]: true,
      "mybricks-filter-switch": true,
      [css.actived]: actived,
    });
  }, [env.edit, actived]);

  const label = useMemo(() => {
    let normalLabel = data.options.normal.label || (env.edit ? "未设置" : "");
    let activedLabel = data.options.actived.label || (env.edit ? "未设置" : "");

    return actived ? activedLabel : normalLabel;
  }, [env.edit, actived, data.options.normal.label, data.options.actived.label]);

  return (
    <View className={switchCx} onClick={handleClick}>
      {label}
    </View>
  );
};
