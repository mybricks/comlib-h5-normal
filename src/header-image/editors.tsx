export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": [
    {
      title: "图片地址",
      type: "imageSelector",
      value: {
        get({ data }) {
          return data.src;
        },
        set({ data }, val: string) {
          data.src = val;
        },
      },
    },
    // {
    //   title: "添加热区",
    //   type: "button",
    //   value: {
    //     set({ data }, value) {
    //       data.hotareaList.push({
    //         top: 50,
    //         left: 50,
    //         width: 50,
    //         height: 50,
    //       });
    //     },
    //   },
    // },
  ],
  ".hotarea": {
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "热区";
      cate0.items = [
        {
          title: "删除热区",
          type: "button",
          value: {
            set({ data }, value) {},
          },
        },
      ];
    },
  },
};
