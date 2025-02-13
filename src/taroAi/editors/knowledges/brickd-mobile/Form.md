# Form 表单

## 常见思路

<提问意图>
比如以下情况：
- 包含「勾选协议」、「操作按钮」等非常规表单项内容
</提问意图>

<编程注意项>
检查是否应该由`Form.Item`来包裹这些内容，如果使用了`Form.Item`则必须搭配`Form.Control`使用。
</编程注意项>

## 代码示例

### 基础用法
在表单中，每个 `Form.Item` 代表一个表单项， `Form`组件可以收集、校验所有表单项的值。

要点：
- 使用`Form`时，必须要使用`Form.Item`、和`Form.Control`三个组件来包裹元素，保证`Form`组件收集数据和校验等能力生效。
- `Form.Label`为需要在`Form.Item`内部的组件，在不需要标签文本的时候可以不使用。
- `Form.Control`必须使用，否则无法正确展示内容表单项。
- 使用`ref`获取表单实例，并且通过`validate`方法获取校验后的数据。
- `Form`本身对外部有`padding`内边距的属性，如果不是必要，请勿对`Form`配置内边距和布局等样式。
- `Form.Item`也有10px的`padding`内边距，所以包裹的组件请注意是否需要配置`padding`，也不要为了表单项之间的间距轻易配置`margin`。

```jsx file="runtime.jsx"
import { useRef } from 'react';
import { Form, Input } from 'brickd-mobile';
import { View } from '@tarojs/components'

export default ({ data }) => {
  const onSubmit = () => {
    // 表单校验通过时，获取表单数据
    formRef?.currunt?.validate().then(result => {
      // result 为表单 getValues 的数据，仅校验全部通过时获取
    }).catch(errors => {
      // errors 为错误数组，形如 [{ name: 'username', errors: ['请填写用户名'] }]，仅在校验不通过时执行
    })
  }

  const formRef = useRef(null);

  return (
    <Form
      className={css.form}
      ref={formRef}
    >
      <Form.Item requiredMark name="username" rules={[{ required: true, message: "请填写用户名" }]}>
        <Form.Label>用户名</Form.Label>
        <Form.Control>
          <Input placeholder="用户名" />
        </Form.Control>
      </Form.Item>
      <Form.Item requiredMark name="password" rules={[{ required: true, message: "请填写密码" }]}>
        <Form.Label>密码</Form.Label>
        <Form.Control>
          <Input password placeholder="密码" />
        </Form.Control>
      </Form.Item>
      <View className={css.btn} style={{ margin: "16px" }} onClick={onSubmit}>
        提交按钮
      </View>
    </Form>
  )
}
```

```less file="style.less"
.form {
  width: 100%; // 默认配置宽度100%
}
```

### 表单项的基础使用

基础使用如下
- `Form.Item`的`requiredMark`属性，内置了表单项的必填样式，内置了标签左侧的小红点样式，可以展示/隐藏。
- `Form.Item`内置了*padding=10*样式，小于10px的间距会导致`requiredMark`的显示出错。
- `Form.Item`内置的间距已经提供了上下表单项的间距，如果需要增加或者减小间距，可以通过调整*padding*来解决问题。

```jsx file="runtime.jsx"
import { useRef } from 'react';
import { Form, Input } from 'brickd-mobile';
import { View } from '@tarojs/components'

export default ({ data }) => {
  return (
    <Form>
      <Form.Item className={css.formItem} requiredMark name="username">
        <Form.Label>用户名</Form.Label>
        <Form.Control>
          <Input placeholder="用户名" />
        </Form.Control>
      </Form.Item>
      <View className={css.btn} style={{ margin: "16px" }} onClick={onSubmit}>
        提交按钮
      </View>
    </Form>
  )
}
```

```less file="style.less"
.formItem {
  border-bottom: 1px solid #eee; // 示例代码，给每个formItem添加一个下边框，用于分隔表单项
  padding: 10px 12px; // 注意如果要配置padding，左右的10px不要随意调整
}
```


### 校验规则

