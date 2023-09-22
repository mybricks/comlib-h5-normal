export default {
  '@init': ({ style, data }) => {
    style.width = "100%";

    style.marginTop = 12;
    style.marginRight = 12;
    style.marginBottom = 12;
    style.marginLeft = 12;
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规';
    cate0.items = [
    ]

    cate1.title = '样式';
    cate1.items = [
    ]

    cate2.title = '动作';
    cate2.items = [
      {
        title: '单击',
        type: '_event',
        options: {
          outputId: 'onClick',
        },
      }
    ]
  }
};
