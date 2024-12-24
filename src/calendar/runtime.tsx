import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Image } from "@tarojs/components";
import { Calendar } from "brickd-mobile";
// import { Calendar } from "../../../brickd-mobile/src";
// import  Calendar  from "./calendar/index";
import { isDate } from "./../utils/core";

import css from "./runtime.less";

export default ({ data, inputs, outputs }) => {
  const [min, setMin] = useState(data.available_start_time || "");
  const [max, setMax] = useState(data.available_end_time || "");

  const selectDateRef = useRef(null);

  const handleSelect = useCallback((val) => {
    outputs["onSelect"]?.(val);
    selectDateRef.current = val;
  }, []);

  const handleConfirm = useCallback((val) => {
    outputs["onConfirm"]?.(val);
  }, []);

  useMemo(() => {
    // 获取日历数据
    inputs["getSelectDate"]?.((val, outputRels) => {
      //遍历选中的日期，从date格式转为时间戳
      const dates = selectDateRef.current || [];
      let datesList = dates.map((res=>{
        if(res){
          return new Date(res).getTime();
        }else{
          return {};
        }
      }))
      outputRels["returnValues"]?.(datesList);
    });

    inputs["setCustomRange"]?.((val, outputRels) => {
      if (val?.min && val?.max) {
        setMin(val.min);
        setMax(val.max);
      }
      outputRels["afterSetCustomRange"]();
    });

    //todo 设置值
    inputs["setValue"]?.((val,outputRels) => {
      outputRels["setValueDone"](val);
    })
  }, []);

  const range = useMemo(() => {
    if (min && max) {
      return {
        min: new Date(min),
        max: new Date(max),
      };
    }

    return {};
  }, [min, max]);

  return (
    <View className={`mybricks-calendar ${css.calendar}`}>
      <Calendar
        type={data.type}
        {...range}
        onSelect={handleSelect}
        onChange={handleSelect}
        onConfirm={handleConfirm}
      />
    </View>
  );
};
