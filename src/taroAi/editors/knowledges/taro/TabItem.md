# TabItem - 标签栏子项。

## 类型
```tsx
ComponentType<TabItemProps>
```

## TabItemProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| label | `string` | `无` | 否 | tab-item 内显示的文字 |
| name | `string` | `无` | 否 | tab-item 对应的 name 值 |
| badgeType | `string` | `无` | 否 | 徽标类型 badge-type 分为圆点“dot”和文本“text”，不设置 badge-type 则不显示徽标 |
| badgeText | `string` | `无` | 否 | badge-type 为 text 的时候，徽标内的数字，为空时badge-type="text"不生效 |