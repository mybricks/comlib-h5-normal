export default {
  '@init': ({ style, data }) => {
    style.width = "100%";

    // style.marginTop = 12;
    // style.marginRight = 12;
    // style.marginBottom = 12;
    // style.marginLeft = 12;
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规';
    cate0.items = [
      {
        title: 'label',
        type: 'text',
        value: {
          get({ data }) {
            return data.label;
          },
          set({ data }, value) {
            data.label = value;
          },
        }
      },
      {
        title: 'name',
        type: 'text',
        value: {
          get({ data }) {
            return data.name;
          },
          set({ data }, value) {
            return data.name = value;
          },
        },
      },
      {
        title: '授权手机号文案',
        type: 'text',
        value: {
          get({ data }) {
            return data.autoGetText;
          },
          set({ data }, value) {
            return data.autoGetText = value;
          },
        },
      },
    ]

    cate1.title = '样式';
    cate1.items = []

    cate2.title = '动作';
    cate2.items = [
      {
        title: '获取手机成功',
        type: '_event',
        options: {
          outputId: 'onGetPhoneSuccess'
        }
      },
      {
        title: '获取手机失败',
        type: '_event',
        options: {
          outputId: 'onGetPhoneError'
        }
      }
    ]
  }
};
