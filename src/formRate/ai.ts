import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "评分组件，星星样式的评分组件，可以左右拖动评分",
    usage: `评分组件

schema=mybricks.taro.formContainer/formItem

data声明
label: string = ""  # 表单项标签
name: string = ""  # 表单项字段名
value: number = 0  # 当前评分值
count: number = 5  # 星星数量
allowHalf: boolean = false  # 是否允许半选
readonly: boolean = false  # 是否只读

slots插槽
无

styleAry声明
星星样式: .taroify-rate__icon
  - 可编辑样式: color、font
  - 默认样式: color: #000000, fontSize: 12px

layout声明
width: 不可配置，建议配置fit-content
height: 不可配置，默认为fit-content

事件
onChange: 当评分变化时触发

注意事项
- width取决于count属性（代表有多少个星星，星星之间的间距为4px）和fontSize配置
- height取决于fontSize和lineHeight配置
- allowHalf开启后支持半星评分
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      if (!comp?.data) {
        comp.data = {};
      }
      comp.data = {
        ...comp.data,
        allowHalf: false,
      };
    }, component, "formRate");
  },
};
