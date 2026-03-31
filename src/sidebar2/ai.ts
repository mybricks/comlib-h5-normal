import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "移动端侧边栏组件，左边可以切换的标签栏，适用于分类筛选、目录导航等场景",
    usage: `移动端侧边栏组件

data声明
tabs: array = [{ _id: "tabName1", tabName: "标签项1" }, { _id: "tabName2", tabName: "标签项2" }]  # 标签项数组
tabNameKey: string = "tabName"  # 标签名称字段名
activeTab: string = ""  # 当前激活的标签_id

slots插槽
tabName1: 标签项1插槽
tabName2: 标签项2插槽
（插槽数量与tabs数组长度一致，插槽id与tabs中的_id对应）

styleAry声明
侧边栏底色: .taroify-tree-select__sidebar
  - 默认样式: backgroundColor: #F7F8FA
  - 可编辑样式: background

选中条: .taroify-sidebar-tab--active:before
  - 默认样式: backgroundColor: #F7F8FA
  - 可编辑样式: background

标签项-普通样式: .taroify-sidebar-tab:not(.taroify-sidebar-tab--active)
  - 默认样式: backgroundColor: #F7F8FA, fontColor: #323233, fontWeight: 400
  - 可编辑样式: background、font

标签项-选中样式: .taroify-sidebar-tab--active
  - 默认样式: backgroundColor: #FFFFFF, fontColor: #323233, fontWeight: 500
  - 可编辑样式: background、font

layout声明
width: 可配置，默认100%
height: 可配置，默认为fit-content

事件
onChange: 当切换标签时触发

使用案例
\`\`\`dsl file="page.dsl"
<mybricks.harmony.sidebar
  title="tab"
  data={{ 
    tabs: [{ _id: "tabId1", tabName: "全部" }, { _id: "tabId2", tabName: "待付款" }],
    tabNameKey: 'tabName'
  }}
  >
    <slots.tabId1 title="标签项1" layout={{ width: '100%' }}>
    </slots.tabId1>
    <slots.tabId2 title="标签项2" layout={{ width: '100%' }}>
    </slots.tabId2>
</mybricks.harmony.sidebar>
\`\`\`

注意事项
- 侧边栏不要去配置width宽度，默认铺满页面宽度即可
- 侧边栏高度默认铺满整个页面
- 插槽的数量要和tabs的数量保持一致
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "sidebar2");
  },
};
