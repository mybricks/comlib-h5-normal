export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "切换按钮",
        options: ["background"],
        target: ".taroify-switch--checked",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        // {
        //   title: "标题",
        //   type: "text",
        //   value: {
        //     get({ data }) {
        //       return data.label;
        //     },
        //     set({ data }, value) {
        //       if (data.label === data.name) {
        //         data.label = value;
        //         data.name = value;
        //       } else {
        //         data.label = value;
        //       }
        //     },
        //   },
        // },
        // {
        //   title: "隐藏标题",
        //   type: "switch",
        //   value: {
        //     get({ data }) {
        //       return data.hideLabel;
        //     },
        //     set({ data }, value) {
        //       data.hideLabel = value;
        //     },
        //   },
        // },
        // {
        //   title: "字段",
        //   type: "text",
        //   value: {
        //     get({ data }) {
        //       return data.name;
        //     },
        //     set({ data }, value) {
        //       return (data.name = value);
        //     },
        //   },
        // },
        {
          title: "当值变化",
          type: "_event",
          options: {
            outputId: "onChange",
          },
        },
      ];
    },
  },
};
