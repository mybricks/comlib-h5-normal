import { safeModifyTptJson } from "../../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "系统登录页，用于用户一键登录，支持自定义LOGO和自定义登录插槽",
    usage: `系统登录页

data声明
useLogo: boolean = true  # 是否展示LOGO
logo: string = "data:image/png;base64,..."  # LOGO图片地址（base64或URL）
logoStyle: object = { width: 200, height: 200 }  # LOGO样式
useLoginSlot: boolean = true  # 是否使用自定义登录插槽
loginSlotStyle: object = {}  # 自定义登录插槽布局样式
myOnSuccess: boolean = false  # 是否自定义登录成功后行为

slots插槽
loginSlot: 自定义登录插槽（仅在useLoginSlot为true时有效）

styleAry声明
LOGO: .mybricks-logo
  - 可编辑样式: size、border

一键登录按钮: .mybricks-button
  - 可编辑样式: font、border、background

返回按钮: .mybricks-exit
  - 可编辑样式: font、border、background

layout声明
width: 固定为375
height: 自适应

事件
onSuccess: 登录成功时触发（仅在myOnSuccess为true时）
onFail: 登录失败时触发

注意事项
- 系统登录页通常作为小程序的登录入口
- 默认使用微信一键登录功能
- 自定义登录插槽可以放置其他登录方式（如手机号登录）
- LOGO建议尺寸为200x200
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "system/systemLogin");
  },
};
