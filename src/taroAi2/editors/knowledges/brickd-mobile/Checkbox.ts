export default {
  description: `复选框`,
  editors: {
    '.taroify-icon': {
      title: '选择图标',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['border', 'background'],
        }
      ]
    },
    '.taroify-checkbox__label': {
      title: '标题文本',
      items: [
        {
          title: '样式',
          type: 'style',
          options: ['font', 'margin'],
        }
      ]
    }
  },
  docs: require("./Checkbox.md").default,
};
