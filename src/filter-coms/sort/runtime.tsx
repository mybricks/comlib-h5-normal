import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";
import { isEmpty, isString } from "./../../utils/core";
import { useDiffValue, useFilterItemValue } from "./../common";

const UpSvg = ({ style }) => {
  return (
    <svg
      t="1717557925134"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="10247"
      style={style}
    >
      <path
        d="M512 352L232 672h560L512 352z"
        fill="currentColor"
        p-id="10248"
      ></path>
    </svg>
  );
};

const UpSvg = ({ style }) => {
  const base64Svg = `data:image/svg+xml;base64,PHN2ZyB0PSIxNzE3NTU3OTI1MTM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwMjQ3Ij4KICA8cGF0aCBkPSJNNTEyIDM1MkwyMzIgNjcyaDU2MEw1MTIgMzUyeiIgZmlsbD0iY3VycmVudENvbG9yIiBwLWlkPSIxMDI0OCI+PC9wYXRoPgo8L3N2Zz4=`;

  return <Image src={base64Svg} svg={true} style={style} />;
};

const DownSvg = ({ style }) => {
  return <UpSvg style={{ ...style, transform: "rotate(180deg)" }} />;
};

const UNSET_VALUE = "_UNSET_";

export default (props) => {
  const { env, data, inputs, outputs, slots } = props;
  const { filterValue: selectMode, setFilterValue: setSelectMode } =
    useFilterItemValue(
      {
        defaultValue: UNSET_VALUE,
        onReceiveValue: (value) => {
          switch (true) {
            case isEmpty(value): {
              setSelectMode(UNSET_VALUE);
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
          return value === UNSET_VALUE ? "" : value;
        },
      },
      props
    );

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
    const valueQueue = [
      UNSET_VALUE,
      _optionMap.asc.value,
      _optionMap.desc.value,
    ];

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
      setSelectMode(valueQueue[1]);
    }
  }, [status, selectMode, _optionMap]);

  const actived = useMemo(() => {
    return status !== "none";
  }, [status]);

  return (
    <View
      className={`${css.sort} ${
        actived ? "mbs-filter_sort--active" : "mbs-filter_sort"
      }`}
      onClick={handleClick}
      data-id={_optionMap.none?.label}
    >
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
