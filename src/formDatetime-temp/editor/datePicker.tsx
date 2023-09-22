import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
// import zhCN from 'antd/es/locale/zh_CN';

import css from "./datePicker.less";

const moment = window?.moment;
// moment.locale('zh-cn');

const Switch = window?.antd.Switch;
const DatePicker = window?.antd.DatePicker;

const ConfigProvider = window?.antd.ConfigProvider;
// const { RangePicker } = DatePicker;

// const LAST_TEN_YEAR = new Date(
//   new Date().setFullYear(new Date().getFullYear() - 10)
// );
// const AFTER_TEN_YEAR = new Date(
//   new Date().setFullYear(new Date().getFullYear() + 10)
// );


const Delete: FC = ({ editConfig }: any) => {
  const { value, options } = editConfig;

  const [useNow, setUseNow] = useState(value.get() === "now");

  let date = "";
  switch (true) {
    case value.get() === "now":
      date = "";
      break;

    case value.get() === "":
      date = "";
      break;

    default:
      date = moment(value.get());
      break;
  }

  const onChangeDatePicker = (e) => {
    value.set(e.valueOf());
  }

  const onChangeSwitch = useCallback((e) => {
    if (e) {
      setUseNow(true);
      value.set("now");
    } else {
      setUseNow(false);
      value.set("");
    }
  }, []);

  return (
    <div className={'fanzhou-theme'}>
      {useNow ? null : (
        <DatePicker
          value={date}
          showTime
          placeholder="请选择时间"
          size="small"
          onChange={onChangeDatePicker}
        />
      )}

      <div className={css.useNow}>
        <div className={css.label}>使用当前时间</div>
        <div className={css.value}>
          <Switch size="small" checked={useNow} onChange={onChangeSwitch} />
        </div>
      </div>
    </div>
  );
};

export default Delete;
