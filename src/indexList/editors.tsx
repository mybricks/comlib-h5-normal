export default {
  "@init": ({ data, style }) => {
    style.width = "100%";
  },
  ":root": {
    style: [
      {
        title: "标题样式",
        options: ["border", "background", 'font'],
        target: `.taroify-index-list__anchor`,
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "自定义单元格",
          type: "switch",
          value: {
            get({ data }) {
              return data.useCustomizeCell;
            },
            set({ data }, val) {
              data.useCustomizeCell = val;
            }
          }
        }
      ];

      cate1.title = "动作";
      cate1.items = [
        {
          title: "单击",
          type: "_event",
          options: {
            outputId: "onClick",
          },
        },
      ];
    },
  },
};
