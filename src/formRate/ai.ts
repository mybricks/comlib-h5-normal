
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '星星样式的评分组件，可以左右拖动评分',
    usage: `星星样式的评分组件，可以左右拖动评分

schema=mybricks.taro.formContainer/formItem

styleAry声明
星星样式:
 - 可配置项：color、font
 - 默认样式：
    - color: #000000
    - fontSize: 12px

layout声明
width: 不可配置，建议配置fit-content
height: 不可配置，默认为fit-content

layout规则
- width，取决count属性（代表有多少个星星，星星之间的间距为4px）和 fontSize 配置；
- height，取决于 fontSize 和 lineHeight 配置；

`
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