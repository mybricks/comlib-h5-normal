export default {
  ignore: true,
//   ':root' ({ data }) {
//     return {}
//   },
//   prompts: {
//     summary: 'checkbox组件，带文本和勾选效果',
//     usage: `data声明
// label: string = "多选"
// name: string = "多选"
// direction: ['horizontal', 'vertical'] = 'vertical'
// value: Array = []
// options: Array<{
//   label: string,
//   value: string,
//   icon: string 
// }>

// schema声明
// form-item

// styleAry声明
// 标题-激活样式: .title-active 
// 标题-非激活样式: .title-inactive
// 图标-激活样式: .icon-acitive
//  - 可配置项：background、color、border、borderRadius
//  - 默认样式：
//     - background:#1989FA
//     - border: 1px solid #1989FA
//     - color: #fff
// 图标-非激活样式: .icon-inactive
//   - 可配置项：background、color、border、borderRadius
//   - 默认样式：
//     - background: transparent
//     - border: 1px solid #C8C9CC
//     - color: transparent
// layout声明
// width: 可配置
// height: 不可配置，默认为fit-content`
//   },
//   modifyTptJson: (component) => {
//     if (!component?.style) {
//       component.style = {}
//     }
//     component.style?.styleAry?.forEach?.((style, index) => {
//       if (style.selector === ".title-active") {
//         style.selector = ".mybricks-active .taroify-checkbox__label"
//         style.css = {
//           ...style.css,
//         }
//       }
//       if (style.selector === ".title-inactive") {
//         style.selector = ".mybricks-inactive .taroify-checkbox__label"
//         style.css = {
//           ...style.css,
//         }
//       }
//       if (style.selector === ".icon-acitive") {
//         style.selector = ".mybricks-active .taroify-icon"
//         style.css = {
//           ...style.css,
//           borderRadius: style.css.borderRadius ?? "3px"
//         }
//       }
//       if (style.selector === ".icon-inactive") {
//         style.selector = ".mybricks-inactive .taroify-icon"
//         style.css = {
//           ...style.css,
//           borderRadius: style.css.borderRadius ?? "3px"
//         }
//       }
//     })
//   }
}