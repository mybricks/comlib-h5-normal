import React, {
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import Head from "./runtime/Head";
import Row from "./runtime/Row";
import { uuid, debounce } from "../utils";

const rowKey = "_itemKey";

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

  useEffect(() => {
    const offset = 100;

    env?.rootScroll?.onScroll?.((e) => {
      const { scrollTop, scrollHeight } = e.detail ?? {};
      updateScrollRect();
      // console.log(" scrollTop + scrollMeta.current.clientHeight + offset > scrollHeight",scrollTop,scrollMeta.current.clientHeight,offset,">",scrollHeight)
      // if (scrollMeta.current.clientHeight) {
      const clientHeight =
        scrollMeta.current.clientHeight == 0
          ? 750
          : scrollMeta.current.clientHeight;
      const isReachEdge = scrollTop + clientHeight + offset > scrollHeight;
      if (isReachEdge) {
        cbRef.current?.();
      }
      // }
    });
  }, []);
};

export default function ({ env, data, inputs, outputs, slots }) {
  const [dataSource, setDataSource] = useState(env.edit ? [{}, {}, {}] : []);
  const dataSourceRef = useRef(dataSource);
  const [status, setStatus] = useState<ListStatus>(ListStatus.IDLE);
  const [column, setColumn] = useState(data.columns)

  useEffect(()=>{
      setColumn(data.columns)
  },[data.columns])

  const defaultColumn = () => {
    return {
      id: uuid().slice(0, 6),
      type: "text",
      autoWidth: true,
      minWidth: "90",
      width: "100",
    }

  }

  let page = data.pagenation.page ?? 1;

  useReachBottom(
    () => {
      if (!data.enableLoadMore) return;
      // setPage((s) =>{
      //   console.log("page",s,"status",status)
      //   if (status === ListStatus.IDLE) {
      //     return s + 1
      //   }else{
      //     return s
      //   }
      // } );

      setStatus((s) => {
        if (s === ListStatus.IDLE) {
          outputs["onScrollLoad"]?.({
            page: page,
            pageSize: data.pagenation.pageSize ?? 10,
          });
          page++;
          return ListStatus.LOADING;
        }
        return s;
      });
    },
    { env }
  );

  useEffect(() => {
    inputs["setDataSource"]((val, outputRels) => {
      setDataSource(val);
      dataSourceRef.current = val;
      outputRels["afterSetDataSource"](val);
    });

    inputs["addDataSource"]((val) => {
      if (Array.isArray(val)) {
        const ds = val.map((item, index) => ({
          item,
          [rowKey]: data.rowKey === "" ? uuid() : item[data.rowKey] || uuid(),
          index: index,
        }));
        setDataSource((c) => c.concat(ds));
        dataSourceRef.current = dataSourceRef.current.concat(ds);
        setTimeout(() => {
          setStatus(ListStatus.IDLE);
        }, 0);
      }
    });

    inputs?.["getDataSource"]((val, outputRels) => {
      outputRels["afterGetDataSource"]?.(dataSourceRef.current);
    });

    inputs?.["setTableHeader"]((val, outputRels) => {
      let headerArray = val.map((item) => {
        return {
          ...defaultColumn(),
          ...item,
        }
      })
      setColumn(headerArray)
      outputRels?.["afterSetTableHeader"]?.(headerArray);
    })
  }, [dataSource]);

  const $loading = useMemo(() => {
    return <View className={css.loading}>加载中…</View>;
  }, []);

  //
  if (env.edit && !column.length) {
    return <View className={css.placeholder}>请添加表格列</View>;
  }

  return (
    <View className={cx(css["table-wrapper"], "mybricks-table")}>
      <View className={css["table-track"]}>
        <View
          className={cx({
            [css.table]: true,
            [css.bordered]: data.bordered,
          })}
        >
          {/* thead */}
          {data.hiddenTableHeader ? null : (
            <Head columns={column} data={data}></Head>
          )}

          {/* tbody */}
          {dataSource.map((item, index) => {
            return (
              <Row
                record={item}
                index={index}
                columns={column}
                data={data}
                env={env}
                outputs={outputs}
                slots={slots}
                key={`${index}-${JSON.stringify(item)}`}
              ></Row>
            );
          })}
        </View>
        {status === ListStatus.LOADING && $loading}
      </View>
    </View>
  );
}
