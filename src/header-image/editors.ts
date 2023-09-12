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
      title: '动效图层地址',
      type: 'imageSelector',
      description: '设计产出的动效图，申请头图时一起申请',
      value: {
        get({ data }) {
          return data.animate;
        },
        set({ data }, val: string) {
          data.animate = val;
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
      title: '规则页H5地址',
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
    {
      title: '开启分享',
      description: '开启后需要在页面配置分享内容',
      type: 'switch',
      value: {
        get({ data }) {
          return data.openShare;
        },
        set({ data }, val: boolean) {
          data.openShare = val;
        },
      },
    },
    {
      title: '开启下滑吸顶',
      description: '大促类会场建议开启',
      type: 'switch',
      value: {
        get({ data }) {
          return data.isCeiling;
        },
        set({ data }, val: boolean) {
          data.isCeiling = val;
        },
      },
    },
    // {
    //   title: "半屏页头图链接",
    //   type: "imageSelector",
    //   value: {
    //     get({ data }) {
    //       return data.halfSrc;
    //     },
    //     set({ data }, val: string) {
    //       data.halfSrc = val;
    //     },
    //   },
    // },
    // {
    //   title: "-1tab头图链接",
    //   type: "imageSelector",
    //   value: {
    //     get({ data }) {
    //       return data.tabSrc;
    //     },
    //     set({ data }, val: string) {
    //       data.tabSrc = val;
    //     },
    //   },
    // },
  ],
};
