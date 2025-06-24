
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '多行输入textarea',
    usage: `data声明
label: string = "多行输入"
name: string = "多行输入"
value: string = "" # 输入框值
placeholder: string = "请输入内容" # 占位提示文本

schema声明
form-item

styleAry声明
输入框: .input
  - 默认样式:
    - border: none
  - 可编辑样式: 无
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
        style.selector = ".taroify-textarea__wrapper"
      }
      if (style.selector === ".text") {
        style.selector = [".taroify-textarea__wrapper .mybricks-textarea", ".taroify-textarea__wrapper .mybricks-h5Textarea .taroify-native-textarea"]
      }
      if (style.selector === ".placeholder") {
        style.selector = [".taroify-textarea__wrapper .taroify-textarea__placeholder", ".taroify-textarea__wrapper .mybricks-h5Textarea .taroify-native-textarea::placeholder"]
      }
    })
  }
}