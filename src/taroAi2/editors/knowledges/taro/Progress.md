# Progress - 进度条。

## 类型
```tsx
ComponentType<ProgressProps>
```

## 最佳实践
- 开发一个进度条，进度条颜色是红色的

```render
import { comRef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { Progress } from '@tarojs/components';

export default comRef(({ data, inputs, outputs, slots }) => {
  return (
    <Progress percent={80}  strokeWidth={2} active activeColor='#FF000F' />
  )
}, {
  type: 'main',
  title: '示例组件'
});
```

## ProgressProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| percent | `number` |  | 否 | 百分比 0~100 |
| showInfo | `boolean` | `false` | 否 | 在进度条右侧显示百分比 |
| borderRadius | string or number | `0` | 否 | 圆角大小 |
| fontSize | string or number | `16` | 否 | 右侧百分比字体大小 |
| strokeWidth | string or number | `6` | 否 | 进度条线的宽度 |
| activeColor | `string` | `"#09BB07"` | 否 | 已选择的进度条的颜色 |
| backgroundColor | `string` | `"#EBEBEB"` | 否 | 未选择的进度条的颜色 |
| active | `boolean` | `false` | 否 | 进度条从左往右的动画 |
| activeMode | "backwards" or "forwards" | `backwards` | 否 | backwards: 动画从头播<br /><br />forwards: 动画从上次结束点接着播 |
| duration | `number` | `30` | 否 | 进度增加 1% 所需毫秒数 |
| onActiveEnd | `EventFunction` |  | 否 | 动画完成事件 |
