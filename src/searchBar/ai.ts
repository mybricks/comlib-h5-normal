export default {
  ignore: true,
//   ':root' ({ data }) {
//     return {}
//   },
//   prompts: {
//     summary: '搜索框组件，搜索框内左侧含有搜索图标，也支持在右侧展示一个搜索按钮',
//     usage: `data声明
// placeholderText: string = "请输入关键词"
// showSearchButton: boolean = false # 搜索框右侧按钮，false则不展示
// searchButtonText?: string = "搜索" # 右侧按钮的文本内容

// styleAry声明
// 输入框: .searchBar
//   - 默认样式:
//     - borderRadius: 2px
//     - paddingLeft: 12px
//     - paddingRight: 3px
//     - paddingTop: 3px
//     - paddingBottom: 3px
//     - backgroundColor: #f7f8fa
//   - 可编辑样式: background、padding、border（非必要不加边框，不然会有割裂感）相关
// 输入框文本: .text
//   - 默认样式:
//     - color: #323233
//     - textAlign: left
//     - fontSize: 14px
//   - 可编辑样式:
//     - color、fontSize、textAlign
// 提示内容文本: .placeholder
//   - 默认样式:
//     - color: #c0c0c0
//   - 可编辑样式:
//     - color
// 搜索按钮: .button
//   - 默认样式:
//     - color: #ffffff
//     - background: #fa6400
//     - width: 50px
//     - borderRadius: 2px
//   - 可编辑样式:
//     - color、background、width、border相关`
//   },
//   modifyTptJson: (component) => {
//     component?.style?.styleAry?.forEach((style, index) => {
//       if (style.selector == ".searchBar") {
//         style.selector = ".mybricks-searchBar"
//       }
//       if (style.selector == ".text") {
//         style.selector = ".mybricks-searchBar-input .taroify-native-input"
//       }
//       if (style.selector == ".placeholder") {
//         style.selector = ".mybricks-searchBar-input .taroify-native-input::placeholder"
//       }
//       if (style.selector == ".button") {
//         style.selector = ".mybricks-searchButton"
//       }
//     })
//   }
}