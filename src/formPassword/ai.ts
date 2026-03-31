import {
  safeModifyTptJson,
  transformFormInputSelectors,
} from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary: "密码输入框，用于输入密码的表单组件，支持设置最大输入长度",
    usage: `密码输入框，用于输入密码的表单组件

schema=mybricks.taro.formContainer/formItem

data声明
label: string = "密码输入"  # 表单项标签
name: string = "密码输入"  # 表单项字段名
placeholder: string = "请输入密码"  # 提示内容，该提示内容会在值为空时显示
type: string = "text"  # 输入框类型（运行时通常为password）
maxlength: number = 20  # 密码输入框最大输入长度

slots插槽
无

styleAry声明
输入框: .mybricks-password, .mybricks-h5Password
  - 可编辑样式: border、size、padding、background

内容文本: .mybricks-password .taroify-input, .mybricks-h5Password .taroify-input .taroify-native-input
  - 可编辑样式: font

提示内容文本: .mybricks-password .taroify-input__placeholder, .mybricks-h5Password .taroify-native-input::placeholder
  - 可编辑样式: font

layout声明
width: 可配置，默认100%
height: 不可配置，默认为auto

事件
onChange: 当值变化时触发
onBlur: 当失去焦点时触发

注意事项
- 密码输入框通常需要配合表单容器使用，用于收集用户密码信息
- maxlength限制最大输入长度，默认为20个字符
- 实际显示效果取决于运行时环境对password类型的支持
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      const selectors = {
        input: [".mybricks-password", ".mybricks-h5Password"],
        text: [
          ".mybricks-password .taroify-input",
          ".mybricks-h5Password .taroify-input .taroify-native-input",
        ],
        placeholder: [
          ".mybricks-password .taroify-input__placeholder",
          ".mybricks-h5Password .taroify-native-input::placeholder",
        ],
      };
      transformFormInputSelectors(comp, selectors);
    }, component, "formPassword");
  },
};
