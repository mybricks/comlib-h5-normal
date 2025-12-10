export default {
  // ignore: true,
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: 'radio组件，圆形的的单选列表，单选项由左侧勾选圆形 + 右侧内容文本组成',
    usage: `radio组件，圆形的的单选列表，单选项由左侧勾选圆形 + 右侧内容文本组成
何时使用：用作多个选项列表中只能选取其中一个的场景

schema=mybricks.taro.formContainer/formItem

styleAry声明
标题-激活样式:
标题-非激活样式:
图标-激活样式:
 - 可配置项：background、color、border、borderRadius
 - 默认样式：
    - background:#1989FA
    - border: 1px solid #1989FA
    - color: #fff
图标-非激活样式:
  - 可配置项：background、color、border、borderRadius
  - 默认样式：
    - background: transparent
    - border: 1px solid #C8C9CC
    - color: transparent

layout声明
width: 可配置
height: 不可配置，默认为fit-content

layout规则
- width，根据 direction 和 options 来思考配置合适的值；
  - 当direction=vertical时，选项会垂直排列，宽度等于选项的勾选部分（40px宽度 + 8px右间距） + 文本部分（内容和fontSize，fontSize默认为14px）的宽度；
  - 当direction=horizontal时，选项会水平排列，宽度取决于单个选项的宽度 + gap的间距；
- height，高度计算受 direction 和 options 综合影响：
  - 当direction=vertical时，height=fit-content，选项会垂直排列，单个选项的高度默认为40px，选项之间有gap的间距；
  - 当direction=horizontal时，height=fit-content，选项会水平排列，高度取决于单个选项的高度；

注意：
  - 选项排列方向(direction)默认为垂直。
`
  },
  modifyTptJson: (component) => {
    if (!component?.style) {
      component.style = {}
    }
    component.style?.styleAry?.forEach?.((style, index) => {
      if (style.selector === ".title-active") {
        style.selector = ".mybricks-active .mybricks-label"
        style.css = {
          ...style.css,
        }
      }
      if (style.selector === ".title-inactive") {
        style.selector = ".mybricks-inactive .mybricks-label"
        style.css = {
          ...style.css,
        }
      }
      if (style.selector === ".icon-acitive") {
        style.selector = ".mybricks-active .taroify-icon"
        style.css = {
          ...style.css,
          borderRadius: style.css.borderRadius
        }
      }
      if (style.selector === ".icon-inactive") {
        style.selector = ".mybricks-inactive .taroify-icon"
        style.css = {
          ...style.css,
          borderRadius: style.css.borderRadius
        }
      }
    })
  }
}