import React, { useCallback, useEffect, useMemo } from "react";
import { Textarea } from "brickd-mobile";
import { isNumber, isString, isObject, isEmpty } from "./../utils/core";
import css from "./style.less";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = "";
          break;
        }
        case isString(val) || isNumber(val):
          data.value = String(val);
          break;
        case isObject(val):
          if (val[data.name] === null) {
            return;
          }
          data.value = val[data.name];
          break;
        default:
          break;
      }
    });

    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](data.value);
    });
  }, []);

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    data.value = value;
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onChange"](value);
  }, []);

  const limit = useMemo(() => {
    return data.limit || false;
  }, [data.limit]);

  const isAutoHeight = useMemo(()=>{
    if(data.autoHeight){
      return true
    }else{
      return false
    }
  },[data.autoHeight]
)

  return (
    <Textarea
      className={css.textarea}
      value={data.value}
      autoHeight={isAutoHeight}
      limit={limit}
      placeholder={data.placeholder}
      cursorSpacing={60}
      onChange={onChange}
      cursor={data.value.length}
    />
  );
}
