# DatetimePicker 时间选择

### 介绍

日期和时间选择器，支持日期、年月、时间等维度，本质上是一个选择器弹层。

## 代码演示

注意事项：
- 必须使用*dayjs*库来设置和获取日期。
- 必须渲染一个`children`用于点击或者回显日期，这个元素可以是自定义的任意样式的元素，切记需要有内容，如果不可点击就没法触发选择器了。

### 选择年月日

DatetimePicker 通过 type 属性来定义需要选择的时间类型，type 为 `date` 表示选择年月日。通过 min 和 max 属性可以确定可选的时间范围。

要点：
- 必须引入*dayjs*库。
- 不同的`type`类型对应的日期时间格式不一致，`date`类型需要是*YYYY-MM-DD*格式。
- `children`渲染一个自定义UI元素来触发和回显日期。

```tsx
import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { View } from '@tarojs/components';
import { DatetimePicker } from 'brickd-mobile';

function DatePicker() {
  const [minDate] = useState(dayjs('2024-01-01').format('YYYY-MM-DD'))
  const [maxDate] = useState(dayjs('2025-01-01').format('YYYY-MM-DD'))
  const [value] = useState(dayjs().format('YYYY-MM-DD'))

  const onDateChange = useCallback((dateTime) => {
    // 如果type为date的情况下，直接 new Date(dateTime)
    console.log(new Date(dateTime))
    // 如果type为未time的情况下，仅返回HH:mm格式，需要处理下
  }, [])

  return (
    <DatetimePicker
      type="date"
      min={minDate}
      max={maxDate}
      value={defaultValue}
      onChange={onDateChange}
    >
      <View className={css.displayValue}>{value || '请选择日期'}</View>
    </DatetimePicker>
  )
}
```

```less
.displayValue {
  width: 100%;
  color: #323233;
  display: flex;
  align-items: center;
  justify-content: right;
}
```