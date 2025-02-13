# Textarea 文本域

## 代码演示

### 基础用法

可以通`limit`来限制可以输入的文字字数，同时会在右下角显示字数。

```tsx
function Textarea() {
  const [value, setValue] = useState("")
  return (
    <Textarea placeholder="请输入文本" value={value} onChange={(e) => setValue(e.detail.value)} limit={50} />
  )
}
```

### 支持原生textarea的属性

比如`rows`属性，配置到`nativeProps`的`rows`属性中即可

```tsx
function Textarea() {
  const [value, setValue] = useState("")
  return (
    <Textarea placeholder="请输入文本" value={value} onChange={(e) => setValue(e.detail.value)} nativeProps={{ rows: 3 }} />
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入的内容 | _string_ | - |
| onChange | 当文本域值变化时触发的事件 | _event_ | - |
| limit | 限制可以输入的文字字数，同时会在右下角显示字数 | _number_ | - |
| readonly | 是否为只读状态，只读状态下不能输入 | _boolean_ | `false` |
| nativeProps | textarea原生属性应该写到这个props中 | any | - |