import React, { useCallback, useMemo, useState } from "react";
import { Cascader } from "brickd-mobile";


export default function ({ env, data, inputs, outputs, slots, mockProps }) {
  const [value, setValue] = useState<string[]>([])
  const [options, setOptions] = useState([]);

  useMemo(() => {
    inputs['addDataSource']?.((val) => {
      if (Array.isArray(val)) {
        setOptions(val)
      }
    })
  }, [])

  const handleChange = useCallback((values, options) => {
    outputs["onChange"]?.(options.filter(t => !!t));
  }, [])
  const handleSelect = useCallback((values, options) => {
    setValue(values)
  }, [])
  
  return (
    <Cascader
      className="mybricks-cascader"
      options={options}
      placeholder={data.placeholder}
      value={value}
      onSelect={handleSelect}
      swipeable={false}
      onChange={handleChange}
      {...(env.edit ? mockProps : {})}
    />
  );
}
