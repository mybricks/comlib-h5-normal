export default {
  '@init'({ style, data, output }) {
    style.width = '100%';
    style.height = 'auto';
  },
  ':root': {
    style: [
      {
        title: '顶部区域',
        options: ['background'],
        target: `.item-list-banner`
      },
      {
        title: '商品区域',
        options: ['background'],
        target: `.item-list-cards`
      },
    ],
    items: [
      {
        title: '最大展示数量 (上限20)',
        type: 'text',
        options: {
          type: 'number',
        },
        value: {
          get({ data }) {
            return data.size;
          },
          set({ data }, value) {
            data.size = Number(value);
          },
        },
      },
      {
        id: '商品样式',
        title: '商品样式',
        type: 'comSelector',
        options: {
          schema: 'mybricks/entity/item',
        },
        value: {
          get({ data }) {
            return data.selectComNameSpace;
          },
          set({ data, slot }, namespace) {
            data.selectComNameSpace = namespace;
            slot.get('card').clear();
            slot.get('card').addCom(namespace);
          },
        },
      },
      // {
      //   title: "头部图",
      //   type: "imageSelector",
      //   value: {
      //     get({ data }) {
      //       return data.banner;
      //     },
      //     set({ data }, value) {
      //       data.banner = value;
      //     },
      //   },
      // },
      // {
      //   title: "背景色",
      //   type: "colorPicker",
      //   value: {
      //     get({ data }) {
      //       return data.backgroundColor;
      //     },
      //     set({ data }, value) {
      //       data.backgroundColor = value;
      //     },
      //   },
      // },
    ]
  },
};
