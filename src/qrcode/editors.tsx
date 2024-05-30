export default {
  "@init"({ style }) {
    style.width = 100;
    style.height = "fit-content";
  },
  "@resize": {
    options: ["width"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        items: [
          {
            title: "二维码内容",
            type: "text",
            value: {
              get({ data }) {
                return data.text;
              },
              set({ data }, text: string) {
                data.text = text;
              },
            },
          },
          // {
          //   title: "二维码类型",
          //   type: "select",
          //   options: [
          //     { label: "二维码", value: "qrcode" },
          //     { label: "条形码", value: "barcode" },
          //   ],
          //   value: {
          //     get({ data }) {
          //       return data.mode;
          //     },
          //     set({ data }, mode: string) {
          //       data.mode = mode;
          //     },
          //   },
          // },
        ],
      },
    ];
  },
};
