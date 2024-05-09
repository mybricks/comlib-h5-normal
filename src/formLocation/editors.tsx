export default {
  "@init": ({ style, data }) => {
    style.width = 375;
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "提示内容",
        description: "该提示内容会在值为空时显示",
        type: "text",
        value: {
          get({ data }) {
            return data.placeholder;
          },
          set({ data }, value) {
            data.placeholder = value;
          },
        },
      },
      {
        title: "事件",
        items: [
          {
            title: "当值变化",
            type: "_event",
            options: {
              outputId: "onChange",
            },
          },
        ],
      },
    ];
  },
};
