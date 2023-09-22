export default {
  '@init': ({ style, data }) => {
    style.width = "100%";
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规';
    cate0.items = [
      {
        title: '开启腰封插槽',
        type: 'switch',
        value: {
          get({ data }) {
            return data.useBanner;
          },
          set({ data }, value: boolean) {
            return data.useBanner = value;
          },
        },
      },
      {
        title: '开启页脚插槽',
        type: 'switch',
        value: {
          get({ data }) {
            return data.useFooter;
          },
          set({ data }, value: boolean) {
            return data.useFooter = value;
          },
        },
      },
    ]

    cate1.title = '样式';
    cate1.items = [
    ]

    cate2.title = '动作';
    cate2.items = [
      {
        title: '报名',
        type: '_event',
        options: {
          outputId: 'onSignup',
        },
      },
      {
        title: '点击社群卡片',
        type: '_event',
        options: {
          outputId: 'onClickGroupCard',
        },
      },
      {
        title: '点击用户卡片',
        type: '_event',
        options: {
          outputId: 'onClickUserCard',
        },
      },
      {
        title: '偷偷的upgrade',
        type: 'button',
        value: {
          set: ({ input, output }) => {
            if (!output.get('onClickGroupCard')) {
              output.add('onClickGroupCard', '点击社群卡片', { type: 'any' })
            }

            if (!output.get('onClickUserCard')) {
              output.add('onClickUserCard', '点击用户卡片', { type: 'any' })
            }
          }
        }
      }
    ]
  }
};
