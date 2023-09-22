export default {
  ":root": [
    {
      title: "提示的内容",
      type: "text",
      value: {
        get({ data }) {
          return data.title;
        },
        set({ data }, value) {
          data.title = value;
        },
      },
    },
    {
      title: "是否显示透明蒙层",
      description: "透明蒙层显示时用户将无法操作页面内的其他元素",
      type: "Switch",
      value: {
        get({ data }) {
          return data.mask;
        },
        set({ data }, value: boolean) {
          data.mask = value;
        },
      },
    },
  ],
};
