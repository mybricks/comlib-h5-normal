import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "表单项容器，用于在表单中放置非表单组件",
    usage: `表单项容器

schema=mybricks.taro.formContainer/formItem

data声明
label: string = ""  # 表单项标签
hideLabel: boolean = false  # 是否隐藏标签

slots插槽
content: 内容插槽，用于放置任意组件

styleAry声明
无

layout声明
width: 可配置
height: 可配置

注意事项
- 表单项容器用于在表单中放置非表单组件，如自定义按钮、图片等
- 该组件本身不收集数据，仅作为布局容器使用
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "formItemContainer");
  },
};
