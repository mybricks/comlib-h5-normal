
export default {
  // ignore: true,
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "搜索框组件，搜索框内部左侧支持展示/隐藏图标，内部右侧支持展示/隐藏搜索按钮",
    usage: `搜索框组件，搜索框内部左侧支持展示/隐藏图标，内部右侧支持展示/隐藏搜索按钮
styleAry声明
输入框
  - 默认样式:
    - borderRadius: 2px
    - paddingLeft: 12px
    - paddingRight: 3px
    - paddingTop: 3px
    - paddingBottom: 3px
    - backgroundColor: #f7f8fa
  - 可编辑样式: background、border（非必要不加边框，不然会有割裂感）相关
输入框文本
  - 默认样式:
    - color: #323233
    - textAlign: left
    - fontSize: 14px
  - 可编辑样式:
    - color、fontSize、textAlign
提示内容文本
  - 默认样式:
    - color: #c0c0c0
  - 可编辑样式:
    - color
搜索按钮
  - 默认样式:
    - color: #ffffff
    - background: #fa6400
    - width: 50px
    - borderRadius: 2px
  - 可编辑样式:
    - color、background、width、border、borderRadius相关
  
  `,
  },
  modifyTptJson: (component) => {
    component?.style?.styleAry?.forEach((style, index) => {
      if (style.selector == ".searchBar") {
        style.selector = ".mybricks-searchBar";
      }
      if (style.selector == ".text") {
        style.selector = ".mybricks-searchBar-input .taroify-native-input";
      }
      if (style.selector == ".placeholder") {
        style.selector =
          ".mybricks-searchBar-input .taroify-native-input::placeholder";
      }
      if (style.selector == ".button") {
        style.selector = ".mybricks-searchButton";
      }
    });
  },
};
