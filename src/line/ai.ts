import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "线或矩形组件，一般用于绘制分割线或者是矩形点缀",
    usage: `线或矩形组件

data声明
无

slots插槽
无

styleAry声明
线条: .mybricks-line
  - 可编辑样式: background、border、width、height

layout声明
width: 可配置，默认200
height: 可配置，默认50

注意事项
- 线条组件本质上是一个矩形div，通过配置宽高和背景色/边框来实现线条效果
- 常用作分割线时，宽度设为100%，高度设为1px，背景色设为#e5e5e5
- 常用作装饰矩形时，配置合适的宽高和背景色/圆角
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "line");
  },
};
