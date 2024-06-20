export default {
  "@init"({ style, data, ...opt }) {
    style.width = "100%";
    style.height = 375;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "选项",
        items: [
          {
            title: "默认样式",
            catelog: "默认样式",
            options: [
              { type: "font", config: { disableTextAlign: true } },
              { type: "padding" },
              { type: "background" },
            ],
            target:
              ".mybricks-cascader .taroify-cascader__option:not(.taroify-cascader__option--active)",
          },
          {
            title: "选中样式",
            catelog: "选中样式",
            options: [
              { type: "font", config: { disableTextAlign: true } },
              { type: "padding" },
              { type: "background" },
            ],
            target: ".mybricks-cascader .taroify-cascader__option--active",
          },
        ],
      },
      {
        title: "标签项",
        items: [
          {
            title: "样式",
            items: [
              {
                title: "默认样式",
                catelog: "默认样式",
                options: [
                  { type: "font", config: { disableTextAlign: true } },
                  { type: "size" },
                  { type: "border" },
                  { type: "padding" },
                  { type: "background" },
                ],
                target:
                  ".mybricks-cascader .taroify-tabs__tab:not(.taroify-tabs__tab--active)",
              },
              {
                title: "选中样式",
                catelog: "选中样式",
                options: [
                  { type: "font", config: { disableTextAlign: true } },
                  { type: "size" },
                  { type: "border" },
                  { type: "padding" },
                  { type: "background" },
                ],
                target: ".mybricks-cascader .taroify-tabs__tab--active",
              },
            ],
          },
        ],
      },
      {
        title: "选中条",
        options: [
          "border",
          { type: "background", config: { disableBackgroundImage: true } },
          { type: "size", config: { disableWidth: false } },
        ],
        target: ".mybricks-cascader .taroify-tabs__line",
      },
    ],
    items({ data, slot }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "未选择的提示文案",
          type: "text",
          value: {
            get({ data }) {
              return data.placeholder;
            },
            set({ data }, value: string) {
              data.placeholder = value;
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "每当选择选项时",
              type: "_event",
              options: {
                outputId: "onSelect",
              },
            },
            {
              title: "当选择完毕时",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
          ],
        },
      ];

      // cate1.title = "高级";
      // cate1.items = [
      //   {
      //     title: "修复",
      //     type: "button",
      //     value: {
      //       set({ data, input }) {
      //         input.add("setValue", "设置值", {
      //           title: "选中项数组",
      //           type: "array",
      //           items: {
      //             type: "string",
      //           },
      //         });
      //       },
      //     },
      //   },
      // ];
    },
  },
};
