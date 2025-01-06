export default {
  description: `复选框`,
  editors: {
    // ':root': {
    //   title: '复选框',
    //   items: [
    //     {
    //       title: '样式',
    //       type: 'style',
    //       options: ['margin'],
    //     }
    //   ]
    // },
    '.taroify-icon': {
      title: '图标',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['border', 'background'],
        }
      ]
    },
    '.taroify-checkbox__label': {
      title: '选项内容',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['font', 'margin'],
        }
      ]
    }
  },
  docs: require("./Checkbox.md").default,
};
