
export default {
  '@init'({ style }) {
    style.width = 375;
    style.height = 'auto';
  },
  '@resize': {
    options: ['width', 'height'],
  },
  ':root': {
    style: [
      {
        title: '基本',
        options: ['border'],
        target: '.mybricks-image'
      }
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
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
        {},
        {
          title: '单击',
          type: '_event',
          options: {
            outputId: 'click',
          },
        },
        // {
        //   type: 'style',
        //   options: ['border'],
        //   value: {
        //     get({ data }) {
        //       return data.imgStyle;
        //     },
        //     set({ env, data }, val) {
        //       data.imgStyle = { ...data.imgStyle, ...val };
        //     },
        //   },
        // },
        {},
      ];
  
      // cate2.title = '高级';
      // cate2.items = [
      //   {
      //     title: '单击',
      //     type: '_event',
      //     options: {
      //       outputId: 'click',
      //     },
      //   },
      // ];
    },
  }
  
};
