export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  "@resize": {
    options: ["width"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "内容",
        type: "richtext",
        options: {
          type: "h5",
        },
        value: {
          get({ data }) {
            return decodeURIComponent(data.content);
          },
          set({ data }, val) {
            data.content = encodeURIComponent(val);
          },
        },
      },
    ];
  },
};
