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

const rowKey = "_itemKey";

interface DsItem {
  item: any;
  [rowKey]: string | number;
  index: number;
}

export const SelectorList = ({ env, data, inputs, outputs, slots }) => {
  const [dataSource, setDataSource] = useState<DsItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [clickChange, setClickChange] = useState<boolean>(false);

  /** 注意！！！，inputs loading 必须在设置数据源之前，否则时序上会导致有可能设置数据源比loading快的情况，会导致onScrollLoad无法触发 */
  useMemo(() => {
    inputs["refreshDataSource"]((val, relOutputs) => {
      if (Array.isArray(val)) {
        const ds = val.map((item, index) => ({
          item,
          [rowKey]: data.rowKey === "" ? uuid() : item[data.rowKey] || uuid(),
          index: index,
        }));
        setDataSource(ds);
        relOutputs["refreshDataSourceDone"](val);
      }
    });

    inputs["selectItem"]((val) => {
      if (val === selectedIndex || val < 0) return;
      setClickChange(false)
      setSelectedIndex(val);
    });
  }, []);

  /**
   * 列表项
   */

  // 列表项样式
  const itemStyle = useMemo(() => {
    return {
      paddingRight: `${data.layout.gutter[1]}px`,
      paddingBottom: `${data.layout.gutter[0]}px`,
      maxWidth: `${100 / data.layout.column}%`,
      flexBasis: `${100 / data.layout.column}%`,
    };
  }, [data.layout.column, data.layout.gutter]);

  const _dataSource = useMemo(() => {
    if (env.runtime) {
      return dataSource;
    } else {
      return new Array(3 * data.layout.column).fill(null).map((_, index) => {
        return { [rowKey]: index, index: index };
      });
    }
  }, [dataSource, env.runtime, data.layout.column]);

  const _2DdataSource = useMemo(() => {
    if (env.runtime) {
      return to2D(dataSource, data.layout.column);
    } else {
      let list = new Array(3 * data.layout.column)
        .fill(null)
        .map((_, index) => {
          return { [rowKey]: index, index: index };
        });
      return to2D(list, data.layout.column);
    }

    function to2D(items, column) {
      const result = new Array(column).fill([]);

      items.forEach((item, index) => {
        const col = index % column;
        result[col] = result[col].concat([item]);
      });

      return result;
    }
  }, [dataSource, env.runtime, data.layout.column]);

  const click = (index) => {
    setClickChange(true)
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (selectedIndex === -1 || !dataSource || !dataSource[selectedIndex])
      return;
    if (clickChange) {
      outputs["selectedChanged"](dataSource[selectedIndex]);
    }

  }, [selectedIndex]);

  const $grid = _dataSource.map(
    ({ [rowKey]: key, index: index, item: item }, _idx) => {
      return (
        <View
          className={cx({
            [css["waterfall-item"]]: true,
            ["disabled-area"]: env.edit && _idx > 0,
            [css.item]: !env.edit || _idx === 0,
          })}
          style={{ ...itemStyle }}
          key={key}
        >
          {/* {slots["item"].render({
            inputValues: {
              itemData: item,
              index: index,
            },
            key: key,
            style: {
              height: slots["item"].size ? "unset" : "120px",
            },
          })} */}
          <View
            className={cx({
              [css.button]: true,
              [css.selected]: selectedIndex === index,
              "mybricks-button": true,
              "mybricks-button-selected": selectedIndex === index,
            })}
            onClick={() => click(index)}
          >
            {/* {item.city} */}
            {env.runtime ? item[data.selectedKey] : "杭州"}
          </View>
        </View>
      );
    }
  );

  return (
    <View
      className={css.waterfall}
      style={{
        marginRight: `-${data.layout.gutter[1]}px`,
        marginBottom: `-${data.layout.gutter[0]}px`,
        minHeight: data.layout.minHeight
          ? `${+data.layout.minHeight + data.layout.gutter[0]}px`
          : "unset",
      }}
    >
      {$grid}
    </View>
  );
};

export default SelectorList;
