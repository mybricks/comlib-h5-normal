export default {
  '@init'({ style, data }) {
    style.width = 80;
    style.height = 50;
  },
  '@resize': {
    options: ['width', 'height'],
  },
  ':root': {
    style: [
      {
        title: '默认',
        ifVisible({ data }: EditorResult<any>) {
          return !data.asMapArea;
        },
        options: ['border', { type: 'font', config: { disableTextAlign: true } }, 'background'],
        target: `.mybricks-button`
      },
    ],
    items: [
      {
        id: '文字标题',
        title: '文字标题',
        type: 'text',
        value: {
          get({ data }) {
            return data.text;
          },
          set({ data }, value: string) {
            data.text = value;
          },
        },
      },
      {
        title: '单击',
        type: '_event',
        options: {
          outputId: 'click',
        },
      },
    ]
  }
};
