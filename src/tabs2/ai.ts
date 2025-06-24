export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '标签页组件，用于切换标签项，是一个文字+下方选中条的tab形态',
    usage: `data数据模型
new_index: number = 3
tabs: array = [
  {_id: "tabId1", tabName: "标签项1"},
  {_id: "tabId2", tabName: "标签项2"}
]
slotStyle: object = {}
tabWidthType: ['fill', 'fit'] = 'fill' # 标签项宽度配置，是适应内容还是平均铺满
contentShowType: string = "switch"
hideContent: boolean = false # 开启后可以只展示tabs，而不渲染插槽内容

slots插槽
tabId1: 标签项1内容
tabId2: 标签项2内容

styleAry声明
标签栏: .taroify-tabs__wrap .taroify-tabs__wrap__scroll
  - 默认样式: 无
  - 可编辑样式: backgroundColor、border相关
标签项（未选中）: .taroify-tabs__tab:not(.taroify-tabs__tab--active)
  - 默认样式:
    - color: #646566
  - 可编辑样式: color
标签项（已选中）: .taroify-tabs__tab--active
  - 默认样式:
    - color: #323233
  - 可编辑样式: color
标签项选中条: .taroify-tabs__line
  - 默认样式: 一个位于高亮标签项下方的选中条
    - width = 40px
    - height = 3px
    - backgroundColor: #EE0A24
  - 可编辑样式: width、height、backgroundColor
Tabs整体: .mybricks-tabs

使用案例
\`\`\`dsl file="page.dsl"
<mybricks.harmony.tabs
  title="tab"
  layout={{ width: '100%', height: 'fit-content' }}
  data={{ 
    tabs: [{ _id: "tabId1", tabName: "全部" },{ _id: "tabId2", tabName: "待付款" }],
    tabWidthType: 'fit',
    contentShowType: "switch"
  }}
> // 注意: 插槽的数量要和tabs的数量保持一致
  <slots.tabId1 title="tab项" layout={{ width: '100%' }}>
  </slots.tabId1>
  <slots.tabId2 title="tab项" layout={{ width: '100%' }}>
  </slots.tabId2>
</mybricks.harmony.tabs>
\`\`\``
  }
}