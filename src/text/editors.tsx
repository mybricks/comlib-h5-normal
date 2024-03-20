export default {
  "@init"({ style }) {
    style.width = "fit-content";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["font", "border", "background"],
        target: ".mybricks-text",
      },
      {
        title: "开启文本省略",
        type: "Switch",
        value: {
          get({ data }) {
            return data.ellipsis;
          },
          set({ data }, val: boolean) {
            data.ellipsis = val;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.ellipsis;
        },
        title: "最大行数",
        type: "InputNumber",
        options: [{ min: 1 }],
        value: {
          get({ data }) {
            return [data.maxLines];
          },
          set({ data }, val) {
            data.maxLines = val[0];
          },
        },
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "组件默认状态",
          type: "radio",
          options: [
            { label: "静态数据", value: "static" },
            { label: "骨架屏", value: "skeleton" },
            { label: "不渲染", value: "none" },
          ],
          value: {
            get({ data }) {
              return data.defaultStatus;
            },
            set({ data }, val) {
              data.defaultStatus = val;

              switch (val) {
                case "static":
                  data.ready = true;
                  break;
                default:
                  data.ready = false;
                  break;
              }
            },
          },
        },
        {},
        {
          title: "文本内容",
          type: "textarea",
          value: {
            get({ data }) {
              return data.text;
            },
            set({ data }, value: string) {
              data.text = value;
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "单击",
              type: "_event",
              options: {
                outputId: "onClick",
              },
            },
            {
              title: "长按",
              type: "_event",
              options: {
                outputId: "onLongPress",
              },
            },
          ],
        },
      ];
    },
  },
};
