# Picker - 从底部弹起的选择器,包含普通、多列、时间、日期、省市区选择器。

## 类型
```tsx
ComponentType<PickerSelectorProps | PickerMultiSelectorProps | PickerTimeProps | PickerDateProps | PickerRegionProps>
```

## 最佳实践
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { View, Text, Picker } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [state, setState] = useState({
    selector: ['美国', '中国', '巴西', '日本'],
    selectorChecked: '美国',
    timeSel: '12:01',
    dateSel: '2018-04-22'
  });
  const onChange = (e) => {
    setState((state) => {
      return {
        ...state,
        selectorChecked: state.selector[e.detail.value]
      }
    })
  }
  const onTimeChange = (e) => {
    setState((state) => {
      return {
        ...state,
        timeSel: e.detail.value
      }
    })
  }
  const onDateChange = (e) => {
    setState((state) => {
      return {
        ...state,
        dateSel: e.detail.value
      }
    })
  }
  
  return (
    <View>
      <View>
        <View>
          <Text>地区选择器</Text>
          <View>
            <Picker mode='selector' range={state.selector} onChange={onChange}>
              <View>
                当前选择：{state.selectorChecked}
              </View>
            </Picker>
          </View>
        </View>
        <View>
          <Text>时间选择器</Text>
          <View>
            <Picker mode='time' onChange={onTimeChange}>
              <View>
                当前选择：{state.timeSel}
              </View>
            </Picker>
          </View>
        </View>
        <View>
          <Text>日期选择器</Text>
          <View>
            <Picker mode='date' onChange={onDateChange}>
              <View>
                当前选择：{state.dateSel}
              </View>
            </Picker>
          </View>
        </View>
      </View>
    </View>
  )
}, {
  type: "main"
  title: "组件",
});
```

## PickerStandardProps

选择器通用参数

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| headerText | `string` |  | 否 | 标题 |
| mode | `'selector' \| 'multiSelector' \| 'time' \| 'date' \| 'region'` | `"selector"` | 否 | 类型 |
| disabled | `boolean` | `false` | 否 | 禁用 |
| onCancel | `EventFunction` |  | 否 | 取消选择或点遮罩层收起时触发 |
| textProps | `{okText:string,cancelText:string}` |  | 否 | 替换组件内部文本 |

## PickerSelectorProps

普通选择器：mode = selector

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| mode | `"selector"` |  | 否 | 类型 |
| range | string[] or number[] or Record<string, any>[] | `[]` | 是 | mode为 selector 或 multiSelector 时，range 有效 |
| rangeKey | `string` |  | 否 | 当 range 是一个 Object Array 时，通过 rangeKey 来指定 Object 中 key 的值作为选择器显示内容 |
| value | `number` | `0` | 否 | 表示选择了 range 中的第几个（下标从 0 开始） |
| defaultValue | `number` |  | 否 | 设置 React 非受控状态下的初始取值 |
| onChange | `EventFunction<{value:string\|numver}>` |  | 否 | value变更触发 |
| textProps | `{okText:string,cancelText:string}` |  | 否 | 用于替换组件内部文本 |

## PickerMultiSelectorProps

多列选择器：mode = multiSelector

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| mode | `"multiSelector"` |  | 是 | 类型 |
| range | string[][] or number[][] or Record<string, any>[][] | `[]` | 是 | mode为 selector 或 multiSelector 时，range 有效 |
| rangeKey | `string` |  | 否 | 当 range 是一个 Object Array 时，通过 rangeKey 来指定 Object 中 key 的值作为选择器显示内容 |
| value | string[] or number[] or Record<string, any>[] | `[]` | 是 | 表示选择了 range 中的第几个（下标从 0 开始） |
| onChange | `EventFunction<{value:number[]}>` |  | 是 | value变更触发 |
| onColumnChange | `EventFunction<{column:number,value:number}>` |  | 否 | 列改变时触发 |

## PickerTimeProps

时间选择器：mode = time

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| mode | `"time"` | 是 | 类型 |
| value | `string` | 否 | 表示选择了 range 中的第几个（下标从 0 开始） |
| defaultValue | `string` | 否 | 设置 React 非受控状态下的初始取值 |
| start | `string` | 否 | 仅当 mode 为 "time" 或 "date" 时有效，表示有效时间范围的开始，字符串格式为"hh:mm" |
| end | `string` | 否 | 仅当 mode 为 "time" 或 "date" 时有效，表示有效时间范围的结束，字符串格式为"hh:mm" |
| onChange | `EventFunction<{value:string}>` | 是 | value变更触发 |

## PickerDateProps

日期选择器：mode = date

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| mode | `"date"` |  | 是 | 类型 |
| value | `string` | `0` | 是 | 表示选中的日期，格式为"YYYY-MM-DD" |
| defaultValue | `string` |  | 否 | 初始值 |
| start | `string` |  | 否 | 仅当 mode 为 "time" 或 "date" 时有效，表示有效时间范围的开始，字符串格式为"YYYY-MM-DD" |
| end | `string` |  | 否 | 仅当 mode 为 "time" 或 "date" 时有效，表示有效时间范围的结束，字符串格式为"YYYY-MM-DD" |
| fields | `'year' \| 'month' \| 'day'` | `"day"` | 否 | 选择器的粒度 |
| onChange | `EventFunction<{value:string}>` |  | 是 | value变更触发 |

## PickerRegionProps

省市区选择器：mode = region

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| mode | `"region"` |  | 是 | 类型 |
| value | `string[]` | `[]` | 否 | 选中的省市区，默认选中每一列的第一个值 |
| defaultValue | `string[]` |  | 否 | 始取值 |
| customItem | `string` |  | 否 | 每一列的顶部添加一个自定义项 |
| level | `'province' \| 'city' \| 'region' \| 'sub-district'` | `"region"` | 否 | 选择器层级 |
| onChange | `EventFunction<{value:string[],code:string[],postcode:string}>` |  | 是 | value变更触发 |