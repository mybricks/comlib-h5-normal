export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":slot": {},
  ":root": {
    style: [
      {
        title: "卡片尺寸",
        options: ["size", "border", "background"],
        target: ".mybricks-square",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "最大上传数量",
          type: "text",
          options: {
            plugins: ["number"],
          },
          value: {
            get({ data }) {
              return data.maxCount;
            },
            set({ data }, value) {
              data.maxCount = value;
            },
          },
        },
        {
          title: "提示内容",
          type: "text",
          value: {
            get({ data }) {
              return data.placeholderText;
            },
            set({ data }, value) {
              data.placeholderText = value;
            },
          },
        },
        // {
        //   title: "上传name(h5生效)",
        //   type: "text",
        //   value: {
        //     get({ data }) {
        //       return data.uploadName;
        //     },
        //     set({ data }, value) {
        //       data.uploadName = value;
        //     },
        //   },
        // },
        // {
        //   title: "上传filename(h5生效)",
        //   type: "text",
        //   value: {
        //     get({ data }) {
        //       return data.uploadFileName;
        //     },
        //     set({ data }, value) {
        //       data.uploadFileName = value;
        //     },
        //   },
        // },
        {
          title: "事件",
          items: [
            {
              title: "值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
          ],
        },
      ];

      cate2.title = "高级";
      cate2.items = [
        {
          title: "格式化为字符串",
          description: "仅在最大上传数量为1时有效",
          type: "switch",
          value: {
            get({ data }) {
              return data.useValueString;
            },
            set({ data }, value) {
              data.useValueString = value;
            },
          },
        },
      ];
    },
  },
};