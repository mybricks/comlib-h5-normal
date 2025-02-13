export default {
  description: `表单`,
  editors: {
    // ':root': {
    //   title: '表单',
    //   items: [
    //     {
    //       title: '样式',
    //       type: 'style',
    //       options: ['padding', 'border', 'background'],
    //     }
    //   ]
    // },
    '.taroify-form-item': {
      title: '表单项',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['padding', 'border', 'background'],
        }
      ]
    },
    '.taroify-cell__title': {
      title: '表单项标题',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['font'],
        }
      ]
    },
  },
  docs: require("./Form.md").default,
};
