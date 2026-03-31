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
      "多选框组件，方形的勾选列表，勾选项由左侧勾选方框 + 右侧内容文本组成，支持水平和垂直排列",
    usage: `多选框组件，方形的勾选列表

schema=mybricks.taro.formContainer/formItem

data声明
label: string = "多选"  # 表单项标签
hideLabel: boolean = false  # 是否隐藏标签
name: string = "多选"  # 表单项字段名
direction: "vertical" | "horizontal" = "vertical"  # 选项排列方向
value: array = []  # 当前选中的值数组
gap: number = 12  # 选项之间的间距
options: array = [{ label: "邮箱", value: "邮箱", icon: "" }, { label: "手机", value: "手机", icon: "" }, { label: "微信", value: "微信", icon: "" }]  # 选项数组
columns: number = 0  # 水平列数，0表示不限制，根据内容自动调整
defaultRenderMode: "static" | "dynamic" = "static"  # 选项默认渲染方式
disabled: boolean = false  # 是否禁用编辑

slots插槽
无

styleAry声明
标题-激活样式: .mybricks-active .taroify-checkbox__label
  - 可编辑样式: font

标题-非激活样式: .mybricks-inactive .taroify-checkbox__label
  - 可编辑样式: font

图标-激活样式: .mybricks-active .taroify-icon
  - 可编辑样式: border、background
  - 默认样式: background:#1989FA, border: 1px solid #1989FA
  - 注意: 默认borderRadius为3px

图标-非激活样式: .mybricks-inactive .taroify-icon
  - 可编辑样式: border、background
  - 默认样式: background: transparent, border: 1px solid #C8C9CC
  - 注意: 默认borderRadius为3px

layout声明
width: 可配置
height: 不可配置，默认为fit-content

事件
onChange: 当值变化时触发

注意事项
- 当direction为vertical时，选项垂直排列；为horizontal时，选项水平排列
- options数组中每个选项包含label（显示文本）、value（选中值）、icon（自定义图标）
- 使用动态数据时，需要将defaultRenderMode设置为dynamic，并通过输入项设置选项
- 选项间距gap在水平方向时为水平间距，垂直方向时为垂直间距
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      if (!comp?.style) {
        comp.style = {};
      }
      transformCheckableSelectors(comp, "checkbox");
    }, component, "formCheckbox");
  },
};
