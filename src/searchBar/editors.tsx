export default {
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "background"],
        target: `.mybricks-searchBar`,
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "搜索框左侧文本",
          type: "text",
          value: {
            get({ data }) {
              return data.label;
            },
            set({ data }, value: string) {
              data.label = value;
            },
          },
        },
        {
          title: "提示文字",
          type: "text",
          value: {
            get({ data }) {
              return data.placeholderText;
            },
            set({ data }, value: string) {
              data.placeholderText = value;
            },
          },
        },
        {
          title: "动作",
          items: [
            {
              title: "是否禁用输入框",
              type: "switch",
              value: {
                get({ data }) {
                  return data.disabled;
                },
                set({ data }, value: boolean) {
                  data.disabled = value;
                },
              },
            },
            //
            {
              ifVisible({ data }) {
                return data.disabled;
              },
              title: "单击",
              type: "_event",
              options: {
                outputId: "onClick",
              },
            },

            //
            {
              ifVisible({ data }) {
                return !data.disabled;
              },
              title: "输入框内容变化时",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
            {
              ifVisible({ data }) {
                return !data.disabled;
              },
              title: "点击清除按钮时",
              type: "_event",
              options: {
                outputId: "onClear",
              },
            },
            {
              ifVisible({ data }) {
                return !data.disabled;
              },
              title: "当触发搜索时",
              type: "_event",
              options: {
                outputId: "onSearch",
              },
            },
          ],
        },
      ];
    },
  },
};