通过 `rules` 定义表单校验规则，所有可用字段见[下方表格](#rule-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)。

```jsx file="runtime.jsx"
import { useRef } from 'react';
import { Form, Input } from 'brickd-mobile';
import { View } from '@tarojs/components'

export default ({ data }) => {
  const formRef = useRef(null);

  const onSubmit = () => {
    // 表单校验通过时，获取表单数据
    formRef?.currunt?.validate().then(result => {
      // result 为表单 getValues 的数据，仅校验全部通过时获取
    }).catch(errors => {
      // errors 为错误数组，形如 [{ name: 'username', errors: ['请填写用户名'] }]，仅在校验不通过时执行
    })
  }

  return (
    <Form defaultValues={{ validatorMessage: "abc" }} ref={formRef}>
      <Toast id="toast" />
      <Form.Item name="pattern" rules={[{ pattern: /\d{6}/, message: "请输入正确内容" }]}>
        <Form.Label>文本</Form.Label>
        <Form.Control>
          <Input placeholder="正则校验" />
        </Form.Control>
      </Form.Item>
      <Form.Item name="pattern" rules={[{ validator: (val) => /1\d{10}/.test(val), message: "请输入正确内容" }]}>
        <Form.Label>文本</Form.Label>
        <Form.Control>
          <Input placeholder="函数校验" />
        </Form.Control>
      </Form.Item>
      <View className={css.btn} style={{ margin: "16px" }} onClick={onSubmit}>
        提交按钮
      </View>
    </Form>
  )
}
```

### 布局使用
`Form`组件默认的*layout*配置为`horizontal`，所以默认情况下表单项的标题和输入区域是水平分布的。

要点：
- 配置`Form`组件的*layout*属性，可以支持将全局表单项的标题和输入区域设置为垂直/水平分布；
- 配置`Form.Item`组件的*layout*属性，可以支持将此表单项的标题和输入区域设置为垂直/水平分布；

```jsx file="runtime.jsx" 
<Form layout="horizontal">
  <Form.Item name="xxx">
    <Form.Label>我是水平布局的表单项，继承全局配置</Form.Label>
    <Form.Control>
      <Input />
    </Form.Control>
  </Form.Item>
  <Form.Item name="xxx" layout="vertical">
    <Form.Label>我是垂直布局的表单项，表单单独配置</Form.Label>
    <Form.Control>
      <Input />
    </Form.Control>
  </Form.Item>
</Form>
```

### 禁用表单
设置 `disabled` 后，会为 `Form` 内部的 `taroify` 组件 `Input`, `Textarea`, `Checkbox`, `Switch`, `Checkbox.Group`, `Radio.Group`, `Rate`, `Slider`, `Stepper`, `Uploader` 设置 `disabled` <br>

form设置disabled后，也可以单独为表单项和组件设置disabled={false}, 优先级：表单 < 表单项 < 组件

### 表单项使用-添加必填样式
表单支持展示表单项的必填样式，`Form.Item`的`requiredMark`属性，内置了标签左侧的小红点样式。

```jsx file="runtime.jsx"
import { useRef } from 'react';
import { Form, Input } from 'brickd-mobile';
import { View } from '@tarojs/components'

export default ({ data }) => {
  return (
    <Form>
      <Form.Item
        name ="username"
        requiredMark // 展示当前标签项的必填样式
      >
        <Form.Label>用户名</Form.Label>
        <Form.Control>
          <Input placeholder="用户名" />
        </Form.Control>
      </Form.Item>
    </Form>
  )
}
```

### 表单项类型 - 开关

在表单中使用 [Switch 组件](/components/switch)。

```jsx file="runtime.jsx"    
<Form.Item name="switch">
  <Form.Label>开关</Form.Label>
  <Form.Control>
    <Switch size={20} />
  </Form.Control>
</Form.Item>   
```

### 表单项类型 - 复选框

在表单中使用 [Checkbox 组件](/components/checkbox)。

```jsx file="runtime.jsx"    
<Form.Item name="checkbox">
  <Form.Label>复选框</Form.Label>
  <Form.Control>
    <Checkbox shape="square" />
  </Form.Control>
</Form.Item>
<Form.Item name="checkboxGroup">
  <Form.Label>复选框组</Form.Label>
  <Form.Control>
    <Checkbox.Group direction="horizontal">
      <Checkbox name="1" shape="square">
        复选框 1
      </Checkbox>
      <Checkbox name="2" shape="square">
        复选框 2
      </Checkbox>
    </Checkbox.Group>
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 单选框

在表单中使用 [Radio 组件](/components/radio)。

```jsx file="runtime.jsx"
<Form.Item name="radio">
  <Form.Label>单选框</Form.Label>
  <Form.Control>
    <Radio.Group direction="horizontal">
      <Radio name="1">单选框 1</Radio>
      <Radio name="2">单选框 2</Radio>
    </Radio.Group>
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 日期时间选择器

在表单中使用 [DatetimePicker 组件](/components/datetimepicker)。

要点：
- 必须在`Form.Control`组件中用render Props来渲染`Picker`组件，同时必须从中解构出*value*和*onChange*参数，并使用此参数给到`Picker`组件，否则*value*无法正确回显到里面的元素中。

```jsx file="runtime.jsx"
<Form.Item name="datetimepicker">
  <Form.Label>时间选择器</Form.Label>
  <Form.Control>
    {
      ({ value, onChange }) => {
        return (
          <DatetimePicker
            type="date"
            value={value}
            onChange={onChange}
          >
            <View className={css.displayValue}>{value || '请选择日期'}</View>
          </Picker>
        )
      }
    }
  </Form.Control>
</Form.Item>
```

### 表单项类型 - 单列选择器

在表单中使用 [Picker 组件](/components/picker)。

要点：
- 必须在`Form.Control`组件中用render Props来渲染`Picker`组件，同时必须从中解构出*value*和*onChange*参数，并使用此参数给到`Picker`组件，否则*value*无法正确回显到里面的元素中。
- 回显的时候需要获取到当前*value*的标签。

```jsx file="runtime.jsx"
const options = [
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 }
]

<Form.Item name="picker">
  <Form.Label>单列选择器</Form.Label>
  <Form.Control>
    {
      ({ value, onChange }) => {
        return (
          <Picker
            options={options}
            value={value} // 使用render Props中解构的value，将值被Form组件代理
            onChange={(selectIndex) => { // 使用render Props中解构的onChange，将值被Form组件代理
              onChange?.(options[selectIndex]?.value)
            }} 
          >
            <View className={css.displayValue}>{options.find(t => t.value === value)?.label || '请选择'}</View>
          </Picker>
        )
      }
    }
  </Form.Control>
</Form.Item>
```

```less file="style.less"
.displayValue {
  width: 100%;
  color: #323233;
  display: flex;
  align-items: center;
  justify-content: right;
}
```

## API

### Form Props

| 参数              | 说明                                       | 类型         | 默认值      |
|-----------------|------------------------------------------|------------|----------|
| defaultValues   | 表单默认值       |  _object_  |    |
| validateTrigger | 表单校验触发时机，可选值为 `onChange`、`onSubmit`，详见下表 | _string_   | `onBlur` |
| colon           | 是否在 label 后面添加冒号                         | _boolean_  | `false`  |
| disabled        | 是否禁用表单             | _boolean_ | `false` |
| layout          | 所有表单项的布局设置，调整表单项标题和输入区的布局，可选值为 `horizontal`、`vertical`   | _string_ | `horizontal` |

### Form Methods

通过 ref 可以获取到 Form 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| setValues | 设置表单值(浅合并)                                   | _object_                    | - |
| getValues | 获得表单值，支持传入 `name` 来获得单个或部分表单项 | _name?: string \| string[]_ | _object_ |
| setErrors | 设置表单验证错误信息(浅合并) | _FormValidError[]_ | _void_ |
| getErrors | 获得表单验证错误信息，支持传入 `name` 来获得单个或部分表单项 | _name?: string \| string[]_ | _FormValidError[]_ |
| validate  | 验证表单，支持传入 `name` 来验证单个或部分表单项   | _name?: string \| string[]_ | _Promise_ |
| submit | 提交表单，与点击提交按钮的效果等价 | - | - |
| reset     | 重置表单                                     | -                           | _void_ |

### validateTrigger 可选值

通过 `validateTrigger` 属性可以自定义表单校验的触发时机。

| 值       | 描述                                 |
| -------- | ------------------------------------ |
| onSubmit | 仅在提交表单时触发校验               |
| onBlur   | 在提交表单和输入框失焦时触发校验     |
| onChange | 在提交表单和输入框内容变化时触发校验 |

### Form.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 表单项名称，提交表单的标识符 | _string_ | - |
| defaultValue | 表单项默认值 | _any_ | - |
| requiredMark | 是否显示表单必填星号 | _boolean_ | `false` |
| rules | 表单校验规则 | _FormRule[]_ | - |

> 属性继承自 Cell 组件，更多属性参见：[Cell 组件](/components/cell/#cell-props)

### Rule 数据结构

使用 Form.Item 的 `rules` 属性可以定义校验规则，可选属性如下：

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否为必选字段，当值为空字符串、空数组、`undefined`、`null` 时，校验不通过 | _boolean_ |
| message | 错误提示文案 | _string \| (value, rule) => string_ |
| validator | 通过函数进行校验 | _(value, rule) => boolean \| string \| Promise_ |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验。 | _boolean_ | `false` |
| pattern | 通过正则表达式进行校验 | _RegExp_ |
| trigger | 本项规则的触发时机，可选值为 `onChange`、`onBlur` | _string_ |
| formatter | 格式化函数，将表单项的值转换后进行校验 | _(value, rule) => any_ |

### Form.Label Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colon | 是否在 label 后面添加冒号 | _boolean_ | `false` |

### Form.Feedback Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方式，可选值为 `center` `right` | _string_ | `left` |
| status | 反馈状态，可选值为 `valid` `warning` `invalid` | _string_ | - |

### Form.Control Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 内容 | _ReactNode\|((controller: FormController<V>) => ReactNode)_ | --

```tsx
interface FormController<V> {
  value?: V // 当前表单项值
  validateStatus?: FormValidateStatus // 当前表单项验证状态
  disabled?: boolean // 当前表单项是否禁用

  onChange?(value: V): void // 改变当前表单项值

  onBlur?(value: V): void // 触发onBlur当前表单项校验
}
```
> Tips: 使用onBlur触发表单验证，自定义表单项时，要手动调用onBlur，才能触发校验

### Form.List

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| children | 渲染函数 | _(fields: { key: string, name: string }[], operation: { add, remove }) => ReactNode_ | _
| name | 表单项名称，提交表单的标识符 | _string_ |
| defaultValue | 表单项默认值 | _any_ | 
