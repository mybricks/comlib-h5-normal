export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "星星样式",
        options: ["font"],
        target: ".taroify-icon",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "评分";
      cate0.items = [
        // {
        //   title: "标题",
        //   type: "text",
        //   value: {
        //     get({ data }) {
        //       return data.label;
        //     },
        //     set({ data }, value) {
        //       if (data.label === data.name) {
        //         data.label = value;
        //         data.name = value;
        //       } else {
        //         data.label = value;
        //       }
        //     },
        //   },
        // },
        // {
        //   title: "字段",
        //   type: "text",
        //   value: {
        //     get({ data }) {
        //       return data.name;
        //     },
        //     set({ data }, value) {
        //       return (data.name = value);
        //     },
        //   },
        // },
        {
          title: "基础属性",
          items: [
            {
              title: "总分值",
              description: "评分的总分数值",
              type: "inputnumber",
              options: [{ title: "", width: "100%" }],
              value: {
                get({ data }: any) {
                  return [data.count];
                },
                set({ data }: any, value: [number, number]) {
                  [data.count] = value;
                },
              },
            },
            {
              title: "允许打半星",
              description: "是否允许用户打半星",
              type: "switch",
              value: {
                get({ data }: any) {
                  return data.allowHalf;
                },
                set({ data }: any, value: any) {
                  data.allowHalf = value;
                },
              },
            },
            {
              title: "禁用编辑",
              description: "是否禁用编辑",
              type: "Switch",
              value: {
                get({ data }) {
                  return data.disabled ?? false;
                },
                set({ data }, value) {
                  data.disabled = value;
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
          ],
        },
      ];
    },
  },
};
