
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '开关',
    usage: `data声明
label: string = "开关"
name: string = "开关"
value: boolean = false
color: string = '#1989fa' #开关背景色

schema声明
form-item

styleAry声明
无`
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