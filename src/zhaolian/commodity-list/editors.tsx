export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  ":root": {
    style: [
      {
        title: "顶部横幅",
        options: ["size", "background"],
        target: `.banner`
      },
      {
        title: "列表",
        options: ["padding", "background", "border"],
        target: `.mybricks-itemList`,
      },
    ],
    items: [
      {
        title: "选择组件",
        type: "comSelector",
        options: {
          schema: "mybricks/commodity:1.0",
        },
        value: {
          get({ data }) {
            return data.selectComNameSpace;
          },
          set({ data, slot }, namespace) {
            data.selectComNameSpace = namespace;
            const colTag = namespace.split('.').slice(-1)[0];
            if (colTag) {
              data.column = parseFloat(colTag);
            }
            console.log('data.column', data.column)
            slot.get("card").clear();
            if (namespace) {
              slot.get("card").addCom(namespace);
            }
          },
        },
      },
      {
        title: '卡片间隔',
        type: 'inputnumber',
        options: [
          { title: '横', min: 0, width: 80 },
          { title: '竖', min: 0, width: 80 },
        ],
        value: {
          get({ data }) {
            return data.gutter;
          },
          set({ data }, value: number[]) {
            data.gutter = [...value];
          },
        },
      },
      {
        title: "列数",
        type: 'Text',
        options: {
          type: 'number',
        },
        value: {
          get({ data }) {
            return data.column;
          },
          set({ data }, value) {
            data.column = value;
          },
        },
      },
      {
        title: '商品最大数量',
        type: 'text',
        options: {
          type: 'number',
        },
        value: {
          get({ data }) {
            return data.size;
          },
          set({ data }, value) {
            data.size = Number(value);
          },
        },
      },
      {
        title: "事件",
        items: [
          {
            title: '加载更多',
            type: '_event',
            options: {
              outputId: 'loadMore',
            },
          },
          {
            title: '异常',
            type: '_event',
            options: {
              outputId: 'error',
            },
          },
        ]
      },

    ],
  },
};
