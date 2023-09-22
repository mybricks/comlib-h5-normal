export default {
  '@init': ({ style, data }) => {
    style.width = "100%";
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '动作';
    cate0.items = [
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
