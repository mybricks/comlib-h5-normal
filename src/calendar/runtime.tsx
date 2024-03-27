import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Image } from "@tarojs/components";
import { Calendar } from "brickd-mobile";
import { isDate } from "./../utils/core";

import css from "./runtime.less";

export default ({ data, inputs, outputs }) => {
  const selectDateRef = useRef(null);

  const handleSelect = useCallback((val) => {
    outputs["onSelect"]?.(val);
    selectDateRef.current = val;
  }, []);

  const handleConfirm = useCallback((val) => {
    outputs["onConfirm"]?.(val);
  }, [])

  useMemo(() => {
    // 获取日历数据
    inputs["getSelectDate"]?.((val, outputRels) => {
      outputRels["returnValues"]?.(selectDateRef.current);
    });
  }, [])

  return (
    <View className={`mybricks-calendar ${css.calendar}`}>
      <Calendar
        type={data.type}
        min={isDate(data.min) ? data.min : undefined}
        max={isDate(data.max) ? data.max : undefined}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    </View>
  );
};
