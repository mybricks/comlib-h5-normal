export default {
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        catelogChange: {
          value: {
            get({ data }) {
              return data._editState_;
            },
            set({ data }, value) {
              data._editState_ = value;
            },
          },
        },
        items: [
          {
            title: "默认样式",
            catelog: "默认样式",
            options: ["font", "size", "border", "padding", "background"],
            target: ".mbs-filter_sort",
          },
          {
            title: "选中样式",
            catelog: "选中样式",
            options: ["font", "size", "border", "padding", "background"],
            target: ".mbs-filter_sort--active",
          },
        ],
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "默认状态",
          items: [
            {
              title: "文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.options.normal.label;
                },
                set({ data }, value) {
                  data.options.normal.label = value;
                },
              },
            },
          ],
        },
        {
          title: "选中状态",
          items: [
            {
              title: "值",
              type: "text",
              value: {
                get({ data }) {
                  return data.options.actived.value;
                },
                set({ data }, value) {
                  data.options.actived.value = value;
                },
              },
            },
            {
              title: "文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.options.actived.label;
                },
                set({ data }, value) {
                  data.options.actived.label = value;
                },
              },
            },
          ],
        },
      ];
    },
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          return props.data?.options?.normal?.label
        },
        set({ data }, val: string) {
          data.options.normal.label = val;
        },
      },
    },
  },
};
