import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import { uuid, debounce } from "../utils";
import { List, Loading } from "brickd-mobile";
import { Direction } from './constant'

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

const useReachBottom = (callback, { env, enable = false }) => {
  const scrollMeta = useRef({ clientHeight: 0 });

  const cbRef = useRef(callback);

  const updateScrollRect = useCallback(
    debounce(
      () => {
        env?.rootScroll.getBoundingClientRect?.().then(({ height }) => {
          scrollMeta.current.clientHeight = height;
        });
      },
      300,
      true
    ),
    []
  );

  useEffect(() => {
    if (!enable) {
      return;
    }

    const offset = 400;

    env?.rootScroll?.onScroll?.((e) => {
      const { scrollTop, scrollHeight } = e.detail ?? {};
      updateScrollRect();
      if (scrollMeta.current.clientHeight) {
        const isReachEdge =
          scrollTop + scrollMeta.current.clientHeight + offset > scrollHeight;
        if (isReachEdge) {
          cbRef.current?.();
        }
      }
    });
  }, [enable]);
};

export const ContainerList = ({ env, data, inputs, outputs, slots }) => {
  const [dataSource, setDataSource] = useState<DsItem[]>(
    env.edit ? mockData : []
  );
  const [status, setStatus] = useState<ListStatus>(ListStatus.IDLE);

  useReachBottom(
    () => {
      setStatus((s) => {
        if (s === ListStatus.IDLE) {
          outputs["onScrollLoad"]?.();
          return ListStatus.LOADING;
        }
        return s;
      });
    },
    { env, enable: !!data.scrollRefresh && data.direction !== Direction.Row }
  );

  /** 注意！！！，inputs loading 必须在设置数据源之前，否则时序上会导致有可能设置数据源比loading快的情况，会导致onScrollLoad无法触发 */
  useMemo(() => {
    inputs["loading"]?.((bool) => {
      console.log("loading", ListStatus.LOADING);
      setStatus(ListStatus.LOADING);
    });

    inputs["noMore"]?.((bool) => {
      setStatus(ListStatus.NOMORE);
    });

    inputs["error"]?.((bool) => {
      setStatus(ListStatus.ERROR);
    });

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

  const wrapperCls = useMemo(() => {
    if (data.direction === Direction.Row) {
      return `${css.list} ${css.row}`
    }

    return data.scrollRefresh
          ? `${css.list} ${css.scroll}`
          : `${css.list} ${css.normal}`
  }, [data.scrollRefresh, data.direction])


  const didMount = useRef(false)
  useEffect(() => {
    if (!didMount.current) { // 不管上次配置的如何，第一次渲染必须配置成默认
      data._edit_status_ = '默认';
      didMount.current = true;
    }
    if (env.edit) {
      switch(true) {
        case data._edit_status_ === '加载中': {
          setStatus(ListStatus.LOADING);
          break;
        }
        case data._edit_status_ === '加载失败': {
          setStatus(ListStatus.ERROR);
          break;
        }
        case data._edit_status_ === '没有更多': {
          setStatus(ListStatus.NOMORE);
          break;
        }
        default: {
          setStatus(ListStatus.IDLE);
        }
      }
    }
  }, [data._edit_status_])

  const showDateSource = useMemo(() => {
    if (env.edit && status !== ListStatus.IDLE && !data.scrollRefresh) {
      return false
    }
    return true
  }, [status])

  return (
    <View
      className={wrapperCls}
    >
      {$placeholder || (
        <>
          {showDateSource && dataSource.map(
            ({ [rowKey]: key, index: index, item: item }, _idx) => {
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
            }
          )}
          {!!data?.scrollRefresh ? (
            <List.Placeholder>
              {loading && <Loading>{data.loadingTip ?? "..."}</Loading>}
              {error && (data.errorTip ?? "加载失败，请重试")}
              {!hasMore && (data.emptyTip ?? "没有更多了")}
            </List.Placeholder>
          ) : (
            status !== ListStatus.IDLE && (
              <List.Placeholder>
                {loading && <Loading>{data.loadingTip ?? "..."}</Loading>}
                {error && (data.errorTip ?? "加载失败，请重试")}
                {!hasMore && (data.emptyTip ?? "没有更多了")}
              </List.Placeholder>
            )
          )}
        </>
      )}
    </View>
  );
};

export default ContainerList;
