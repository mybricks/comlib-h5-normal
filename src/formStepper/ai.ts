
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '数字输入，左侧减图标，中间输入，右侧加图标的数字输入框',
    usage: `数字输入，左侧减图标，中间输入，右侧加图标的数字输入框
    
schema=mybricks.taro.formContainer/formItem

layout声明
width: 可配置
height: 不可配置，默认为fit-content`
  },
  modifyTptJson: (component) => {
    
  }
}