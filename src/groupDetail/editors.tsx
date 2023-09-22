export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "点击复制备注",
        type: "_event",
        options: {
          outputId: "onCopy",
        },
      },
      {
        title: '点击活动卡片',
        type: '_event',
        options: {
          outputId: 'onClickActivityCard',
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

            if (!output.get('onClickActivityCard')) {
              output.add('onClickActivityCard', '点击活动卡片', { type: 'any' })
            }

            if (!output.get('onCopy')) {
              output.add('onCopy', '点击复制', { type: 'any' })
            }
          }
        }
      }
    ];
  },
};
