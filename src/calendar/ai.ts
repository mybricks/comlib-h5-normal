import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "日历组件，用于展示月视图日历并选择日期，支持单选和范围选择",
    usage: `日历组件，用于展示月视图日历并选择日期

data声明
type: "single" | "range" = "single"  # 选择类型，single为选择单个日期，range为选择日期范围
showRange: boolean = false  # 是否开启时间范围限制选择
available_start_time: string = ""  # 用户可选择的最小日期，Date()可识别的日期时间格式
available_end_time: string = ""  # 用户可选择的最大日期，Date()可识别的日期时间格式

slots插槽
无

styleAry声明
无

layout声明
width: 可配置，默认375
height: 可配置，默认375

事件
onChange: 当选择日期时触发

注意事项
- 选择类型支持配置为选择单个日期（single）或选择日期范围（range）
- 当开启时间范围限制选择（showRange=true）时，必须配置起始时间（available_start_time）和终止时间（available_end_time）
- 配置的起始时间和终止时间必须是原生的Date()可识别的字符串格式
- 当遇到月视图的日历，忽略其他需求，直接使用日历组件即可
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "calendar");
  },
};
