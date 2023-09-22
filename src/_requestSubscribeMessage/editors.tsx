export default {
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "模板ID",
        type: "text",
        value: {
          get({ data }) {
            return data.tmplId;
          },
          set({ data }, value) {
            data.tmplId = value;
          },
        },
      },
    ];

    cate1.title = "动作";
    cate1.items = [
      {
        title: "同意订阅",
        type: "_event",
        options: {
          outputId: "onSuccess",
        },
      },
      {
        title: "拒绝订阅",
        type: "_event",
        options: {
          outputId: "onFail",
        },
      },
    ];

    cate2.title = "调试";
    cate2.items = [];
  },
};
