# PickerView - 嵌入页面的选择器。
场景：其中只可放置 picker-view-column 组件，其它节点不会显示。

## 类型
```tsx
ComponentType<PickerViewProps>
```

## 最佳实践
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { View, PickerView, PickerViewColumn } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [state, setState] = useState({
    "years": [
      2023,
      2024
    ],
    "year": 2024,
    "months": [
      11,
      12
    ],
    "month": 2,
    "days": [
      1,
      2,
    ],
    "day": 2,
    "value": [
      9999,
      1,
      1
    ]
  });
  const onChange = (e) => {
    setState((state) => {
      const val = e.detail.value
      return {
        ...state,
        year: state.years[val[0]],
        month: state.months[val[1]],
        day: state.days[val[2]],
        value: val
      }
    })
  }
  
  return (
    <View>
      <View>{state.year}年{state.month}月{state.day}日</View>
      <PickerView indicatorStyle='height: 50px;' style='width: 100%; height: 300px;' value={state.value} onChange={onChange}>
        <PickerViewColumn>
          {state.years.map(item => {
            return (
              <View>{item}年</View>
            );
          })}
        </PickerViewColumn>
        <PickerViewColumn>
          {state.months.map(item => {
            return (
              <View>{item}月</View>
            )
          })}
        </PickerViewColumn>
        <PickerViewColumn>
          {state.days.map(item => {
            return (
              <View>{item}日</View>
            )
          })}
        </PickerViewColumn>
      </PickerView>
    </View>
  )
}, {
  type: "main"
  title: "组件",
});
```

## PickerViewProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| value | `number[]` |  | 否 | 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。 |
| defaultValue | `number[]` |  | 否 | 始取值 |
| indicatorStyle | `string` |  | 否 | 选中框样式 |
| indicatorClass | `string` |  | 否 | 选中框类名 |
| maskStyle | `string` |  | 否 | 蒙层样式 |
| maskClass | `string` |  | 否 | 蒙层类名 |
| immediateChange | `boolean` | `false` | 否 | 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件。 |
| onChange | `EventFunction<{value:number[]}>` |  | 否 | 当滚动选择，value变更触发 |
| onPickStart | `EventFunction` |  | 否 | 滚动选择开始时触发 |
| onPickEnd | `EventFunction` |  | 否 | 滚动选择结束时触发 |