import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "短信验证码输入组件，用于输入短信验证码",
    usage: `短信验证码输入组件

data声明
label: string = ""  # 标签
name: string = ""  # 字段名
placeholder: string = "请输入验证码"  # 提示内容
maxlength: number = 6  # 验证码长度
countdown: number = 60  # 倒计时秒数

slots插槽
无

styleAry声明
无

layout声明
width: 可配置
height: 可配置

事件
onChange: 当值变化时触发
onSend: 当点击发送验证码按钮时触发

注意事项
- 短信验证码输入组件通常配合手机号输入使用
- 点击发送按钮后会开始倒计时，倒计时结束前不能重复发送
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "smsInput");
  },
};
