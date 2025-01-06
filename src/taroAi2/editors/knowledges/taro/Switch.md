# Switch - 开关选择器。

## 类型
```tsx
ComponentType<SwitchProps>
```

## 最佳实践
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useCallback } from 'react';
import { Switch } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  return (
    <Switch
      checked
      onChange={e => console.log(e.detail.value)}
    />
  )
}, {
  type: "main"
  title: "组件",
});
```

## SwitchProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| checked | `boolean` | `false` | 否 | 是否选中 |
| defaultChecked | `boolean` |  | 否 | 设置在 React 非受控状态下，当前是否选中 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| type | "switch" or "checkbox" | `"switch"` | 否 | 样式，有效值：switch, checkbox |
| color | `string` | `"#04BE02"` | 否 | switch 的颜色，同 css 的 color |
| nativeProps | `Record<string, unknown>` |  | 否 | 用于透传 `WebComponents` 上的属性到内部 H5 标签上 |
| onChange | `EventFunction<{value: boolean}>` |  | 否 | checked 改变时触发 change 事件 |
