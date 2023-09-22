export default {
  '@resize': {
    options: ['width'],
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规'
    cate0.items = [
      {
        title: '标签列表',
        type: 'array',
        options: {
          getTitle: (item, index) => {
            return [`标签：${item.label}`]
          },
          onAdd(){
            return {
              label: '标签',
            }
          },
          items: [
            {
              title: '标签项',
              type: 'text',
              value: 'label',
            }
          ]
        },
        value: {
          get({ data }) {
            return data.tags;
          },
          set({ data }, value) {
            data.tags = value;
          }
        },
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
