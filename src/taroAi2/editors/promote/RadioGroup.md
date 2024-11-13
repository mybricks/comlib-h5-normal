# RadioGroup - 单项选择器，内部由多个 Radio 组成。

## 类型
```tsx
ComponentType<RadioGroupProps>
```

## RadioGroupProps

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| onChange | `EventFunction<onChangeEventDetail>` | 否 | RadioGroup 中选中项发生改变时触发 change 事件，detail = {value:[选中的radio的value的数组]} |

### onChangeEventDetail

| 参数 | 类型 |
| --- | --- |
| value | `string[]` |