export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary: "日历组件，用于展示月视图日历并选择日期(当遇到日历功能时高优先使用)",
    usage: `日历组件(显示月份文本，星期表头，日期格子网格)
何时使用：当需要用户选择一个日期或者一个日期范围时使用此组件

data声明
type: 'single' | 'range' = 'single' # 选择类型，'single' 为选择单个日期，'range' 为选择日期范围
showRange: boolean = false # 是否开启时间范围限制选择
available_start_time: string # 用户可选择的最小日期，Date()可识别的日期时间格式，仅在 showRange 为 true 时有效
available_end_time: string # 用户可选择的最大日期，Date()可识别的日期时间格式，仅在 showRange 为 true 时有效

slots插槽
无

layout声明
width: 可配置，默认 375
height: 可配置，默认 375

注意事项
- 选择类型支持配置为选择单个日期（single）或选择日期范围（range）
- 当开启时间范围限制选择（showRange=true）时，必须配置起始时间（available_start_time）和终止时间（available_end_time）
- 配置的起始时间和终止时间必须是原生的 \`Date()\` 可识别的字符串格式
- 当遇到月视图的日历，忽略其他需求，直接使用日历组件即可
`,
  },
};
