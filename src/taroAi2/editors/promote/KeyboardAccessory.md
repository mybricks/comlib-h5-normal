# KeyboardAccessory
场景：设置 Input / Textarea 聚焦时键盘上方 CoverView / CoverImage 工具栏视图。

## 类型
```tsx
ComponentType<StandardProps>
```

## 最佳实践 - 在一个文本输入框下方显示一个自定义的键盘附件，附件包含两个可点击的区域，分别显示绿色和红色背景，并且点击时会触发一个待实现的回调函数。
``` render
import { Textarea, KeyboardAccessory, CoverView } from '@tarojs/components';
import css from 'index.less';

export default () => {
  return (
    <Textarea holdKeyboard>
      <KeyboardAccessory className={css.container} style={{ height: 50, background: "pink" }} >
        <CoverView onClick={() => {}} style={{ flex: 1, background: 'green' }}>1</CoverView>
        <CoverView onClick={() => {}} style={{ flex: 1, background: 'red' }}>2</CoverView>
      </KeyboardAccessory>
    </Textarea>
  )
}
```
