
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '下拉选择，左侧文本 + 右侧右箭头组成，点击会弹出下拉选择picker',
    usage: `下拉选择，左侧文本 + 右侧右箭头组成，点击会弹出下拉选择picker

schema=mybricks.taro.formContainer/formItem

styleAry声明
输入框:
  - 默认样式:
    - border: none
  - 可编辑样式: 
    - 无（非必要不加边框，不然会有割裂感）
内容文本:
  - 默认样式:
    - color: #323233
    - textAlign: left
    - fontSize: 14px
  - 可编辑样式: color、fontSize、textAlign
提示文本:
  - 默认样式: 
    - color: #c0c0c0
  - 可编辑样式: color、fontSize

元素组成
- 左侧：一个文本，为placeholder的内容
- 右侧：一个右箭头图标

layout声明
width: 可配置
height: 可配置，默认为fit-content`
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