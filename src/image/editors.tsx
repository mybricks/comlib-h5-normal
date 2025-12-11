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
          title: "基础属性",
          items: [
            {
              title: "图片链接",
              description: "填入正确有效的图片链接地址",
              type: "imageSelector",
              value: {
                get({ data }) {
                  return data.src;
                },
                set({ data }, src: string) {
                  data.src = src;

                  // 如果 src 是 svg 标签，就转为 base64
                  if (src && src.startsWith("<svg")) {
                    let base64 = window.btoa(src);
                    data.svgPolyfill = `data:image/svg+xml;base64,${base64}`;
                  } else {
                    data.svgPolyfill = "";
                  }
                },
              },
              // binding: {
              //   with: 'data.src',
              //   scheme: {
              //     type: 'string'
              //   }
              // }
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
                    style: style,
                  };
                },
                set({ }, value) {
                  console.log(data.mode);
                  data.mode = value;
                },
              },
            },
          ]
        },
        {
          title: "高级属性",
          items: [
            {
              title: "淡入动画",
              description: "加载图片时支持过渡动画，使图片展示更丝滑",
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
            {
              title: "长按识别",
              description: "支持长按识别微信二维码或转发、保存图片",
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
          ]
        },
        {
          title: "事件",
          items: [
            {
              title: "单击事件类型",
              description:"设置图片单击时的行为",
              type: "select",
              options: [
                {
                  label: "自定义",
                  value: "",
                },
                {
                  label: "预览图片",
                  value: "previewImage",
                },
              ],
              value: {
                get({ data, outputs }) {
                  return data.clickType || "";
                },
                set({ data, output }, value) {
                  data.clickType = value;

                  // 非自定义时清空 output
                  if (value) {
                    output.remove("onClick");
                  } else {
                    output.add({
                      id: "onClick",
                      title: "单击",
                      schema: {
                        type: "string",
                      },
                    });
                  }
                },
              },
            },
            {
              ifVisible({ data }) {
                return !data.clickType;
              },
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
