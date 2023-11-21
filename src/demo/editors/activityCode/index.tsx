import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import css from "./index.less";

let Select = window.antd.Select;

export default function (props) {
  const [value, setValue] = useState(props.value.get()); //活动玩法code
  const [options, setOptions] = useState([]); //活动玩法列表

  /**
   * 请求接口获取活动玩法列表
   */
  useEffect(() => {
    setTimeout(() => {
      setOptions([
        {
          label: "11月15日大转盘",
          value: "code1115",
        },
        {
          label: "11月16日大转盘",
          value: "code1116",
        },
        {
          label: "11月17日大转盘",
          value: "code1117",
        },
      ]);
    }, 1000);
  }, []);

  const onChange = useCallback((value) => {
    setValue(value);
    props.value.set(value);
  }, []);

  return (
    <Select value={value} className={css.select} onChange={onChange}>
      {options.map((item) => {
        return (
          <Select.Option value={item.value} key={item.value}>
            {item.label}
          </Select.Option>
        );
      })}
    </Select>
  );
}
