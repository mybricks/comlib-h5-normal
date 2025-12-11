export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "fit-content";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "输入框",
        options: ["border", "size", "padding", "background"],
        target({ id }) {
          return [`.mybricks-input`, `.mybricks-h5Input .taroify-native-input`];
        },
      },
      {
        title: "内容文本",
        options: ["font"],
        target({ id }) {
          return [`.mybricks-input`, `.mybricks-h5Input .taroify-native-input`];
        },
      },
      {
        title: "提示内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-input .taroify-input__placeholder`,
            `.mybricks-h5Input .taroify-native-input::placeholder`,
          ];
        },
      },
    ],
    items: ({ data, inputs, output, style }, cate0, cate1, cate2) => {
      //配置为适应高度
      style.height = "fit-content";
      cate0.title = "单行输入";
      cate0.items = [
        {
          title: "基础属性",
          items: [
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
                { value: "nickname", label: "昵称输入键盘（仅支持真机）" },
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
          ],
        },
        {
          title: "高级属性",
          items: [
            {
              title: "文本对齐方式",
              description: "文本对齐方式，需要真机预览",
              type: "select",
              options: [
                { label: "左对齐", value: "left" },
                { label: "右对齐", value: "right" },
              ],
              value: {
                get({ data }) {
                  return data.inputAlign;
                },
                set({ data }, value) {
                  data.inputAlign = value;
                },
              },
            },
            {
              title: "最大长度",
              type: "InputNumber",
              description: "可输入的内容最大长度, -1 为不限制",
              options: [{ min: -1 }],
              value: {
                get({ data }) {
                  return [data.maxlength];
                },
                set({ data }, value: number) {
                  data.maxlength = value[0];
                },
              },
            },
            {
              title: "显示字数",
              type: "switch",
              description: "是否展示字数",
              value: {
                get({ data }) {
                  return data.showCount;
                },
                set({ data }, value: boolean) {
                  data.showCount = value;
                },
              },
            },
            {
              title: "禁用编辑",
              description: "是否禁用编辑",
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
              title: "展示清除图标",
              description: "当输入框有内容时可点击图标清除所有文字",
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
          ],
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
            {
              title: "当失去焦点",
              type: "_event",
              options: {
                outputId: "onBlur",
              },
            },
            {
              title: "当点击确定",
              type: "_event",
              options: {
                outputId: "onConfirm",
              },
            },
          ],
        },
      ];
    },
  },
};
