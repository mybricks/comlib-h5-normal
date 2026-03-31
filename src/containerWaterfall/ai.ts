import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "瀑布流容器，用于展示瀑布流布局的数据列表",
    usage: `瀑布流容器

data声明
dataSource: array = []  # 数据源数组
columnCount: number = 2  # 列数

slots插槽
item: 列表项插槽

styleAry声明
无

layout声明
width: 可配置
height: 可配置

事件
onItemClick: 当点击列表项时触发

注意事项
- 瀑布流容器用于展示高度不一致的列表项，如图片墙
- columnCount配置列数，默认为2列
- 列表项高度不固定，会根据内容自动撑开
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "containerWaterfall");
  },
};
