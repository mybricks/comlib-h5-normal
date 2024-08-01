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
import { isEmpty, isObject } from "./../../utils/core";
import { getFilterItem } from "./utils";

/** 去除value为undefined场景的对象 */
const omitUndefinedKeys = (obj) => {
  const resWithoutUndefined = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      resWithoutUndefined[key] = obj[key];
    }
  });
  return resWithoutUndefined;
};

const useFilters = ({ items, childrenInputs }) => {
  const filterValuesRef = useRef({});

  const ref = useMemo(() => {
    return {
      getValues: () => {
        const res = filterValuesRef.current;
        return omitUndefinedKeys(res);
      },
      // setFieldValue: (name, value) => {
      //   filterValuesRef.current[name] = value
      //   // 如果是同key的filter，也需要设置value，用于筛选互斥的情况
      //   items.forEach(item => {
      //     if (item.name === name && ) {
      //       childrenInputs.current[item.comName ?? item.id]?.["setValue"]?.(
      //         value
      //       );
      //     }
      //   });
      // },
      /** child slot 的 onChange 一定要用这个方法，同时会设置其它同名筛选项的value，实现筛选项的互斥 */
      setFieldValueByFilterChildCom: (id, comName, value) => {
        const triggerItem = getFilterItem(items, { id, name: comName });
        if (!triggerItem) {
          return;
        }

        filterValuesRef.current[triggerItem?.name] = value;

        /** 如果是同key的filter，也需要设置value，用于筛选互斥的情况 */
        items.forEach((item) => {
          if (item.name === triggerItem?.name) {
            childrenInputs.current[item.comName ?? item.id]?.["setValue"]?.(
              value
            );
          }
        });
      },
      setValues: (val) => {
        const valuesWithUndefined = {};
        /** 设置表单项的value */
        items.forEach((item) => {
          const itemValue = { ...(val ?? {}) }[item.name];
          childrenInputs.current[item.comName ?? item.id]?.["setValue"]?.(
            itemValue
          );
          valuesWithUndefined[item.name] =
            itemValue !== undefined ? itemValue : undefined;
        });

        filterValuesRef.current = valuesWithUndefined;
      },
    };
  }, []);

  return [ref, filterValuesRef];
};

function deepEqual(obj1, obj2) {
  obj1 = JSON.parse(JSON.stringify(obj1));
  obj2 = JSON.parse(JSON.stringify(obj2));

  // 检查是否是相同的引用
  if (obj1 === obj2) {
    return true;
  }

  // 检查是否都是对象
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  // 获取对象的键数组
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 键数量不同，直接返回 false
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 检查每一个键和值是否相等
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export default ({ env, data, slots, inputs, outputs }) => {
  const childrenInputs = useRef({});

  const [filterRef] = useFilters({ items: data.items, childrenInputs });

  const _valueCache = useRef({});

  //设置值
  useEffect(() => {
    inputs["setFieldsValue"]((val) => {
      if (isEmpty(val) || !isObject(val)) {
        return;
      }

      let result = {
        ...filterRef.getValues(),
        ...val,
      };

      filterRef.setValues(result);
      // 触发「表单数据输入」
      slots["content"].inputs["setFieldsValue"](result);
    });

    inputs["getFieldsValue"]((val, outputRels) => {
      const values = filterRef.getValues();
      outputRels["returnValues"](values);
    });

    /** 下发表单项的onChange函数，用来收集表单项数据 */
    slots["content"]._inputs["onChange"](({ id, name: comName, value }) => {
      filterRef.setFieldValueByFilterChildCom(id, comName, value);

      // 触发 onchange
      let result = filterRef.getValues();

      // 如果 value 没有变化，不触发 onChange
      if (deepEqual(result, _valueCache.current)) {
        return;
      }

      _valueCache.current = { ...result };

      outputs["onChange"](result);
    });
  }, []);

  const flexStyle = useMemo(() => {
    if (data.tabWidthType === "fit") {
      return {
        flex: 0,
      };
    } else {
      return {
        flex: 1,
      };
    }
  }, [data.tabWidthType]);

  const content = useMemo(() => {
    return (
      <>
        {slots["content"].render({
          style: {
            display: "flex",
            flexWrap: "nowrap",
          },
          // itemWrap(com: { id; jsx; name }) {
          //   // todo name
          //   // const idx = findFormItemIndex(data.items, com);
          //   // const item = data.items[idx] ?? ({});

          //   // const isLast = data.items.length - 1 === idx

          //   return (
          //     <View
          //       className={cx(
          //         "mybricks-filter",
          //       )}
          //     >
          //       {com.jsx}
          //     </View>
          //   );
          // },
          wrap(comAray: { id; name; jsx; def; inputs; outputs; style }[]) {
            const items = data.items ?? [];

            const jsx = comAray?.map((com, idx) => {
              if (com) {
                let item = getFilterItem(data.items, com);
                item.index = idx;

                if (!item) {
                  if (items.length === comAray.length) {
                    console.warn(`formItem comId ${com.id} formItem not found`);
                  }
                  return;
                }

                if (item.comName) {
                  childrenInputs.current[com.name] = com.inputs;
                } else {
                  childrenInputs.current[com.id] = com.inputs;
                }

                return (
                  <View className={css.item} style={flexStyle}>
                    {com.jsx}
                  </View>
                );
              }
            });

            return jsx;
          },
        })}
      </>
    );
  }, [data.tabWidthType]);

  return (
    <View className={`${css.filters} mbs-filters`}>
      <View className={css.content}>{content}</View>
      {data.extraButton && (
        <View className={`${css.extra} mbs-filters_extra`}>
          {data.extraButtonText}
        </View>
      )}
    </View>
  );
};
