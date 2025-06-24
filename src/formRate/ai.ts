
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '星星样式的评分组件，可以左右拖动评分',
    usage: `data声明
label: string = "评分"
name: string = "评分"
count: number = 5
allowHalf: boolean = false

schema声明
form-item

styleAry声明
星星样式: .taroify-icon
 - 可配置项：color、font
 - 默认样式：
    - color: #000000
    - fontSize: 12px

layout声明
width: 可配置
height: 不可配置，默认为fit-content`
  },
  modifyTptJson: (component) => {
    if (!component?.data) {
      component.data = {}
    }
    component.data = {
      ...component.data,
      allowHalf: false
    }
  }
}