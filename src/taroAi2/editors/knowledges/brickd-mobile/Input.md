# Input 输入框

注意：`Input`组件默认为无样式的输入框，如需边框以及背景等样式请通过`className`配置样式。

## 代码演示

### 基础用法

可以通过 `value` 设置输入框的值，通过 `placeholder` 设置占位提示文字，通过 `onChange` 事件获得改变的值。

```tsx
function BasicField() {
  const [value, setValue] = useState("")
  return (
    <Input placeholder="请输入文本" value={value} onChange={(e) => setValue(e.detail.value)} />
  )
}
```

根据 `type` 属性定义不同类型的输入框，默认值为 `text`。

```tsx
function CustomField() {
  const [text, setText] = useState("")
  const [idcard, setIdcard] = useState("")
  const [number, setNumber] = useState("")
  const [digit, setDigit] = useState("")
  const [password, setPassword] = useState("")
  return (
    <>
      <Input placeholder="请输入文本" value={text} onChange={(e) => setText(e.detail.value)} />
      <Input
        type="idcard"
        placeholder="请输入手机号"
        value={idcard}
        onChange={(e) => setIdcard(e.detail.value)}
      />
      <Input
        type="number"
        placeholder="请输入整数"
        value={number}
        onChange={(e) => setNumber(e.detail.value)}
      />
      <Input
        type="digit"
        placeholder="请输入数字（支持小数）"
        value={digit}
        onChange={(e) => setDigit(e.detail.value)}
      />
      <Input
        password
        placeholder="请输入密码"
        value={password}
        onChange={(e) => setPassword(e.detail.value)}
      />
    </>
  )
}
```

### 给输入框添加样式
默认的输入框是没有背景色边框等样式的输入框，可以参考下方代码，去提供样式

要点：
- `height`一定要配置，且设置为`auto`，除非特殊要求。

#### 无背景，带边框的输入框
```less
.input {
  border-radius: 4px;
  padding: 6px 8px;
  height: auto;
  border: 1px solid #eee;
}
```

```tsx
<Input className={css.input} placeholder="请输入文本" />
```

#### 灰色背景，无边框的输入框
```less
.input {
  background: #f7f8fa;
  border-radius: 4px;
  padding: 8px 12px;
  height: auto;
}
```

```tsx
<Input className={css.input} placeholder="请输入文本" />
```

### 禁用输入框

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```tsx
<Input placeholder="输入框只读" readonly />
<Input placeholder="输入框已禁用" disabled />
```

### 输入框内容对齐

通过 Input 组件的 `align` 属性可以设置输入框内容的对齐方式，可选值为 `center`、`right`。

```tsx
<Input align="left" placeholder="输入框内容左对齐" />
<Input align="center" placeholder="输入框内容居中对齐" />
<Input align="right" placeholder="输入框内容右对齐" />
```