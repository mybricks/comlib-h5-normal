import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "客服支持组件，用于提供客服支持入口",
    usage: `客服支持组件

data声明
无

slots插槽
无

styleAry声明
无

layout声明
width: 可配置
height: 可配置

事件
onClick: 当点击时触发

注意事项
- 客服支持组件通常固定在页面角落
- 点击后通常打开客服会话或跳转客服页面
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "support");
  },
};
