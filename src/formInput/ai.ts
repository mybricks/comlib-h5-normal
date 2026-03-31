import {
  safeModifyTptJson,
  transformFormInputSelectors,
} from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "单行输入框，支持多种键盘类型、文本对齐、最大长度限制、清除图标等功能",
    usage: `单行输入框，用于输入单行文本

schema=mybricks.taro.formContainer/formItem

data声明
label: string = "单行输入"  # 表单项标签
hideLabel: boolean = false  # 是否隐藏标签
name: string = "单行输入"  # 表单项字段名
value: string = ""  # 当前值
placeholder: string = "请输入内容"  # 提示内容，该提示内容会在值为空时显示
type: "text" | "idcard" | "number" | "digit" | "nickname" = "text"  # 键盘类型
disabled: boolean = false  # 是否禁用编辑
required: boolean = false  # 是否必填
hidden: boolean = false  # 是否隐藏
maxlength: number = -1  # 最大长度，-1表示不限制
inputAlign: "left" | "right" = "left"  # 文本对齐方式
showCount: boolean = false  # 是否展示字数
clearable: boolean = false  # 是否展示清除图标，当输入框有内容时可点击图标清除所有文字

slots插槽
无

styleAry声明
输入框: .mybricks-input, .mybricks-h5Input .taroify-native-input
  - 可编辑样式: border、size、padding、background

内容文本: .mybricks-input, .mybricks-h5Input .taroify-native-input
  - 可编辑样式: font

提示内容文本: .mybricks-input .taroify-input__placeholder, .mybricks-h5Input .taroify-native-input::placeholder
  - 可编辑样式: font

layout声明
width: 可配置，默认100%
height: 不可配置，默认为fit-content

事件
onChange: 当值变化时触发
onBlur: 当失去焦点时触发
onConfirm: 当点击确定时触发（移动端键盘的完成/确定按钮）

键盘类型说明
text: 文本键盘
idcard: 身份证号键盘
number: 整数键盘
digit: 数字键盘（支持小数）
nickname: 昵称输入键盘（仅支持真机）

注意事项
- maxlength为-1时表示不限制长度
- 清除图标clearable在输入框有内容时显示，点击可清空内容
- 字数统计showCount在开启后会显示当前字数/最大字数
- 输入对齐方式inputAlign需要真机预览才能看到效果
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      transformFormInputSelectors(comp);
    }, component, "formInput");
  },
};
