
export default {
  '@init'({ style, data, output }) {
    style.width = '100%';
    style.height = 'auto';
  },
  '@resize': {
    options: ['width', 'height'],
  },
  ':root': [
    {
      title: '图片地址',
      type: 'imageSelector',
      value: {
        get({ data }) {
          return data.src;
        },
        set({ data }, val: string) {
          data.src = val;
        },
      },
    },
    {
      title: '返回按钮图标',
      type: 'imageSelector',
      description: '尺寸为32x32',
      value: {
        get({ data }) {
          return data.leftImg;
        },
        set({ data }, val: string) {
          data.leftImg = val;
        },
      },
    },
    {
      title: '规则页Url地址',
      type: 'text',
      value: {
        get({ data }) {
          return data.ruleLink;
        },
        set({ data }, val: string) {
          data.ruleLink = val;
        },
      },
    },
    // {
    //   title: '开启下滑吸顶',
    //   description: '大促类会场建议开启',
    //   type: 'switch',
    //   value: {
    //     get({ data }) {
    //       return data.isCeiling;
    //     },
    //     set({ data }, val: boolean) {
    //       data.isCeiling = val;
    //     },
    //   },
    // },
    // {
  ],
};
