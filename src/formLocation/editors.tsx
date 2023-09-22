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
      // {
      //   title: "输入框类型",
      //   type: "select",
      //   options: [
      //     { label: "文本输入", value: "text" },
      //     { label: "地址选择器", value: "select" },
      //   ],
      //   value: {
      //     get({ data }) {
      //       return data.type;
      //     },
      //     set({ data }, value) {
      //       data.type = value;
      //     },
      //   },
      // },
      {},
      {
        title: "当值变化",
        type: "_event",
        options: {
          outputId: "onChange",
        },
      },
    ];
  },
};
