export default {
  "@init"({ style }) {
    style.width = "100%";
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "安全区的位置",
        type: "select",
        options: [
          {
            label: "顶部",
            value: "top",
          },
          {
            label: "底部",
            value: "bottom",
          },
        ],
        value: {
          get({ data }) {
            return data.position;
          },
          set({ data }, value) {
            data.position = value;
          },
        },
      },
    ];
  },
};
