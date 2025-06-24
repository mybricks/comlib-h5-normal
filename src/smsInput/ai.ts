export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '验证码宫格，支持输入、获取验证码',
    usage: `data声明
length: number = 6
gutter: number = 10
countDownText: string = '秒后重新获取验证码'
retryText: string = '重新获取验证码'
desc: string = '收不到验证码'

styleAry声明
宫格样式配置: .mybricks-input-item

描述文字配置: .mybricks-input-desc`
  }
}