import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "条件容器，根据条件动态显示或隐藏内容",
    usage: `条件容器

data声明
condition: boolean = true  # 条件值，true时显示内容，false时隐藏

slots插槽
true: 条件为true时显示的内容
false: 条件为false时显示的内容

styleAry声明
无

layout声明
width: 可配置
height: 可配置

事件
无

注意事项
- 条件容器根据condition的值动态切换显示内容
- true插槽和false插槽的内容应互斥
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "containerCondition2");
  },
};
