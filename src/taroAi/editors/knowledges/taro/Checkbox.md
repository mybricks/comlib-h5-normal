# Checkbox - 多选项目。

## 类型
```tsx
ComponentType<CheckboxProps>
```

## 最佳实践
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { Checkbox } from '@tarojs/components';

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
    <View>
      {state.list.map((item, i) => {
        return (
          <Label for={i} key={i}>
            <Checkbox value={item.value} checked={item.checked}>{item.text}</Checkbox>
          </Label>
        )
      })}
    </View>
  )
}, {
  type: "main"
  title: "组件",
});
```


## CheckboxProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| value | `string` |  | 是 | `<Checkbox/>`标识，选中时触发`<CheckboxGroup/>`的 change 事件，并携带 `<Checkbox/>` 的 value |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| checked | `boolean` | `false` | 否 | 当前是否选中，可用来设置默认选中 |
| color | `string` |  | 否 | checkbox的颜色，同 css 的 color |
| name | `string` |  | 否 | Checkbox 的名字 |
| nativeProps | `Record<string, unknown>` |  | 否 | 用于透传 `WebComponents` 上的属性到内部 H5 标签上 |
| onChange | `EventFunction<{ value: string[]; }>` |  | 否 | 选中项发生变化时触发 change 事件，小程序无此 API |