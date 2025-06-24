export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '轮播，支持图片轮播，自定义内容轮播',
    usage: `data声明
items: [
  {
    _id: string
    thumbnail: string
  }
]
contentType: ['image', 'custom'] = 'image' # 内容类型，为图片时可以只展示thumbnail图片，为内容时则使用插槽渲染内容

slots插槽
slot_{_id}: 轮播插槽内容，跟着当前item的_id走

styleAry声明
轮播容器: .mybricks-swiper-wrapper

使用案例：展示轮播图
\`\`\`dsl file="page.dsl"
<mybricks.harmony.swiper
  title="tab"
  layout={{ width: '100%', height: 120 }}
  data={{ 
    items: [{ _id: "item1", thumbnail: "https://" },{ _id: "item2", thumbnail: "https://" }],
    contentType: 'image',
  }}
> // 注意: contentType为image时，没有插槽
</mybricks.harmony.swiper>
\`\`\`

使用案例：展示轮播内容
\`\`\`dsl file="page.dsl"
<mybricks.harmony.swiper
  title="tab"
  layout={{ width: '100%', height: 'fit-content' }}
  data={{ 
    items: [{ _id: "item1" },{ _id: "item2" }],
    contentType: 'custom',
  }}
> // 注意: contentType为custom时，渲染插槽里的自定义内容，插槽要和items数量保持一致
  <slots.slot_item1 title="轮播项" layout={{ width: '100%' }}>
  </slots.slot_item1>
  <slots.slot_item2 title="轮播项" layout={{ width: '100%' }}>
  </slots.slot_item2>
</mybricks.harmony.swiper>
\`\`\`

注意：对于轮播图必须给定高度、自定义内容轮播组件则建议fit-content。`
  }
}