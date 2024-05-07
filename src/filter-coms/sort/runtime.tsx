import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";
import { isEmpty, isString } from "./../../utils/core";
import { useDiffValue, useFilterItemValue } from './../common' 

const UpSvg = ({ style }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3221"
      style={style}
    >
      <path
        d="M793.024 710.272a32 32 0 1 0 45.952-44.544l-310.304-320a32 32 0 0 0-46.4 0.48l-297.696 320a32 32 0 0 0 46.848 43.584l274.752-295.328 286.848 295.808z"
        fill="currentColor"
        p-id="3222"
      ></path>
    </svg>
  );
};

const DownSvg = ({ style }) => {
  return <UpSvg style={{ ...style, transform: "rotate(180deg)" }} />;
};

const EMPTY_VALUE = "_empty_";

export default (props) => {
  const {
    env,
    data,
    inputs,
    outputs,
    slots,
  } = props;
  const { filterValue: selectMode, setFilterValue: setSelectMode } = useFilterItemValue({
    defaultValue: EMPTY_VALUE,
    onReceiveValue: (value) => {
      switch (true) {
        case isEmpty(value): {
          setSelectMode(EMPTY_VALUE);
          break;
        }
        case isString(value):
          setSelectMode(value);
          break;
        default:
          break;
      }
    },
    onChangeValue: (value) => {
      return value === EMPTY_VALUE ? "" : value
    }
  }, props)

  const _optionMap = useMemo(() => {
    return data.optionMap ? data.optionMap : {};
  }, [data.optionMap]);

  const status = useMemo(() => {
    if (_optionMap.asc?.value == selectMode) {
      return "asc";
    }
    if (_optionMap.desc?.value == selectMode) {
      return "desc";
    }
    return "none";
  }, [_optionMap, selectMode]);

  const handleClick = useCallback(() => {
    if (env.edit) {
      return;
    }

    // 点击按顺序选择下一个
    const valueQueue = [EMPTY_VALUE, _optionMap.asc.value, _optionMap.desc.value];
    const done = valueQueue.some((v, index) => {
      if (selectMode == v) {
        setSelectMode(
          index + 1 === valueQueue.length
            ? valueQueue[0]
            : valueQueue[index + 1]
        );
      }
      return selectMode === v;
    });

    // 兼容数据不属于options的情况
    if (!done) {
      setSelectMode(valueQueue[1])
    }
  }, [status, selectMode, _optionMap]);

  const actived = useMemo(() => {
    return status !== 'none'
  }, [status])

  return (
    <View className={`${css.sort} ${actived ? 'mbs-filter_sort--active' : 'mbs-filter_sort'}`} onClick={handleClick}>
      {env.edit ? _optionMap.none?.label ?? "暂未配置" : _optionMap.none?.label}
      <View className={css.icons}>
        {status === "none" && (
          <>
            {data.modes?.length === 1 && data.modes?.includes("asc") && (
              <UpSvg style={{ width: "11px", height: "11px" }} />
            )}
            {data.modes?.length === 1 && data.modes?.includes("desc") && (
              <DownSvg style={{ width: "11px", height: "11px" }} />
            )}
            {data.modes?.length === 2 && (
              <>
                <UpSvg
                  style={{
                    width: "11px",
                    height: "11px",
                    marginBottom: "-2px",
                  }}
                />
                <DownSvg
                  style={{ width: "11px", height: "11px", marginTop: "-2px" }}
                />
              </>
            )}
          </>
        )}
        {status === "asc" && (
          <UpSvg style={{ width: "11px", height: "11px" }} />
        )}
        {status === "desc" && (
          <DownSvg style={{ width: "11px", height: "11px" }} />
        )}
      </View>
    </View>
  );
};
