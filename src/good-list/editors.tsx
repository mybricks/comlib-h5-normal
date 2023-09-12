export default {
  '@init'({ style, data, output }) {
    style.height = 'auto';
  },
  ':root': [
    {
      title: '投放包ID',
      type: 'deliveryPack',
      options: {
        scene: 'ITEM',
        compact: false,
      },
      value: {
        get({ data }) {
          return data.deliveryPackId;
        },
        set({ data }, value: string) {
          data.deliveryPackId = value;
        },
      },
    },
    {
      title: '头部图',
      type: 'imageSelector',
      value: {
        get({ data }) {
          return data.banner;
        },
        set({ data }, value) {
          data.banner = value;
        },
      },
    },
    {
      title: '最大商品数量(为0表示不限制)',
      type: 'text',
      options: {
        type: 'number',
      },
      value: {
        get({ data }) {
          return data.maxNum;
        },
        set({ data }, value) {
          data.maxNum = value;
        },
      },
    },
    {
      title: '商详参数carrierType',
      description: "如果不知道含义请不要填写",
      type: 'text',
      value: {
        get({ data }) {
          return data.carrierType;
        },
        set({ data }, value) {
          data.carrierType = value;
        },
      },
    },
    {
      id: '商品样式',
      title: '商品样式',
      type: 'comSelector',
      options: {
        schema: 'fangzhou/eshop/entity/good-card',
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
  ],
};
