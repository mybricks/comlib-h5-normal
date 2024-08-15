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
        target: ".taroify-input .taroify-native-input",
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
          title: "键盘类型",
          type: "Select",
          options: [
            { value: "text", label: "文本" },
            { value: "idcard", label: "身份证号" },
            { value: "number", label: "整数" },
            { value: "digit", label: "数字（支持小数）" },
            { value: "nickname", label: "昵称输入键盘" },
          ],
          value: {
            get({ data }) {
              return data.type;
            },
            set({ data }, value) {
              return (data.type = value);
            },
          },
        },
        {
          title: "禁止编辑",
          type: "Switch",
          value: {
            get({ data }) {
              return data.disabled;
            },
            set({ data }, value) {
              return (data.disabled = value);
            },
          },
        },
        {
          title: "展示清除图标",
          description: '当输入框有内容时可点击图标清除所有文字',
          type: "Switch",
          value: {
            get({ data }) {
              return data.clearable;
            },
            set({ data }, value) {
              data.clearable = value;
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
          ]
        }
      ];
    },
  },
};
