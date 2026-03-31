import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "多行文本输入框，用于输入多行文本内容",
    usage: `多行文本输入框

schema=mybricks.taro.formContainer/formItem

data声明
label: string = ""  # 表单项标签
name: string = ""  # 表单项字段名
value: string = ""  # 当前值
placeholder: string = "请输入"  # 提示内容
maxlength: number = -1  # 最大长度，-1表示不限制
rows: number = 3  # 显示行数
showCount: boolean = false  # 是否显示字数统计
disabled: boolean = false  # 是否禁用

slots插槽
无

styleAry声明
文本框: .mybricks-textarea
  - 可编辑样式: border、background、padding、font

layout声明
width: 可配置，默认100%
height: 不可配置，默认为fit-content

事件
onChange: 当值变化时触发
onBlur: 当失去焦点时触发

注意事项
- rows属性控制文本框的显示行数，实际高度会根据行数和字体大小自动计算
- showCount开启后会显示当前字数/最大字数
- 多行文本适合输入较长的文本内容，如备注、描述等
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "formTextarea");
  },
};
