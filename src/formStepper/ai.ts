
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '数字输入，左侧减图标，中间输入，右侧加图标的数字输入框',
    usage: `数字输入，左侧减图标，中间输入，右侧加图标的数字输入框
    
schema=mybricks.taro.formContainer/formItem

styleAry声明
增加按钮:
  - 默认样式：
    - color: #ffffff
    - borderRadius: 100%
    - borderColor: #fa6400
    - backgroundColor: #fa6400
    - height: 40px
    - width: 40px
  - 可编辑样式: color、border、background、borderRadius相关
减少按钮
  - 默认样式：
    - color: #fa6400
    - borderRadius: 100%
    - borderColor: #fa6400
    - backgroundColor: #ffffff
    - height: 40px
    - width: 40px
  - 可编辑样式: color、border、background、borderRadius相关
中间的数字文本
  - 默认样式：
    - color: #000000
  - 可编辑样式: color

layout声明
width: 可配置
height: 不可配置，默认为fit-content`
  },
  modifyTptJson: (component) => {
    
  }
}