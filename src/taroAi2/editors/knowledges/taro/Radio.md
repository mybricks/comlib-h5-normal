# Radio - 单选项目。

## 类型
```tsx
ComponentType<RadioProps>
```

## 最佳实践
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { View, Head, Text, Radio, RadioGroup, Label } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [state, setState] = useState({
    list: [
      {
        value: '美国',
        text: '美国',
        checked: false
      },
      {
        value: '中国',
        text: '中国',
        checked: true
      }
    ]
  })

  return (
    <RadioGroup>
      {state.list.map((item, i) => {
        return (
          <Label for={i} key={i}>
            <Radio value={item.value} checked={item.checked}>{item.text}</Radio>
          </Label>
        )
      })}
    </RadioGroup>
  )
}, {
  type: "main"
  title: "组件",
});
```

## RadioProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| value | `string` |  | 否 | `<Radio/>` 标识。当该`<Radio/>` 选中时，`<RadioGroup/>`的 change 事件会携带`<Radio/>`的 value |
| checked | `boolean` | `false` | 否 | 当前是否选中 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| color | `string` | `"#09BB07"` | 否 | Radio 的颜色，同 css 的 color |
| name | `string` |  | 否 | Radio 的名字 |
| nativeProps | `Record<string, unknown>` |  | 否 | 用于透传 `WebComponents` 上的属性到内部 H5 标签上 |
| onChange | `EventFunction<{ value?: string; }>` |  | 否 | <radio-group/> 中的选中项发生变化时触发 change 事件 |