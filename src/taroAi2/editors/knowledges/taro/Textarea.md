# Textarea - 多行输入框。该组件是原生组件，使用时请注意相关限制。
- 注意：Textarea并没有onChange事件。因此当从其他组件修改为Textarea时，应注意要把onChange改为onInput

## 类型
```tsx
ComponentType<TextareaProps>
```

## 最佳实践
必须生成样式文件来覆盖默认的固定宽度。
```less file="style.less"
.textarea {
  width: 100%;
  height: 100%;
  min-height: 48px;
}
```

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useCallback, useState } from 'react';
import { Textarea } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [value, setValue] = useState('');

  const handleInput = (e)=> {
      setValue(e.detail.value)
  }
  return (
    <Textarea
      className={css.textarea}
      onInput={handleInput} // 注意！！ 必须要用onInput，不能用onChange
      value={value}
    />
  )
}, {
  type: "main"
  title: "组件",
});
```

## TextareaProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| value | `string` |  | 否 | 输入框的内容 |
| defaultValue | `string` |  | 否 | 设置 React 非受控输入框的初始内容 |
| placeholder | `string` |  | 否 | 输入框为空时占位符 |
| placeholderStyle | `string` |  | 否 | 指定 placeholder 的样式 |
| placeholderClass | `string` | `"textarea-placeholder"` | 否 | 指定 placeholder 的样式类 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| maxlength | `number` | `140` | 否 | 最大输入长度，设置为 -1 的时候不限制最大长度 |
| autoFocus | `boolean` | `false` | 否 | 自动聚焦，拉起键盘 |
| focus | `boolean` | `false` | 否 | 获取焦点 |
| autoHeight | `boolean` | `false` | 否 | 是否自动增高、禁止滚动，设置 autoHeight 时，style.height不生效 |
| fixed | `boolean` | `false` | 否 | 如果 Textarea 是在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true |
| cursorSpacing | `number` | `0` | 否 | 指定光标与键盘的距离，单位 px 。取 Textarea 距离底部的距离和 cursorSpacing 指定的距离的最小值作为光标与键盘的距离 |
| cursor | `number` | `-1` | 否 | 指定 focus 时的光标位置 |
| showConfirmBar | `boolean` | `true` | 否 | 是否显示键盘上方带有”完成“按钮那一栏 |
| selectionStart | `number` | `-1` | 否 | 光标起始位置，自动聚集时有效，需与 selectionEnd 搭配使用 |
| selectionEnd | `number` | `-1` | 否 | 光标结束位置，自动聚集时有效，需与 selectionStart 搭配使用 |
| adjustPosition | `boolean` | `true` | 否 | 键盘弹起时，是否自动上推页面 |
| holdKeyboard | `boolean` | `false` | 否 | focus 时，点击页面的时候不收起键盘 |
| disableDefaultPadding | `boolean` | `false` | 否 | 是否去掉 iOS 下的默认内边距 |
| nativeProps | `Record<string, unknown>` |  | 否 | 用于透传 `WebComponents` 上的属性到内部 H5 标签上 |
| confirmType | "send" or "search" or "next" or "go" or "done" or "return" |  | 否 | 设置键盘右下角按钮的文字 |
| confirmHold | `boolean` |  | 否 | 点击键盘右下角按钮时是否保持键盘不收起 |
| adjustKeyboardTo | `boolean` | `false` | 否 | 键盘对齐位置 |
| onFocus | `EventFunction<onFocusEventDetail>` |  | 否 | 输入框聚焦时触发 |
| onBlur | `EventFunction<onBlurEventDetail>` |  | 否 | 输入框失去焦点时触发 |
| onLineChange | `EventFunction<{height:number;heightRpx:number;lineCount:number;}>` |  | 否 | 输入框行数变化时调用 |
| onInput | `EventFunction<onInputEventDetail>` |  | 否 | 当键盘输入时，触发 input 事件<br /><br />**onInput 处理函数的返回值并不会反映到 textarea 上** |
| onConfirm | `EventFunction<onConfirmEventDetail>` |  | 否 | 点击完成时， 触发 confirm 事件 |
| onKeyboardHeightChange | `EventFunction<onKeyboardHeightChangeEventDetail>` |  | 否 | 键盘高度发生变化的时候触发此事件 |

### onFocusEventDetail

| 参数   | 类型     | 说明     |
| ------ | -------- | -------- |
| value  | `string` | 输入值   |
| height | `number` | 键盘高度 |

### onBlurEventDetail

| 参数   | 类型     | 说明     |
| ------ | -------- | -------- |
| value  | `string` | 输入值   |
| cursor | `number` | 光标位置 |

### onInputEventDetail

| 参数    | 类型     | 说明     |
| ------- | -------- | -------- |
| value   | `string` | 输入值   |
| cursor  | `number` | 光标位置 |
| keyCode | `number` | 键值     |

### onConfirmEventDetail

| 参数  | 类型     | 说明   |
| ----- | -------- | ------ |
| value | `string` | 输入值 |

### onKeyboardHeightChangeEventDetail

| 参数     | 类型     | 说明     |
| -------- | -------- | -------- |
| height   | `number` | 键盘高度 |
| duration | `number` | 持续时间 |