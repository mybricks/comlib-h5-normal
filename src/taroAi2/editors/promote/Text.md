# Text - 文本

## 类型
```tsx
ComponentType<TextProps>
```

## TextProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| selectable | `boolean` | `false` | 否 | 文本是否可选 |
| userSelect | `boolean` | `false` | 否 | 文本是否可选，该属性会使文本节点显示为 inline-block |
| space | `keyof TSpace` |  | 否 | 显示连续空格 |
| decode | `boolean` | `false` | 否 | 是否解码 |
| maxLines | `number` |  | 否 | 限制文本最大行数 |

### TSpace

space 的合法值

| 参数 | 说明 |
| --- | --- |
| ensp | 中文字符空格一半大小 |
| emsp | 中文字符空格大小 |
| nbsp | 根据字体设置的空格大小 |

### Overflow

| 参数 | 说明 |
| --- | --- |
| clip | 修剪文本 |
| fade | 淡出 |
| ellipsis | 显示省略号 |
| visible | 文本不截断 |