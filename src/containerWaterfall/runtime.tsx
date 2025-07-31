import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import { uuid, debounce, throttle } from "../utils";
import { List, Loading } from "brickd-mobile";
import { Direction } from "./constant";
import cx from "classnames";

const rowKey = "_itemKey";

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

const useReachBottom = (callback, { env }) => {
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

  const callbackThrottle = useCallback(
    throttle(
      () => {
        cbRef.current?.();
      },
      300,
      true
    ),
    []
  );

  useEffect(() => {
    const offset = 100;

    env?.rootScroll?.onScroll?.((e) => {
      const { scrollTop, scrollHeight } = e.detail ?? {};
      updateScrollRect();
      const clientHeight =
        scrollMeta.current.clientHeight == 0
          ? 750
          : scrollMeta.current.clientHeight;
      const isReachEdge = scrollTop + clientHeight + offset > scrollHeight;
      if (isReachEdge) {
        callbackThrottle();
      }
    });
  }, []);
};

export const ContainerList = ({ env, data, inputs, outputs, slots }) => {
  const [dataSource, setDataSource] = useState<DsItem[]>([]);

  const [status, setStatus] = useState<ListStatus>(ListStatus.IDLE);
  const statusRef = useRef(false);

  useReachBottom(
    () => {
      if (!data.enableLoadMore) return;

      if (statusRef.current === ListStatus.IDLE && status === ListStatus.IDLE) {
        setStatus(ListStatus.LOADING);
        statusRef.current = ListStatus.LOADING;
        outputs["onScrollLoad"]?.();
      }
    },
    { env }
  );

  /** 注意！！！，inputs loading 必须在设置数据源之前，否则时序上会导致有可能设置数据源比loading快的情况，会导致onScrollLoad无法触发 */
  useMemo(() => {
    inputs["loading"]?.((bool) => {
      setStatus(ListStatus.LOADING);
      statusRef.current = ListStatus.LOADING;
    });

    inputs["noMore"]?.((bool) => {
      setStatus(ListStatus.NOMORE);
      statusRef.current = ListStatus.NOMORE;
    });

    inputs["error"]?.((bool) => {
      setStatus(ListStatus.ERROR);
      statusRef.current = ListStatus.ERROR;
    });

    inputs["addDataSource"]((val, outputRels) => {
      if (Array.isArray(val)) {
        const ds = val.map((item, index) => ({
          item,
          [rowKey]: data.rowKey === "" ? uuid() : item[data.rowKey] || uuid(),
          index: index,
        }));
        setDataSource((c) => c.concat(ds));
        setTimeout(() => {
          setStatus(ListStatus.IDLE);
          statusRef.current = ListStatus.IDLE;
        }, 0);

        setTimeout(() => {
          outputRels["afterAddDataSource"]?.();
        }, 10);
      }
    });

    inputs["refreshDataSource"]((val, outputRels) => {
      if (Array.isArray(val)) {
        const ds = val.map((item, index) => ({
          item,
          [rowKey]: data.rowKey === "" ? uuid() : item[data.rowKey] || uuid(),
          index: index,
        }));
        setDataSource(ds);
        setStatus(ListStatus.IDLE);
        statusRef.current = ListStatus.IDLE;

        setTimeout(() => {
          outputRels["afterRefreshDataSource"]?.();
        }, 10);
      }
    });

    inputs["reset"]((val, relOutputs) => {
      setDataSource([]);
      relOutputs["afterReset"]?.();
    });
  }, []);

  useEffect(() => {
    /* 获取值 */
    inputs["getDataSource"]((val, outputRels) => {
      outputRels["getDataSourceSuccess"](
        dataSource.map((item, index) => ({ ...item.item }))
      );
    });
  }, [dataSource]);

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

  const hasMore = useMemo(() => {
    return ListStatus.NOMORE !== status;
  }, [status]);

  const loading = useMemo(() => {
    return ListStatus.LOADING === status;
  }, [status]);

  const error = useMemo(() => {
    return ListStatus.ERROR === status;
  }, [status]);

  // const didMount = useRef(false);
  useEffect(() => {
    return;

    // if (!didMount.current) {
    //   // 不管上次配置的如何，第一次渲染必须配置成默认
    //   data._edit_status_ = "默认";
    //   didMount.current = true;
    // }

    if (env.edit) {
      switch (true) {
        case data._edit_status_ === "加载中": {
          setStatus(ListStatus.LOADING);
          statusRef.current = ListStatus.LOADING;
          break;
        }
        case data._edit_status_ === "加载失败": {
          setStatus(ListStatus.ERROR);
          statusRef.current = ListStatus.ERROR;
          break;
        }
        case data._edit_status_ === "没有更多": {
          setStatus(ListStatus.NOMORE);
          statusRef.current = ListStatus.NOMORE;
          break;
        }
        default: {
          setStatus(ListStatus.IDLE);
          statusRef.current = ListStatus.IDLE;
          break;
        }
      }
    }
  }, [data._edit_status_]);

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

  /**
   * 提示信息
   */
  const useGrid = useMemo(() => {
    if (env.runtime) {
      return data.layout.type === "grid";
    } else {
      return data._edit_status_ === "默认" && data.layout.type === "grid";
    }
  }, [env.runtime, data.layout.type, data._edit_status_]);

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
          {slots["item"].render({
            inputValues: {
              itemData: item,
              index: index,
            },
            cache:{
              for: 0,
              index: index,
            },
            key: key,
            style: {
              height: slots["item"].size ? "unset" : "120px",
            },
          })}
        </View>
      );
    }
  );

  const useWaterfall = useMemo(() => {
    if (env.runtime) {
      return data.layout.type === "waterfall";
    } else {
      return data._edit_status_ === "默认" && data.layout.type === "waterfall";
    }
  }, [env.runtime, data.layout.type, data._edit_status_]);

  const $waterfall = _2DdataSource.map((col, _index) => {
    let $col = col.map(({ [rowKey]: key, index: index, item: item }, _idx) => {
      return (
        <View
          className={cx({
            [css.item]: true,
            ["disabled-area"]: env.edit && (_index !== 0 || _idx > 0),
          })}
          style={{
            paddingBottom: `${data.layout.gutter[0]}px`,
          }}
          key={key}
        >
          {slots["item"].render({
            inputValues: {
              itemData: item,
              index: index,
            },
            cache:{
              for: 0,
              index: index,
            },
            key: key,
            style: {
              height: slots["item"].size ? "unset" : "120px",
            },
          })}
        </View>
      );
    });

    return (
      <View
        className={cx({
          [css["waterfall-col"]]: true,
        })}
        style={{
          paddingRight: `${data.layout.gutter[1]}px`,
          maxWidth: `${100 / data.layout.column}%`,
          flexBasis: `${100 / data.layout.column}%`,
        }}
        key={_index}
      >
        {$col}
      </View>
    );
  });

  const useLoading = useMemo(() => {
    if (env.runtime) {
      return (
        status === ListStatus.LOADING &&
        data.layout.minHeight > 0 &&
        dataSource.length === 0
      );
    } else {
      return data._edit_status_ === "加载中";
    }
  }, [env.runtime, data.layout.minHeight, status, dataSource]);

  const $loading = useMemo(() => {
    return (
      <View
        className={cx(["mybricks-loading", css.status])}
        style={{
          height: `${data.layout.minHeight}px`,
        }}
      >
        {data.loading.icon ? (
          <Image
            className={cx(["mybricks-loading-icon", css.icon])}
            src={data.loading.icon}
          ></Image>
        ) : null}
        <View className={cx(["mybricks-loading-text", css.text])}>
          {data.loading.text}
        </View>
      </View>
    );
  }, [data.layout.minHeight, data.loading.icon, data.loading.text]);

  const useLoadingBar = useMemo(() => {
    if (env.runtime) {
      if (!data.enableLoadMore) return false;
      return status === ListStatus.LOADING && dataSource.length > 0;
    } else {
      return data._edit_status_ === "加载中";
    }
  }, [env.runtime, status, dataSource, data.enableLoadMore]);

  const $loadingBar = useMemo(() => {
    return (
      <View className={cx(["mybricks-loadingBar", css.statusBar])}>
        {data.loadingBar.text}
      </View>
    );
  }, []);

  const useError = useMemo(() => {
    if (env.runtime) {
      return (
        status === ListStatus.ERROR &&
        data.layout.minHeight > 0 &&
        dataSource.length === 0
      );
    } else {
      return data._edit_status_ === "加载失败";
    }
  }, [env.runtime, status, dataSource]);

  const $error = useMemo(() => {
    return (
      <View
        className={cx(["mybricks-error", css.status])}
        style={{
          height: `${data.layout.minHeight}px`,
        }}
      >
        {data.error.icon ? (
          <Image
            className={cx(["mybricks-error-icon", css.icon])}
            src={data.error.icon}
          ></Image>
        ) : null}
        <View className={cx(["mybricks-error-text", css.text])}>
          {data.error.text}
        </View>
      </View>
    );
  }, [data.layout.minHeight, data.error.icon, data.error.text]);

  const useErrorBar = useMemo(() => {
    if (env.runtime) {
      return status === ListStatus.ERROR && dataSource.length > 0;
    } else {
      return data._edit_status_ === "加载失败";
    }
  }, [env.runtime, status, dataSource]);

  const $errorBar = useMemo(() => {
    return (
      <View className={cx(["mybricks-errorBar", css.statusBar])}>
        {data.errorBar.text}
      </View>
    );
  }, []);

  const useEmpty = useMemo(() => {
    if (env.runtime) {
      return (
        status === ListStatus.NOMORE &&
        data.layout.minHeight > 0 &&
        dataSource.length === 0
      );
    } else {
      return data._edit_status_ === "没有更多";
    }
  }, [env.runtime, status, dataSource]);

  const $empty = useMemo(() => {
    return (
      <View
        className={cx(["mybricks-empty", css.status])}
        style={{
          height: `${data.layout.minHeight}px`,
        }}
      >
        {data.empty.icon ? (
          <Image
            className={cx(["mybricks-empty-icon", css.icon])}
            src={data.empty.icon}
          ></Image>
        ) : null}
        <View className={cx(["mybricks-empty-text", css.text])}>
          {data.empty.text}
        </View>
      </View>
    );
  }, [data.layout.minHeight, data.empty.icon, data.empty.text]);

  const useEmptyBar = useMemo(() => {
    if (env.runtime) {
      return status === ListStatus.NOMORE && dataSource.length > 0;
    } else {
      return data._edit_status_ === "没有更多";
    }
  }, [env.runtime, status, dataSource]);

  const $emptyBar = useMemo(() => {
    return (
      <View className={cx(["mybricks-emptyBar", css.statusBar])}>
        {data.emptyBar.text}
      </View>
    );
  }, []);

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
      {/* Grid */}
      {useGrid && $grid}

      {/* Waterfall */}
      {useWaterfall && $waterfall}

      {useLoading ||
      useLoadingBar ||
      useError ||
      useErrorBar ||
      useEmpty ||
      useEmptyBar ? (
        <View
          className={css.placeholder}
          style={{
            marginRight: `${data.layout.gutter[1]}px`,
            marginBottom: `${data.layout.gutter[0]}px`,
          }}
        >
          {/* Loading */}
          {useLoading && $loading}

          {/* Loading bar */}
          {useLoadingBar && $loadingBar}

          {/* Error */}
          {useError && $error}

          {/* Error bar */}
          {useErrorBar && $errorBar}

          {/* Empty */}
          {useEmpty && $empty}

          {/* Empty bar */}
          {useEmptyBar && $emptyBar}
        </View>
      ) : null}

      {/* <List.Placeholder>
        {loading && <Loading>{data.loadingTip ?? "..."}</Loading>}
        {error && (data.errorTip ?? "加载失败，请重试")}
        {!hasMore && (data.emptyTip ?? "没有更多了")}
      </List.Placeholder> */}

      {/* <>
          {!!data?.scrollRefresh ? (
            <>
              {$list}
              <List.Placeholder>
                {loading && <Loading>{data.loadingTip ?? "..."}</Loading>}
                {error && (data.errorTip ?? "加载失败，请重试")}
                {!hasMore && (data.emptyTip ?? "没有更多了")}
              </List.Placeholder>
            </>
          ) : (
            <>
              {status !== ListStatus.IDLE ? (
                <List.Placeholder>
                  {loading && <Loading>{data.loadingTip ?? "..."}</Loading>}
                  {error && (data.errorTip ?? "加载失败，请重试")}
                </List.Placeholder>
              ) : (
                $list
              )}
            </>
          )}
        </> */}
    </View>
  );
};

export default ContainerList;
