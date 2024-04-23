import ImageShow from "./editor/imageShow";

export default {
  "@init"({ style }) {
    style.width = 200;
    style.height = 200;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "图片",
        options: ["border"],
        target: `.mybricks-image`,
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          items: [
            {
              title: "图片链接",
              type: "imageSelector",
              value: {
                get({ data }) {
                  return data.src;
                },
                set({ data }, src: string) {
                  data.src = src;
                },
              },
            },
            {
              title: "展示方式",
              type: "editorRender",
              description:
                "展示方式的区别主要在图片尺寸与配置尺寸对不齐的情况下起作用",
              options: {
                render: ImageShow,
              },
              value: {
                get({ data, style }) {
                  return {
                    mode: data.mode,
                    style,
                  };
                },
                set({}, value) {
                  console.log(data.mode);
                  data.mode = value;
                },
              },
            },
            // {
            //   title: "图片填充方式",
            //   type: "Select",
            //   options: [
            //     {
            //       label: "裁剪填满",
            //       value: "center",
            //     },
            //     {
            //       label: "等比缩放",
            //       value: "aspectFit",
            //     },
            //     {
            //       label: "拉伸填满",
            //       value: "scaleToFill",
            //     },
            //     {
            //       label: "高度自适应",
            //       value: "heightFix",
            //     },
            //     {
            //       label: "宽度自适应",
            //       value: "widthFix",
            //     },
            //   ],
            //   value: {
            //     get({ data, style }) {
            //       return data.mode;
            //     },
            //     set({ data }, value: string) {
            //       data.mode = value;
            //     },
            //   },
            // },
            {
              title: "加载过渡",
              items: [
                {
                  title: "淡入动画",
                  desctiption: "加载图片时支持过渡动画，使图片展示更丝滑",
                  type: "switch",
                  value: {
                    get({ data }) {
                      return data.loadSmooth;
                    },
                    set({ data }, value: string) {
                      data.loadSmooth = value;
                    },
                  },
                },
              ],
            },
            {
              title: "其它配置",
              items: [
                {
                  title: "支持长按识别微信二维码",
                  description: "支持长按识别微信二维码",
                  type: "switch",
                  value: {
                    get({ data }) {
                      return data.showMenuByLongpress ?? false;
                    },
                    set({ data }, value: string) {
                      data.showMenuByLongpress = value;
                    },
                  },
                },
              ],
            },
          ],
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
              title: "加载完毕",
              type: "_event",
              options: {
                outputId: "onLoad",
              },
            },
            {
              title: "加载失败",
              type: "_event",
              options: {
                outputId: "onError",
              },
            },
          ],
        },
      ];
    },
  },
};
