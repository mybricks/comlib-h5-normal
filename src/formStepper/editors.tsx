export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  "@resize": {
    options: ["width"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
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
      //   title: "隐藏标题",
      //   type: "switch",
      //   value: {
      //     get({ data }) {
      //       return data.hideLabel;
      //     },
      //     set({ data }, value) {
      //       data.hideLabel = value;
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
        title: '范围',
        type: 'inputnumber',
        description: '设置可调整的数字范围',
        options: [
          { title: '最小值', width: 100 },
          { title: '最大值', width: 100 }
        ],
        value: {
          get({ data }: any) {
            return [data.min, data.max];
          },
          set({ data }: any, value: [number, number]) {
            [data.min, data.max] = value;
          }
        }
      },
      {
        title: '步长',
        type: 'inputnumber',
        description: '每一次点击增加和减少调整的数值',
        options: [
          { title: '', width: '100%' }
        ],
        value: {
          get({ data }: any) {
            return [data.step];
          },
          set({ data }: any, value: [number, number]) {
            [data.step] = value;
          }
        }
      },
      {},
      {
        title: "当值变化",
        type: "_event",
        options: {
          outputId: "onChange",
        },
      },
    ];
  },
};
