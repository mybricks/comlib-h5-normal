export default {
  '@init': ({ style, data }) => {
    style.width = "100%";

    // style.marginTop = 12;
    // style.marginBottom = 12;
    // style.marginLeft = 12;
    // style.marginRight = 12;
  },
  '@resize': {
    options: ['width'],
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规'
    cate0.items = [
      {
        title: '内容',
        type: 'richtext',
        value: {
          get({ data }) {
            return decodeURIComponent(data.content)
          },
          set({ data }, val) {
            data.content = encodeURIComponent(val)
          }
        }
      }
    ]
    cate1.title = '样式'
    cate1.items = [
    ]
    cate2.title = '高级'
    cate2.items = [
      {
        title: '事件',
        items: [
          {
            title: '单击',
            type: '_event',
            options: {
              outputId: 'onClick',
            },
          },
        ],
      }
    ]
  },
}
