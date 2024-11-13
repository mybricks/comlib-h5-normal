# Canvas - 画布。

## 类型
```tsx
ComponentType<CanvasProps>
```

## 最佳实践
```render
import { Canvas } from '@tarojs/components';

export default () => {
  return (
    <Canvas style='width: 300px; height: 200px;' canvasId='canvas' />
  )
}
```

## CanvasProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| type | `string` |  | 否 | 指定 canvas 类型，支持 2d 和 webgl |
| canvasId | `string` |  | 否 | canvas 组件的唯一标识符，若指定了 type 则无需再指定该属性 |
| disableScroll | `boolean` | `false` | 否 | 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新 |
| id | `string` |  | 否 | 组件唯一标识符。<br />注意：同一页面中的 id 不可重复。 |
| width | `string` |  | 否 |  |
| height | `string` |  | 否 |  |
| nativeProps | `Record<string, unknown>` |  | 否 | 用于透传 `WebComponents` 上的属性到内部 H5 标签上 |
| onTouchStart | `CanvasTouchEventFunction` |  | 否 | 手指触摸动作开始 |
| onTouchMove | `CanvasTouchEventFunction` |  | 否 | 手指触摸后移动 |
| onTouchEnd | `CanvasTouchEventFunction` |  | 否 | 手指触摸动作结束 |
| onTouchCancel | `CanvasTouchEventFunction` |  | 否 | 手指触摸动作被打断，如来电提醒，弹窗 |
| onLongTap | `EventFunction` |  | 否 | 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动 |
| onError | `EventFunction<onErrorEventDetail>` |  | 否 | 当发生错误时触发 error 事件，detail = {errMsg: 'something wrong'} |
| onTap | `EventFunction` |  | 否 | 点击。 |
| onReady | `EventFunction` |  | 否 | canvas 组件初始化成功触发。 |

### onErrorEventDetail

| 参数 | 类型 |
| --- | --- |
| errMsg | `string` |