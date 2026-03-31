import {
  safeModifyTptJson,
  transformCheckableSelectors,
} from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "单选框组件，圆形的单选列表，单选项由左侧勾选圆形 + 右侧内容文本组成，支持水平和垂直排列",
    usage: `单选框组件，圆形的单选列表

schema=mybricks.taro.formContainer/formItem

data声明
label: string = "单选"  # 表单项标签
hideLabel: boolean = false  # 是否隐藏标签
name: string = "单选"  # 表单项字段名
direction: "vertical" | "horizontal" = "vertical"  # 选项排列方向
value: string = ""  # 当前选中的值
gap: number = 12  # 选项之间的间距
options: array = [{ label: "公开", value: "公开", brief: "", icon: "" }, { label: "仅好友可见", value: "仅好友可见", brief: "", icon: "" }, { label: "保密", value: "保密", brief: "", icon: "" }]  # 选项数组，支持brief描述字段
columns: number = 0  # 水平列数，0表示不限制，根据内容自动调整
defaultRenderMode: "static" | "dynamic" = "static"  # 选项默认渲染方式
disabled: boolean = false  # 是否禁用编辑

slots插槽
无

styleAry声明
标题-激活样式: .mybricks-active .mybricks-label
  - 可编辑样式: font

标题-非激活样式: .mybricks-inactive .mybricks-label
  - 可编辑样式: font

描述-激活样式: .mybricks-active .mybricks-brief
  - 可编辑样式: font

描述-非激活样式: .mybricks-inactive .mybricks-brief
  - 可编辑样式: font

图标-激活样式: .mybricks-active .taroify-icon
  - 可编辑样式: border、background
  - 默认样式: background:#1989FA, border: 1px solid #1989FA

图标-非激活样式: .mybricks-inactive .taroify-icon
  - 可编辑样式: border、background
  - 默认样式: background: transparent, border: 1px solid #C8C9CC

layout声明
width: 可配置
height: 不可配置，默认为fit-content

事件
onChange: 当值变化时触发

注意事项
- 单选框一次只能选择一个选项
- options数组中每个选项包含label（显示文本）、value（选中值）、brief（描述文本）、icon（自定义图标）
- brief描述文本在单选框中显示在label下方
- 其他注意事项同多选框
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      if (!comp?.style) {
        comp.style = {};
      }
      transformCheckableSelectors(comp, "radio");
    }, component, "formRadio");
  },
};
