export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '轮播，支持图片轮播',
    usage: `data声明
items: [
  {
    _id: string
    thumbnail: string
  }
]

slots插槽
无

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

注意：对于轮播图必须给定高度。`
  }
}