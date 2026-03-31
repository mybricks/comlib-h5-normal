import {
  safeModifyTptJson,
  transformFormSelectSelectors,
} from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "下拉选择组件，左侧文本 + 右侧右箭头组成，点击会弹出下拉选择picker",
    usage: `下拉选择组件

schema=mybricks.taro.formContainer/formItem

data声明
placeholder: string = "请选择"  # 提示内容
value: string = ""  # 当前选中的值
options: array = []  # 选项数组，每个选项包含label和value

slots插槽
无

styleAry声明
输入框: .mybricks-select, .mybricks-h5Select
  - 可编辑样式: 无（非必要不加边框，不然会有割裂感）

内容文本: #a-{id} .mybricks-input
  - 可编辑样式: color、fontSize、textAlign
  - 默认样式: color: #323233, textAlign: left, fontSize: 14px

提示文本: #a-{id} .mybricks-placeholder
  - 可编辑样式: color、fontSize
  - 默认样式: color: #c0c0c0

layout声明
width: 可配置
height: 可配置，默认为fit-content

事件
onChange: 当值变化时触发

元素组成
- 左侧：一个文本，为placeholder的内容
- 右侧：一个右箭头图标

注意事项
- 下拉选择的选项通过picker组件展示
- 内容文本选择器包含组件id，需要动态替换{id}
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      transformFormSelectSelectors(comp);
    }, component, "formSelect");
  },
};
