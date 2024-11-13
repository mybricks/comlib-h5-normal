# Swiper - 滑块视图容器。其中只可放置 swiper-item 组件，否则会导致未定义的行为。

## 类型
```tsx
ComponentType<SwiperProps>
```

## SwiperProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| indicatorDots | `boolean` | `false` | 否 | 是否显示面板指示点 |
| indicatorColor | `string` | `"rgba(0, 0, 0, .3)"` | 否 | 指示点颜色 |
| indicatorActiveColor | `string` | `"#000000"` | 否 | 当前选中的指示点颜色 |
| autoplay | `boolean` | `false` | 否 | 是否自动切换 |
| current | `number` | `0` | 否 | 当前所在滑块的 index |
| currentItemId | `string` | `""` | 否 | 当前所在滑块的 item-id ，不能与 current 被同时指定 |
| interval | `number` | `5000` | 否 | 自动切换时间间隔 |
| duration | `number` | `500` | 否 | 滑动动画时长 |
| circular | `boolean` | `false` | 否 | 是否采用衔接滑动 |
| vertical | `boolean` | `false` | 否 | 滑动方向是否为纵向 |
| previousMargin | `string` | `"0px"` | 否 | 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值 |
| nextMargin | `string` | `"0px"` | 否 | 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 |
| snapToEdge | `boolean` | `false` | 否 | 当 swiper-item 的个数大于等于 2，关闭 circular 并且开启 previous-margin 或 next-margin 的时候，可以指定这个边距是否应用到第一个、最后一个元素 |
| displayMultipleItems | `number` | `1` | 否 | 同时显示的滑块数量 |
| easingFunction | `keyof TEasingFunction` | `"default"` | 否 | 指定 swiper 切换缓动动画类型 |
| zoom | `boolean` | `false` | 否 | 是否启用缩放 |
| full | `boolean` | `false` | 否 | 是否开启全屏 |
| scrollWithAnimation | `boolean` | `true` | 否 | 改变 current 时使用动画过渡 |
| cacheExtent | `number` | `0` | 否 | 缓存区域大小，值为 1 表示提前渲染上下各一屏区域（swiper 容器大小） |
| onChange | `EventFunction<onChangeEventDetail>` |  | 否 | current 改变时会触发 change 事件 |
| onTransition | `EventFunction<onTransitionEventDetail>` |  | 否 | swiper-item 的位置发生改变时会触发 transition 事件 |
| onAnimationFinish | `EventFunction<onChangeEventDetail>` |  | 否 | 动画结束时会触发 animationfinish 事件 |

### TChangeSource

导致变更的原因

| 参数 | 说明 |
| --- | --- |
| autoplay | 自动播放 |
| touch | 用户划动 |
|  | 其它原因 |

### TEasingFunction

指定 swiper 切换缓动动画类型

| 参数 | 说明 |
| --- | --- |
| default | 默认缓动函数 |
| linear | 线性动画 |
| easeInCubic | 缓入动画 |
| easeOutCubic | 缓出动画 |
| easeInOutCubic | 缓入缓出动画 |

### onChangeEventDetail

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| current | `number` | 是 | 当前所在滑块的索引 |
| source | `keyof TChangeSource` | 是 | 导致变更的原因 |
| currentItemId | `string` | 否 | SwiperItem的itemId参数值 |

### onTransitionEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| dx | `number` | X 坐标 |
| dy | `number` | Y 坐标 |
