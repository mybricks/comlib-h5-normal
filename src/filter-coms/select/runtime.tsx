import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, Button } from "@tarojs/components";
import { Popup } from "brickd-mobile";
import Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";
import { isEmpty, isString } from "./../../utils/core";
import { useFilterItemValue } from "./../common";

export default (props) => {
  const { env, data, inputs, outputs, slots } = props;
  const { filterValue, setFilterValue } = useFilterItemValue(
    {
      defaultValue: "",
      onReceiveValue: (value) => {
        switch (true) {
          case isEmpty(value): {
            setFilterValue(value);
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
        return value;
      },
    },
    props
  );

  return (
    <div className={css.filterItem}>
      adfsdf
      <Popup placement="top" open={false}></Popup>
    </div>
  );
};
