# CheckboxGroup - 多项选择器，内部由多个checkbox组成。

## 类型
```tsx
ComponentType<CheckboxGroupProps>
```

## 最佳实践

- 生成一个多选框组件，可以通过 `<CheckboxGroup/>` 的 `onChange` 事件获取选中项的 value 数组
  
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { CheckboxGroup, Checkbox, Label, View } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [state, setState] = useState({
    options: [
      { value: 'A', text: '选项A', checked: false },
      { value: 'B', text: '选项B', checked: false },
      { value: 'C', text: '选项C', checked: false }
    ]
  });

  const handleChange = (e) => {
    let selectedValues = e.detail.value // 获取选中项的 value 数组,必须要这样取值
  
    const updatedOptions = state.options.map((option) => ({
      ...option,
      checked: selectedValues.indexOf(option.value) !== -1
    }));

    setState({ options: updatedOptions });
    outputs['o_selection'](selectedValues); // 直接输出选中项
  };

  return (
    <View>
      <CheckboxGroup onChange={handleChange}>
        {state.options.map((item, index) => (
          <Label for={item.value} key={index}>
            <Checkbox value={item.value} checked={item.checked}>{item.text}</Checkbox>
          </Label>
        ))}
      </CheckboxGroup>
    </View>
  );
}, {
  type: "main"
  title: "组件",
});
```

## CheckboxGroupProps

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| name | `string` | 否 | 表单组件中加上 name 来作为 key |
| onChange | `EventFunction<{ value: string[]; }>` | 否 | `<CheckboxGroup/>` 中选中项发生改变是触发 change 事件 |