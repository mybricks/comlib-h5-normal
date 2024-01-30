export default {
  "@init"({ data, isAutoRun }) {
    if (isAutoRun()) {
      data.runImmediate = true;
    }
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "是否使用动态参数",
        type: "switch",
        value: {
          get({ data }) {
            return data.useDynamicKeys;
          },
          set({ data }, value) {
            data.useDynamicKeys = value;
          },
        },
      },
      {
        ifVisible: ({ data }) => {
          return !data.useDynamicKeys;
        },
        title: "参数名",
        type: "array",
        options: {
          getTitle: (item, index) => {
            return [`参数名：${item.key || ""}`];
          },
          items: [
            {
              title: "参数名",
              type: "text",
              value: "key",
            },
          ],
        },
        value: {
          get({ data }) {
            return data.keys;
          },
          set({ data }, value) {
            data.keys = value;
          },
        },
      },
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
  },
};
