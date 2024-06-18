import React, { useEffect } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";
import { isEmpty, isObject } from "./../../utils/core";
import { useFilterItemValue } from "./../common";

const UNSET_VALUE = "_UNSET_";

export default (props) => {
  const { id, env, data, inputs, outputs, slots } = props;

  const { filterValue, setFilterValue } = useFilterItemValue(
    {
      defaultValue: UNSET_VALUE,
      onReceiveValue: (value) => {

        console.warn("value", value);

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

  useEffect(() => {
    inputs["setValue"]((val) => {
      console.warn("setValue", val);
      setFilterValue(val);
      slots["item"].inputs["filterValue"](val);
    });

    inputs["setInitialValue"]((val) => {
      console.warn("setInitialValue", val);
      setFilterValue(val);
      slots["item"].inputs["filterValue"](val);
    });

    slots["item"].outputs["setFilterValue"]((val) => {
      setFilterValue(val);
    });
  }, []);

  return (
    <View className={css.filterItem}>
      {slots["item"].render({
        inputValues: {
          filterValue: filterValue === UNSET_VALUE ? "" : filterValue,
        }
      })}
    </View>
  );
};
