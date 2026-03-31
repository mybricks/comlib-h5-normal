import { safeModifyTptJson } from "../../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "系统页面容器，用于承载页面级配置和布局",
    usage: `系统页面容器

data声明
无

slots插槽
content: 页面内容插槽

styleAry声明
页面背景: .mybricks-page
  - 可编辑样式: background

layout声明
width: 固定为100%
height: 固定为100%

事件
无

注意事项
- 系统页面容器是每个页面的根容器
- 页面背景色通常通过styleAry配置
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "system/systemPage");
  },
};
