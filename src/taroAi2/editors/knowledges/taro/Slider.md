# Slider - 滑动选择器。

## 类型
```tsx
ComponentType<SliderProps>
```

## 最佳实践
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useCallback } from 'react';
import { Slider } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [value, setValue] = useState(50);
  return (
    <Slider
      step={1}
      value={value}
      showValue
      min={0}
      max={100}
      onChange={(e) => {
        setValue(e.detail.value))
      }}
    />
  )
}, {
  type: "main"
  title: "组件",
});
```

## SliderProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| min | `number` | `0` | 否 | 最小值 |
| max | `number` | `100` | 否 | 最大值 |
| step | `number` | `1` | 否 | 步长，取值必须大于 0，并且可被(max - min)整除 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| value | `number` | `0` | 否 | 当前取值 |
| defaultValue | `string` |  | 否 | 设置 React 非受控状态下的初始取值 |
| activeColor | `string` | `"#1aad19"` | 否 | 已选择的颜色 |
| backgroundColor | `string` | `"#e9e9e9"` | 否 | 背景条的颜色 |
| blockSize | `number` | `28` | 否 | 滑块的大小，取值范围为 12 - 28 |
| blockColor | `string` | `"#ffffff"` | 否 | 滑块的颜色 |
| showValue | `boolean` | `false` | 否 | 是否显示当前 value |
| onChange | `EventFunction` |  | 否 | 完成一次拖动后触发的事件 |
| onChanging | `EventFunction` |  | 否 | 拖动过程中触发的事件 |