export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "fit-content";
  },
  "@resize": {
    options: ["width","height"],
  },
  ":root": {
    style: [
      {
        title: "输入框",
        options: ["size", "border", "padding", "background"],
        target: ".taroify-textarea__wrapper",
      },
      {
        title: "内容文本",
        options: ["font"],
        target({ id }) {
          return [
            ".taroify-textarea__wrapper .mybricks-textarea",
            ".taroify-textarea__wrapper .mybricks-h5Textarea .taroify-native-textarea",
          ];
        },
      },
      {
        title: "提示内容文本",
        options: ["font"],
        target({ id }) {
          return [
            ".taroify-textarea__wrapper .taroify-textarea__placeholder",
            ".taroify-textarea__wrapper .mybricks-h5Textarea .taroify-native-textarea::placeholder",
          ];
        },
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
          title: "自动高度",
          description: "开启后，输入框的高度会随着输入内容的增多自动增高",
          type: "switch",
          value: {
            get({ data }: any) {
              return data.autoHeight;
            },
            set({ data }: any, value: [number, number]) {
              data.autoHeight = value;
            },
          },
        },
        {
          title: "禁用编辑",
          type: "Switch",
          value: {
            get({ data }) {
              return data.disabled;
            },
            set({ data }, value) {
              data.disabled = value;
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
        {
          title: "当失去焦点",
          type: "_event",
          options: {
            outputId: "onBlur",
          },
        },
      ];
    },
  },
};
