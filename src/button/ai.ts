export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '按钮，必须推荐此组件',
    usage: `data声明
text: string = "按钮"

slots插槽
无

styleAry声明
按钮: .mybricks-button
- 默认样式: 
  - borderRadius: 60
  - backgroundColor: #FA6400
  - fontColor: #FFFFFF
  - fontSize: 14px
- 可编辑样式: backgroundColor、border、padding、font相关

美观度注意事项
- 内容文本默认是水平垂直居中的，可以配置固定高度；
- 如果按钮的宽度配置fit-content，请先配置左右内边距，否则会紧贴文本；`
  }
}