import React, { useEffect, useMemo, useRef, useState } from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import { uuid } from "../utils";
import cx from "classnames";

const rowKey = "_itemKey";

const mockData: DsItem[] = [
  { [rowKey]: 1, index: 1 },
  { [rowKey]: 2, index: 2 },
  { [rowKey]: 3, index: 3 },
] as DsItem[];

interface DsItem {
  item: any;
  [rowKey]: string | number;
  index: number;
}

enum ListStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
  NOMORE = "noMore",
}

export const ContainerList = ({ env, data, inputs, outputs, slots }) => {
  // const mountRef = useRef(false);
  const [dataSource, setDataSource] = useState<DsItem[]>(
    env.edit ? mockData : []
  );

  const [status, setStatus] = useState<ListStatus>(ListStatus.IDLE);

  useEffect(() => {
    inputs["addDataSource"]((val) => {
      if (Array.isArray(val)) {
        const ds = val.map((item, index) => ({
          item,
          [rowKey]: data.rowKey === "" ? uuid() : item[data.rowKey] || uuid(),
          index: index,
        }));
        setDataSource((c) => c.concat(ds));
        setStatus(ListStatus.IDLE);
      }
      // setLoading(false);
    });

    inputs["refreshDataSource"]((val) => {
      if (Array.isArray(val)) {
        const ds = val.map((item, index) => ({
          item,
          [rowKey]: data.rowKey === "" ? uuid() : item[data.rowKey] || uuid(),
          index: index,
        }));
        setDataSource(ds);
        setStatus(ListStatus.IDLE);
      }
      // setLoading(false);
    });

    // inputs['status']?.((status: ListStatus) => {
    //   setStatus(status)
    // })

    inputs["loading"]?.((bool) => {
      setStatus(ListStatus.LOADING);
    });

    inputs["noMore"]?.((bool) => {
      setStatus(ListStatus.NOMORE);
    });

    inputs["error"]?.((bool) => {
      setStatus(ListStatus.ERROR);
    });
  }, []);

  const $placeholder = useMemo(() => {
    if (env.edit && !slots["item"].size) {
      return <View className={css.placeholder}>{slots["item"].render()}</View>;
    } else {
      return null;
    }
  }, [env.edit, dataSource, slots["item"], slots["item"].size]);

  const hasMore = useMemo(() => {
    return ListStatus.NOMORE !== status;
  }, [status]);

  const loading = useMemo(() => {
    return ListStatus.LOADING === status;
  }, [status]);

  const error = useMemo(() => {
    return ListStatus.ERROR === status;
  }, [status]);

  // useEffect(() => {
  //   /** TODO，用于规避第一次mount或者一开始太短了直接到底的onLoad，初始化还是让外部来做吧 */
  //   setTimeout(() => {
  //     mountRef.current = true;
  //   }, 1500);
  // }, []);

  const listCx = useMemo(() => {
    return cx(css.list, {
      [css.wrap]: data.wrap,
      [css.nowrap]: !data.wrap,
    });
  }, [data.wrap]);

  return (
    <View className={listCx}>
      {$placeholder ||
        dataSource.map(({ [rowKey]: key, index: index, item: item }, _idx) => {
          return (
            <View
              className={env.edit && _idx > 0 ? "disabled-area" : css.item}
              key={key}
            >
              {/* 当前项数据和索引 */}
              {slots["item"].render({
                inputValues: {
                  itemData: item,
                  index: index,
                },
                key: key,
              })}
            </View>
          );
        })}
    </View>
  );
};

export default ContainerList;
