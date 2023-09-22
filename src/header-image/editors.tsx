export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": [
    {
      title: "图片地址",
      type: "imageSelector",
      value: {
        get({ data }) {
          return data.src;
        },
        set({ data }, val: string) {
          data.src = val;
        },
      },
    },
    {
      title: "返回按钮图标",
      type: "imageSelector",
      description: "尺寸为32x32",
      value: {
        get({ data }) {
          return data.leftImg;
        },
        set({ data }, val: string) {
          data.leftImg = val;
        },
      },
    }
  ],
};
