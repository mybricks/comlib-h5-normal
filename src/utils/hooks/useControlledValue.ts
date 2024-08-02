import { useState, useEffect } from "react";

const useControlledValue = (initialValue, onChange) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (newValue) => {
    if (newValue !== value) {
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return [value, handleChange];
};

export default useControlledValue;
