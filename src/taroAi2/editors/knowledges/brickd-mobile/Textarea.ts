export default {
  description: `文本域`,
  editors: {
    '.taroify-textarea': {
      title: '文本域',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ["border", "padding", "background", "font"],
        }
      ]
    }
  },
  docs: require("./Textarea.md").default,
};
