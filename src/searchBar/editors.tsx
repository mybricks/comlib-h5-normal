export default {
  "@init": ({ style, data }) => {
    style.width = 375;
    style.height = 34;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "background"],
        target: `.mybricks-searchBar`,
      }
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
          title: "展示搜索按钮",
          type: "switch",
          value: {
            get({ data }) {
              return data.showSearchButton;
            },
            set({ data }, value: boolean) {
              data.showSearchButton = value;
            },
          },
        },
        {
          title: "搜索按钮文本",
          type: "text",
          ifVisible({ data }) {
            return data.showSearchButton;
          },
          value: {
            get({ data }) {
              return data.searchButtonText;
            },
            set({ data }, value: string) {
              data.searchButtonText = value;
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
  ".mybricks-searchButton": {
    '@dblclick': {
      type: 'text',
      value: {
        get({ data }) {
          return data.searchButtonText;
        },
        set({ data }, value) {
          data.searchButtonText = value;
        }
      }
    },
    style: [
      {
        title: "样式",
        options: ["border", "background","size","font","margin"],
        target: `.mybricks-searchButton`,
      }
    ],
    items: (props, cate1, cate2, cate3) => {
      cate1.title = "常规";
      cate1.items = [
        {
          title: "按钮文本",
          type: "text",
          value: {
            get({ data, focusArea }) {
              return data.searchButtonText
            },
            set({ data, focusArea, slot, output }, value) {
              data.searchButtonText = value;
            },
          },
        },
      ]
    }
  }
};
