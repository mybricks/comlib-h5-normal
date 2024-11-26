# View - 视图容器。

## 类型
```tsx
ComponentType<ViewProps>
```

## ViewProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| hoverClass | `string` | `none` | 否 | 指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果 |
| hoverStyle | `StyleProp<ViewStyle>` | `none` | 否 | 由于 RN 不支持 hoverClass，故 RN 端的 View 组件实现了 `hoverStyle`属性，写法和 style 类似，只不过 `hoverStyle` 的样式是指定按下去的样式。 |
| hoverStopPropagation | `boolean` | `false` | 否 | 指定是否阻止本节点的祖先节点出现点击态 |
| hoverStartTime | `number` | `50` | 否 | 按住后多久出现点击态，单位毫秒 |
| hoverStayTime | `number` | `400` | 否 | 手指松开后点击态保留时间，单位毫秒 |
| disableScroll | `boolean` | `false` | 否 | 是否阻止区域内滚动页面。<br />说明： 如果 view 中嵌套 view，外层 view 设置 disable-scroll 为 true 时禁止内部的滚动。 |
| hidden | `boolean` | `false` | 否 | 是否隐藏。 |
| animation | `TaroGeneral.IAnyObject` | `{}` | 否 | 用于动画，详见 my.createAnimation 。使用 my.createAnimation 生成的动画是通过过渡（Transition）实现的，只会触发 onTransitionEnd，不会触发 onAnimationStart, onAnimationIteration, onAnimationEnd。 |
| role | `string` |  | 否 | 表示组件的语义角色。设置为 img 时，组件聚焦后读屏软件会朗读出 图像 ；设置为 button 时，聚焦后读屏软件会朗读出 按钮 。详情请参见 aria-component。 |
| ariaRole | `string` |  | 否 | 无障碍访问，（角色）标识元素的作用 |
| ariaLabel | `string` |  | 否 | 无障碍访问，（属性）元素的额外描述 |
| onTap | `CommonEventFunction` |  | 否 | 点击。 |
| onTouchStart | `CommonEventFunction` |  | 否 | 触摸动作开始。 |
| onTouchMove | `CommonEventFunction` |  | 否 | 触摸后移动。 |
| onTouchEnd | `CommonEventFunction` |  | 否 | 触摸动作结束。 |
| onTouchCancel | `CommonEventFunction` |  | 否 | 触摸动作被打断，如来电提醒，弹窗。 |
| onLongTap | `CommonEventFunction` |  | 否 | 长按 500ms 之后触发，触发了长按事件后进行移动将不会触发屏幕的滚动。 |
| onTransitionEnd | `CommonEventFunction` |  | 否 | 过渡（Transition）结束时触发。 |
| onAnimationIteration | `CommonEventFunction` |  | 否 | 每开启一次新的动画过程时触发。（第一次不触发） |
| onAnimationStart | `CommonEventFunction` |  | 否 | 动画开始时触发。 |
| onAnimationEnd | `CommonEventFunction` |  | 否 | 动画结束时触发。 |
| onAppear | `CommonEventFunction` |  | 否 | 当前元素可见面积超过50%时触发。 |
| onDisappear | `CommonEventFunction` |  | 否 | 当前元素不可见面积超过50%时触发。 |
| onFirstAppear | `CommonEventFunction` |  | 否 | 当前元素首次可见面积达到50%时触发。 |
| catchMove | `boolean` |  | 否 | 是否以 catch 的形式绑定 touchmove 事件<br />version: 3.1.0+ |
