
export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '多行输入textarea',
    usage: `多行输入textarea

schema=mybricks.taro.formContainer/formItem

layout声明
width: 可配置
height: 不可配置，默认为fit-content`
  },
  modifyTptJson: (component) => {
    component.style?.styleAry?.forEach?.((style, index) => {
      if (style.selector === ".textarea") {
        style.selector = ".taroify-textarea__wrapper"
        if (style.css) {
          style.css.height = '100%';
        }
      }
      if (style.selector === ".text") {
        style.selector = [".taroify-textarea__wrapper .mybricks-textarea", ".taroify-textarea__wrapper .mybricks-h5Textarea .taroify-native-textarea"]
      }
      if (style.selector === ".placeholder") {
        style.selector = [".taroify-textarea__wrapper .taroify-textarea__placeholder", ".taroify-textarea__wrapper .mybricks-h5Textarea .taroify-native-textarea::placeholder"]
      }
    })

    if (component.data?.limit !== undefined) {
      component.data.limit = component.data?.limit
    }

    if (!component.style) {
      component.style = {}
    }
    if (!component.style?.styleAry) {
      component.style.styleAry = []
    }
    if (!component.style.styleAry.find(t => t.selector !== '.taroify-textarea__wrapper')) {
      component.style.styleAry.push({
        selector: ".taroify-textarea__wrapper",
        css: {
          height: '100%'
        }
      })
    }

  }
}