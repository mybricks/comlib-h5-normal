import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "日期时间选择器，用于选择日期、时间或日期时间",
    usage: `日期时间选择器

schema=mybricks.taro.formContainer/formItem

data声明
label: string = ""  # 表单项标签
name: string = ""  # 表单项字段名
value: string = ""  # 当前值
placeholder: string = "请选择"  # 提示内容
type: "date" | "time" | "datetime" = "date"  # 选择器类型
minDate: string = ""  # 最小可选日期
maxDate: string = ""  # 最大可选日期

slots插槽
无

styleAry声明
无

layout声明
width: 可配置，默认100%
height: 不可配置，默认为fit-content

事件
onChange: 当值变化时触发
onConfirm: 当点击确定时触发

注意事项
- type类型说明：date-日期选择，time-时间选择，datetime-日期时间选择
- minDate和maxDate限制可选范围，格式需要与type对应
- 日期时间选择器以picker形式展示
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "formDatetime");
  },
};
