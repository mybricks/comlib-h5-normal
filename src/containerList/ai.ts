export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: `循环列表组件，用于动态数据列表的实现。
何时使用：对于商品列表、各类动态数据的列表时使用，可以用静态数据的不要使用`,
    usage: `data声明
direction: ['row', 'column'] = 'column'
spacing: number = 0 
grid: {
  column: number = 0 
  gutter: [number, number] = [8, 8] # 间距[水平,垂直]
}
rowKey: string = "id" 

slots插槽
item # 列表项插槽

注意事项
- 在列表中，插槽仅放置一个组件即可，因为列表会遍历这个组件，不要开发多个，仅需开发一个示例即可；
- 对于静态数据的列表，不要使用循环列表，用flex开发多个示例`
  }
}