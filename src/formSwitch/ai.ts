
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '开关',
    usage: `开关

schema=mybricks.taro.formContainer/formItem

元素组成
- 一个常见的圆形移动端开关，宽度为48，高度为24。

layout声明
width: 不可配置，建议使用fit-content
height: 不可配置，默认为fit-content
`
  },
  modifyTptJson: (component) => {
    if (component?.data?.color) {
      if (!component.style) {
        component.style = {}
      }

      if (!component.style?.styleAry) {
        component.style.styleAry = [
          { selector: '.taroify-switch--checked', css: { backgroundColor: component.data.color } }
        ]
      }
      delete component.data.color
    }
  }
}