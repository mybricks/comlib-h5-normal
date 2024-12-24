export default {
  description: `输入框`,
  editors: {
    '.taroify-native-input': {
      title: '输入框',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ["border", "padding", "background", "font"],
        }
      ]
    }
  },
  docs: require("./Input.md").default,
};
