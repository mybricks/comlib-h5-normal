export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  ":root": {
    style: [
      {
        title: "输入框",
        options: ["font", "border", "padding", "background"],
        target: ".taroify-textarea__wrapper",
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
        {
          title: "限制字数",
          description: "限制字数后会在右下角展示字数统计",
          type: "inputnumber",
          options: [{ title: "", width: "100%", min: 0 }],
          value: {
            get({ data }: any) {
              return [data.limit];
            },
            set({ data }: any, value: [number, number]) {
              [data.limit] = value;
            },
          },
        },
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
