import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import { uuid, debounce, throttle } from "../utils";
import { List, Loading } from "brickd-mobile";
import { Direction } from "./constant";
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
  EMPTY = "empty",
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
    if (!enable) {
      return;
    }

    const offset = 100;

    env?.rootScroll?.onScroll?.((e) => {
      const { scrollTop, scrollHeight } = e.detail ?? {};
      updateScrollRect();
      //支付宝 scrollMeta.current.clientHeight 会取不到，先直接设置为750兼容一下
      const clientHeight =
        scrollMeta.current.clientHeight == 0
          ? 750
          : scrollMeta.current.clientHeight;
      const isReachEdge = scrollTop + clientHeight + offset > scrollHeight;
      if (isReachEdge) {
        callbackThrottle();
      }
      // }
    });
  }, [enable]);
};

export const ContainerList = ({ env, data, inputs, outputs, slots }) => {
  const [dataSource, setDataSource] = useState<DsItem[]>(
    env.edit || env?.runtime?.debug?.prototype ? mockData : []
  );
  const [status, setStatus] = useState<ListStatus>(ListStatus.IDLE);
  const statusRef = useRef(false);

  useReachBottom(
    () => {
      if (statusRef.current === ListStatus.IDLE && status === ListStatus.IDLE) {
        setStatus(ListStatus.LOADING);
        statusRef.current = ListStatus.LOADING;
        outputs["onScrollLoad"]?.();
      }
    },
    { env, enable: !!data.scrollRefresh && data.direction !== Direction.Row }
  );

  //默认是否显示加载中
  useEffect(() => {
    if (data.defaultActive == "loading" && !env.edit) {
      setStatus(ListStatus.LOADING);
      statusRef.current = ListStatus.LOADING;
    }
  }, [data.defaultActive]);

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

    inputs["empty"]?.((bool) => {
      setStatus(ListStatus.EMPTY);
      statusRef.current = ListStatus.EMPTY;
    });

    inputs["addDataSource"]((val) => {
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
      }
    });

    inputs["refreshDataSource"]((val) => {
      if (Array.isArray(val)) {
        const ds = val.map((item, index) => ({
          item,
          [rowKey]: data.rowKey === "" ? uuid() : item[data.rowKey] || uuid(),
          index: index,
        }));
        //覆盖数据前先清空，放置输入重复内容时，列表项不会触发
        setDataSource([]);
        setTimeout(() => {
          setDataSource(ds);
        }, 0);
        if (data.autoEmptyCondition && val.length === 0) {
          setStatus(ListStatus.EMPTY);
          statusRef.current = ListStatus.EMPTY;
        } else {
          setStatus(ListStatus.IDLE);
          statusRef.current = ListStatus.IDLE;
        }
      }
    });
  }, []);

  useEffect(() => {
    /* 获取值 */
    inputs["getDataSource"]?.((val, outputRels) => {
      outputRels["getDataSourceSuccess"](
        dataSource.map((item, index) => ({ ...item.item }))
      );
    });
  }, [dataSource]);

  // const $placeholder = useMemo(() => {
  //   if (env.edit && !slots["item"].size) {
  //     return null
  //     return (
  //       <View
  //         className={css.placeholder}
  //         style={{
  //           [data.direction === Direction.Row
  //             ? "marginRight"
  //             : "marginBottom"]: `${data.spacing}px`,
  //         }}
  //       >
  //         {slots["item"].render({
  //           style: {
  //             height: "120px",
  //           },
  //         })}
  //       </View>
  //     );
  //   } else {
  //     return null;
  //   }
  // }, [
  //   env.edit,
  //   dataSource,
  //   slots["item"],
  //   slots["item"].size,
  //   data.direction,
  //   data.spacing,
  // ]);

  const empty = useMemo(() => {
    return ListStatus.EMPTY === status;
  }, [status]);

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
      //显示加载中和错误的时候，居中对齐
      if (loading || error) {
        return `${css.list} ${css.row} ${css.scroll_x} ${css.justify_content_center} `;
      } else if (data.wrap) {
        return `${css.list} ${css.row} ${css.scroll_x} ${css.flex_wrap}`;
      } else {
        return `${css.list} ${css.row} ${css.scroll_x}`;
      }
    }

    return data.scrollRefresh
      ? `${css.list} ${css.scroll}`
      : `${css.list} ${css.normal}`;
  }, [data.scrollRefresh, data.direction, loading, error, data.wrap]);

  const didMount = useRef(false);
  useEffect(() => {
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
        case data._edit_status_ === "无内容": {
          setStatus(ListStatus.EMPTY);
          statusRef.current = ListStatus.EMPTY;
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

  // const showDataSource = useMemo(() => {
  //   if (env.edit && status !== ListStatus.IDLE && !data.scrollRefresh) {
  //     return false;
  //   }
  //   return true;
  // }, [status]);

  const $list = dataSource.map(
    ({ [rowKey]: key, index: index, item: item }, _idx) => {
      const isLastItem = _idx === dataSource.length - 1;
      return (
        <View
          className={cx({
            [css.item]: true,
            ["disabled-area"]: env.edit && _idx > 0,
            [css.item]: !env.edit || _idx === 0,
            // env.edit && _idx > 0 ? "disabled-area" : css.item
          })}
          key={key}
          //如果是最后一项，则不加margin
          style={{
            [data.direction === Direction.Row ? "marginRight" : "marginBottom"]:
              isLastItem ? `0px` : `${data.spacing}px`,
          }}
        >
          {/* 当前项数据和索引 */}
          {slots["item"].render({
            inputValues: {
              itemData: item,
              index: index,
            },
            key: key,
            cache:{
              for: 0,
              index: _idx,
            },
            style: {
              width:
                slots["item"].size || data.direction === Direction.Column
                  ? ""
                  : "72px",
              height: slots["item"].size ? "unset" : "60px",
            },
          })}
        </View>
      );
    }
  );

  return (
    <View className={css.listWrapper}>
      <View
        className={wrapperCls}
        // style={{
        //   [data.direction === Direction.Row
        //     ? "marginRight"
        //     : "marginBottom"]: `-${data.spacing}px`,
        // }}
      >
        {/* {$placeholder || (  */}
        <>
          {!!data?.scrollRefresh ? (
            <>
              {!empty && $list}
              {status !== ListStatus.IDLE && (
                <List.Placeholder>
                  {loading && <Loading>{data.loadingTip ?? "..."}</Loading>}
                  {error && (data.errorTip ?? "加载失败，请重试")}
                  {!hasMore && (data.emptyTip ?? "没有更多了")}
                  {empty && data.showEmptySlot ? (
                    <View>
                      {" "}
                      {slots["emptySlot"].render({
                        style: {
                          minHeight: 130,
                          minWidth: 200,
                        },
                      })}
                    </View>
                  ) : (
                    empty && data.initialEmptyTip
                  )}
                </List.Placeholder>
              )}
            </>
          ) : (
            <>
              {status !== ListStatus.IDLE ? (
                <List.Placeholder>
                  {loading && <Loading>{data.loadingTip ?? "..."}</Loading>}
                  {error && (data.errorTip ?? "加载失败，请重试")}
                  {empty && data.showEmptySlot ? (
                    <View className={css.empty_slot}>
                      {" "}
                      {slots["emptySlot"].render({
                        style: {
                          minHeight: 130,
                          minWidth: 200,
                        },
                      })}
                    </View>
                  ) : (
                    empty && data.initialEmptyTip
                  )}
                </List.Placeholder>
              ) : (
                $list
              )}
            </>
          )}
        </>
        {/* )} */}
      </View>
    </View>
  );
};

export default ContainerList;
