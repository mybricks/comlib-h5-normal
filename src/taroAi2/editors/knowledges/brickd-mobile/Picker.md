# Picker 选择器

### 介绍

提供多个选项集合供用户选择，支持单列选择和级联选择，是一个选择器弹层。

## 代码演示

注意事项：
- 必须渲染一个`children`用于点击或者回显选项，这个元素可以是自定义的任意样式的元素，切记需要有内容，如果不可点击就没法触发选择器了。

### 普通的单列选项选择

要点：
- 使用`options`属性来配置可以使用的选项数据。
- 回显的时候需要回显数据项的*label*。

```jsx file="runtime.jsx"
import { useState, useCallback } from 'react';
import { View } from '@tarojs/components';
import { Picker } from 'brickd-mobile';

function Picker({ data }) {
  const [value, setValue] = useState(1)

  const options = useMemo(() => {
    return [
      { label: '选项一', value: 1 },
      { label: '选项二', value: 2 }
    ]
  }, [])

  const onChange = useCallback((selectIndex) => {
    // Picker的onChange参数，第一个为选择项的index索引，所以要通过options拿到value
    setValue(options[selectIndex]?.value)
  }, [options])


  return (
    <Picker
      options={options}
      value={value}
      onChange={onChange}
    >
      <View className={css.displayValue}>{options.find(t => t.value === value)?.label || '请选择'}</View>
    </Picker>
  )
}
```

```less
.displayValue {
  width: 100%;
  color: #323233;
  display: flex;
  align-items: center;
  justify-content: right;
}
```