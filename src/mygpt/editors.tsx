export default {
  '@init': ({ style, data }) => {
    style.width = "100%";
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规'
    cate0.items = [
      {
        title: '标题',
        type: 'text',
        value: {
          get({ data }) {
            return data.title
          },
          set({ data }, val) {
            data.title = val
          }
        }
      },
      {
        title: '描述',
        type: 'text',
        value: {
          get({ data }) {
            return data.label
          },
          set({ data }, val) {
            data.label = val
          }
        }
      },
      {
        title: '内容',
        type: 'text',
        value: {
          get({ data }) {
            return data.value
          },
          set({ data }, val) {
            data.value = val
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
