export default {
  "@init"({ style }) {
    style.width = "100%";
    style.height = "auto";
  },
  ":root": {
    style: [
      {
        title: "",
        options: ["border", "background"],
        initValue: {
          background: "#EACCCC",
        },
        target: ".mybricks-com",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          items: [
            
            {
              title: "抽奖栏标题",
              type: "text",
              value: {
                get({ data }) {
                  return data.title;
                },
                set({ data }, title: string) {
                  data.title = title;
                },
              },
            },
            {
              title: "按钮图标",
              type: "imageSelector",
              value: {
                get({ data }) {
                  return data.buttonImg;
                },
                set({ data }, buttonImg: string) {
                  data.buttonImg = buttonImg;
                },
              },
            },
            {
              title: "抽奖ID",
              type: "text",
              value: {
                get({ data }) {
                  return data.prizeId;
                },
                set({ data }, prizeId: string) {
                  data.prizeId = prizeId;
                },
              },
            },
            {
              title: "动画快慢..",
              type: "text",
              value: {
                get({ data }) {
                  return data.loop;
                },
                set({ data }, loop: string) {
                  data.loop = loop;
                },
              },
            },
            {},
            {
              title: "动作",
              items: [
                {
                  title: "抽奖成功后",
                  type: "_event",
                  options: {
                    outputId: "priceResult",
                  },
                },
              ],
            },
          ],
        },
      ];
    },
  },
  ".mybricks-title": {
    title: "楼层标题",
    style: [
      {
        title: "",
        options: ["font", "size", "border", "background"],
        target: ".mybricks-title",
      },
    ],
    items: [
      {
        title: "抽奖栏标题",
        type: "text",
        value: {
          get({ data }) {
            return data.title;
          },
          set({ data }, title: string) {
            data.title = title;
          },
        },
      },
    ],
  },
  ".mybricks-box": {
    title: "抽奖箱",
    style: [
      {
        title: "",
        options: ["margin", "border", "background"],
        target: ".mybricks-box",
      },
    ],
   
  },
};
