
export default {
  '@init'({ style }) {
    style.width = 375;
    style.height = 'auto';
  },
  '@resize': {
    options: ['width', 'height'],
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    style = [
      {
        title: '标题',
        options: ['font'],
        target: ({ id }: EditorResult<Data>) => `.card  .ant-card-head-title${getFilterSelector(id)}`,
      },
    ];
    cate0.title = '常规';
    cate0.items = [
      {
        title: '地址',
        type: 'imageSelector',
        value: {
          get({ data }) {
            return data.src;
          },
          set({ data }, src: string) {
            data.src = src;
          },
        },
      },
      {
        type: 'style',
        options: ['border'],
        value: {
          get({ data }) {
            return data.imgStyle;
          },
          set({ env, data }, val) {
            data.imgStyle = { ...data.imgStyle, ...val };
          },
        },
      },
      {},
    ];

    cate1.title = '高级';
    cate1.items = [
      {
        title: '单击',
        type: '_event',
        options: {
          outputId: 'click',
        },
      },
    ];
  },
};
