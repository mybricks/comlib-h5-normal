// import { createCardEditorItem } from '../utils/cardUtils';

export default {
  '@resize': {
    options: ['width'],
  },
  ':root': {
    style: [
      {
        title: '默认',
        ifVisible({ data }: EditorResult<any>) {
          return !data.asMapArea;
        },
        options: ['font'],
        target: `.mybricks-text`
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {

      if (!output.get('click')) {
        output.add('click', '点击', { type: 'any' })
      }

      cate0.title = '常规';
      cate0.items = [
        {
          title: '内容',
          type: 'textarea',
          value: {
            get({ data }) {
              return data.text;
            },
            set({ data }, value: string) {
              data.text = value;
            },
          },
        },
        // {
        //   type: 'Style',
        //   options: ['font'],
        //   value: {
        //     get({ data }) {
        //       return data.style;
        //     },
        //     set({ data }, val) {
        //       data.style = {
        //         ...data.style,
        //         ...val,
        //       };
        //     },
        //   },
        // },
        {
          title: '禁用换行',
          type: 'Switch',
          value: {
            get({ data }) {
              return data.ellipsis;
            },
            set({ data }, val: boolean) {
              data.ellipsis = val;
            },
          },
        },
        {},
        {
          title: '单击',
          type: '_event',
          options: {
            outputId: 'onClick',
          },
        },
      ];
  
      // cate1.title = '高级';
      // cate1.items = [
      //   {
      //     title: '点击',
      //     type: '_event',
      //     options: {
      //       outputId: 'onClick',
      //     },
      //   },
      // ];
    },
  }
  
};
