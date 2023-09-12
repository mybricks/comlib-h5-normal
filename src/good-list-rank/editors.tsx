export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  ":root"({ data, output, slot }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "最大展示数量 (上限20)",
        type: "text",
        options: {
          type: "number",
        },
        value: {
          get({ data }) {
            return data.size;
          },
          set({ data }, value) {
            data.size = Number(value);
          },
        },
      },
      {
        title: "头部图",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.banner;
          },
          set({ data }, value) {
            data.banner = value;
          },
        },
      },
      {
        title: "按钮图",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.buyBg;
          },
          set({ data }, value) {
            data.buyBg = value;
          },
        },
      },
      {
        title: "背景色",
        type: "colorPicker",
        value: {
          get({ data }) {
            return data.backgroundColor;
          },
          set({ data }, value) {
            data.backgroundColor = value;
          },
        },
      },
    ];
  },
};
