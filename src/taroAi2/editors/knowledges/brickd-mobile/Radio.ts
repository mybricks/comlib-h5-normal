export default {
  description: `单选框`,
  editors: {
    // ':root': {
    //   title: '单选框',
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
    '.taroify-radio__label': {
      title: '标题',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['font', 'margin'],
        }
      ]
    }
  },
  docs: require("./Radio.md").default,
};
