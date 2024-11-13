# SwiperItem - 仅可放置在 swiper 组件中。

## 类型
```tsx
ComponentType<SwiperItemProps>
```

## SwiperItemProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| itemId | `string` |  | 否 | 该 swiper-item 的标识符 |
| skipHiddenItemLayout | `boolean` | `false` | 否 | 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息 |
| deep | `boolean` | `false` | 否 | Swiper 循环状态下，前后垫片节点拷贝模式，用于修复 Vue 在 CustomElements 下的节点拷贝问题 |