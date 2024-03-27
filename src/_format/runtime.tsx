import { FormatType } from './../utils/data-format'
import { isUndef, isString, isNumber, isDate } from './../utils/core'
import dayjs from 'dayjs';


const transfromData = (value, formatType, config) => {
  let result = value;
  if (formatType === FormatType.NONE) {
    return result
  }

  if (formatType === FormatType.KEYMAP) {
    return config?.[result] ?? result
  }

  if (formatType === FormatType.TIME_TEMPLATE || formatType === FormatType.TIME_CUSTOM) {
    return dayjs(value).format(config)
  }

  return result
}

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["call"]((inputValue) => {
    if (env.runtime) {
      let resValue = inputValue;

      const { formatterName, values } = data.formatData ?? {};

      if (isUndef(inputValue) && data?.formatData?.voidHandle) {
        resValue = data?.formatData?.voidTo;
        outputs["success"](resValue);
        return
      }

      if (!isString(inputValue) && !isNumber(inputValue) && !isDate(inputValue)) {
        outputs["success"](resValue);
        return
      }

      resValue = transfromData(inputValue, formatterName, values?.[formatterName]);
      outputs["success"](resValue);
      return
    }
  });
}
