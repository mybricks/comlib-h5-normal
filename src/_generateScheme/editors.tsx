export default {
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
    ];
    
    cate1.title = "调试";
    cate1.items = [
      {
        title: "输出值",
        type: "code",
        value: {
          get({ data }) {
            return data.mock;
          },

          set({ data }, val) {
            data.mock = val;
          },
        },
      },
    ];

  }
};