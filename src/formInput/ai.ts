export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '单行输入框',
    usage: `
schema=mybricks.taro.formContainer/formItem

layout声明
width: 可配置
height: 可配置，默认为fit-content`
  },
  modifyTptJson: (component) => {
    component.style?.styleAry?.forEach?.((style, index) => {
      if (style.selector === ".input") {
        style.selector = [`.mybricks-h5Input .taroify-native-input`, `.mybricks-input`]
      }
      if (style.selector === ".text") {
        style.selector = [`.mybricks-input`, `.mybricks-h5Input .taroify-native-input`]
      }
      if (style.selector === ".placeholder") {
        style.selector = [`.mybricks-input .taroify-input__placeholder`, `.mybricks-h5Input .taroify-native-input::placeholder`]
      }
    })
  }
}