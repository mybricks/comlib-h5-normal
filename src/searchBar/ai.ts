
export default {
  // ignore: true,
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "搜索框组件，搜索框内部左侧支持展示/隐藏图标，内部右侧支持展示/隐藏搜索按钮",
    usage: `搜索框组件，搜索框内部左侧支持展示/隐藏图标，内部右侧支持展示/隐藏搜索按钮

  
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
