import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

/** 专用于filter item设计的 value 管理策略，因为需要实现互斥的逻辑，同name组件会互相设置value并触发onChange导致死循环，这里做一个diff */
export const useDiffValue = (defaultVal) => {
  const [value, setValue] = useState(defaultVal);

  const setDiffValue = useCallback((v) => {
    return setValue((c) => {
      if (JSON.stringify(c) !== JSON.stringify(v)) {
        return v;
      } else {
        return c;
      }
    });
  }, []);

  return [value, setDiffValue];
};

export const useFilterItemValue = (
  { defaultValue, onReceiveValue, onChangeValue },
  { inputs, parentSlot, outputs, id, name }
) => {
  const [filterValue, setFilterValue] = useDiffValue(defaultValue);

  useEffect(() => {
    inputs["setValue"]((val) => {
      onReceiveValue?.(val);
    });
  }, []);

  /** onChange通知上级 */
  useEffect(() => {
    const _value = onChangeValue?.(filterValue);
    parentSlot?._inputs["onChange"]?.({ id, name, value: _value });
    outputs["onChange"](_value);
  }, [filterValue]);

  return {
    filterValue,
    setFilterValue,
  };
};
