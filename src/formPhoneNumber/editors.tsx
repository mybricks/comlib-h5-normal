export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "输入框",
        options: ["font", "border", "size", "padding", "background"],
        initValue: {
          paddingLeft: "8px",
        },
        target: ".taroify-input",
      },
      {
        title: "授权按钮",
        options: ["font", "border", "size", "padding", "background"],
        target: ".mybricks-button",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
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
          title: "按钮文案",
          type: "text",
          value: {
            get({ data }) {
              return data.buttonText;
            },
            set({ data }, value) {
              return (data.buttonText = value);
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
  },
};
