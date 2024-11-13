# Input - 输入框。该组件是原生组件，使用时请注意相关限制。

## 类型
```tsx
ComponentType<InputProps>
```

## InputProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| value | `string` |  | 否 | 输入框的初始内容 |
| defaultValue | `string` |  | 否 | 设置 React 非受控输入框的初始内容 |
| type | `keyof Type` | `"text"` | 否 | input 的类型 |
| password | `boolean` | `false` | 否 | 是否是密码类型 |
| placeholder | `string` |  | 否 | 输入框为空时占位符 |
| placeholderStyle | `string` |  | 否 | 指定 placeholder 的样式 |
| placeholderClass | `string` | `"input-placeholder"` | 否 | 指定 placeholder 的样式类 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| maxlength | `number` | `140` | 否 | 最大输入长度，设置为 -1 的时候不限制最大长度 |
| cursorSpacing | `number` | `0` | 否 | 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离 |
| autoFocus | `boolean` | `false` | 否 | (即将废弃，请直接使用 focus )自动聚焦，拉起键盘<br />**不推荐使用** |
| focus | `boolean` | `false` | 否 | 获取焦点 |
| confirmType | `keyof ConfirmType` | `done` | 否 | 设置键盘右下角按钮的文字，仅在type='text'时生效 |
| confirmHold | `boolean` | `false` | 否 | 点击键盘右下角按钮时是否保持键盘不收起 |
| cursor | `number` |  | 否 | 指定focus时的光标位置 |
| selectionStart | `number` | `-1` | 否 | 光标起始位置，自动聚集时有效，需与selection-end搭配使用 |
| selectionEnd | `number` | `-1` | 否 | 光标结束位置，自动聚集时有效，需与selection-start搭配使用 |
| adjustPosition | `boolean` | `true` | 否 | 键盘弹起时，是否自动上推页面 |
| holdKeyboard | `boolean` | `false` | 否 | focus 时，点击页面的时候不收起键盘 |
| alwaysEmbed | `boolean` | `false` | 否 | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效) |
| safePasswordCertPath | `string` |  | 否 | 安全键盘加密公钥的路径，只支持包内路径 |
| safePasswordLength | `number` |  | 否 | 安全键盘输入密码长度 |
| safePasswordTimeStamp | `number` |  | 否 | 安全键盘加密时间戳 |
| safePasswordNonce | `string` |  | 否 | 安全键盘加密盐值 |
| safePasswordSalt | `string` |  | 否 | 安全键盘计算hash盐值，若指定custom-hash 则无效 |
| safePasswordCustomHash | `string` |  | 否 | 安全键盘计算hash的算法表达式，如 `md5(sha1('foo' + sha256(sm3(password + 'bar'))))` |
| nativeProps | `Record<string, unknown>` |  | 否 | 用于透传 `WebComponents` 上的属性到内部 H5 标签上 |
| onInput | `EventFunction<inputEventDetail>` |  | 否 | 当键盘输入时，触发input事件，event.detail = {value, cursor, keyCode}，处理函数可以直接 return 一个字符串，将替换输入框的内容。 |
| onFocus | `EventFunction<inputForceEventDetail>` |  | 否 | 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度 |
| onBlur | `EventFunction<inputValueEventDetail>` |  | 否 | 输入框失去焦点时触发 |
| onConfirm | `EventFunction<inputValueEventDetail>` |  | 否 | 点击完成按钮时触发 |
| onKeyboardHeightChange | `EventFunction<onKeyboardHeightChangeEventDetail>` |  | 否 | 键盘高度发生变化的时候触发此事件 |
| onNickNameReview | `EventFunction` |  | 否 | 用户昵称审核完毕后触发，仅在 type 为 "nickname" 时有效，event.detail = { pass, timeout } |


### Type

Input 类型

| 参数 | 说明 |
| --- | --- |
| text | 文本输入键盘 |
| number | 数字输入键盘 |
| idcard | 身份证输入键盘 |
| digit | 带小数点的数字键盘 |
| safe-password | 密码安全输入键盘 |
| nickname | 昵称输入键盘 |
| numberpad | 数字输入键盘 |
| digitpad | 带小数点的数字键盘 |
| idcardpad | 身份证输入键盘 |

### ConfirmType

Confirm 类型

| 参数 | 说明 |
| --- | --- |
| send | 右下角按钮为“发送” |
| search | 右下角按钮为“搜索” |
| next | 右下角按钮为“下一个” |
| go | 右下角按钮为“前往” |
| done | 右下角按钮为“完成” |

### inputEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| value | `string` | 输入值 |
| cursor | `number` | 光标位置 |
| keyCode | `number` | 键值 |

### inputForceEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| value | `string` | 输入值 |
| height | `number` | 键盘高度 |

### inputValueEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| value | `string` | 输入值 |

### onKeyboardHeightChangeEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| height | `number` | 键盘高度 |
| duration | `number` | 持续时间 |