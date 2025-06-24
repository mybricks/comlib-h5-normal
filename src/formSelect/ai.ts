
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '下拉选择，点击弹出下拉选择picker',
    usage: `data声明
label: string = "下拉选择"
name: string = "下拉选择"
placeholder: string = "点击选择"
value: string = ""
options: Array<{
  label: string,
  value: string
}>
arrow: 'right' | 'down' | 'none' = 'right'

schema声明
form-item

styleAry声明
输入框: .input
  - 默认样式:
    - border: none
  - 可编辑样式: 
    - 无（非必要不加边框，不然会有割裂感）
内容文本: .text
  - 默认样式:
    - color: #323233
    - textAlign: left
    - fontSize: 14px
  - 可编辑样式: color、fontSize、textAlign
提示文本: .placeholder
  - 默认样式: 
    - color: #c0c0c0
  - 可编辑样式: color、fontSize

layout声明
width: 可配置
height: 不可配置，默认为fit-content`
  },
  modifyTptJson: (component) => {
    component.style?.styleAry?.forEach?.((style, index) => {
      if (style.selector === ".input") {
        style.selector = [".mybricks-select", ".mybricks-h5Select"]
      }
      if (style.selector === ".text") {
        style.selector = `#a-${component?.id} .mybricks-input`
      }
      if (style.selector === ".placeholder") {
        style.selector = `#a-${component?.id} .mybricks-placeholder`
      }
    })
  }
}