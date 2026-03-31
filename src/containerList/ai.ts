import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "列表容器，循环列表组件，用于动态数据列表的实现，支持横排和竖排展示",
    usage: `列表容器，循环列表组件

data声明
dataSource: array = []  # 数据源数组
rowKey: string = "id"  # 行唯一标识字段名
horizontal: boolean = false  # 是否为横向列表

slots插槽
item: 列表项插槽，循环渲染

styleAry声明
无

layout声明
width: 可配置
height: 不可配置，默认为fit-content

事件
onItemClick: 当点击列表项时触发，返回当前项数据

注意事项
- 在列表中，插槽仅放置一个组件即可，因为列表会遍历这个组件，不要开发多个，仅需开发一个示例即可
- 对于静态数据的列表，不要使用循环列表，用基础组件开发多个示例
- 对于内部组件的内容，不允许使用{}、{{}}这类绑定语法
- 列表项通过dataSource数据动态渲染，rowKey用于指定唯一标识字段
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "containerList");
  },
};
