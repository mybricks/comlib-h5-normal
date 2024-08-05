import { useState, useEffect, useRef, useCallback } from "react";

const useFormItemValue = (initialValue, onChange) => {
  const [value, setValue] = useState(initialValue);
  const valueRef = useRef(initialValue);
  const valueRefProxy = useRef(initialValue);

  useEffect(() => {
    if (value !== valueRef.current) {
      valueRef.current = value;
      if (typeof onChange === "function") {
        onChange(value);
      }
    }
  }, [value, onChange]);

  const setValueProxy = useCallback((val) => {
    valueRefProxy.current = val;
    setValue(val);
  }, []);

  const getValueImmediately = useCallback(() => {
    return valueRefProxy.current;
  }, []);

  return [value, setValueProxy, getValueImmediately];
};

export default useFormItemValue;
