# CheckboxGroup - 多项选择器，内部由多个checkbox组成。

## 类型
```tsx
ComponentType<CheckboxGroupProps>
```

## CheckboxGroupProps

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| name | `string` | 否 | 表单组件中加上 name 来作为 key |
| onChange | `EventFunction<{ value: string[]; }>` | 否 | `<CheckboxGroup/>` 中选中项发生改变是触发 change 事件 |