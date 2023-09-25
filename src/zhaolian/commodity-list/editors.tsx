export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  ":root": [
    {
      title: "选择组件",
      type: "comSelector",
      options: {
        schema: "mybricks/commodity:1.0",
      },
      value: {
        get({ data }) {
          return data.selectComNameSpace;
        },
        set({ data, slot }, namespace) {
          data.selectComNameSpace = namespace;
          slot.get("card").clear();
          if (namespace) {
            slot.get("card").addCom(namespace);
          }
        },
      },
    },
    {
      title: "列数",
      type: "slider",
      options: {
        max: 3,
        min: 2,
        step: 1,
      },
      value: {
        get({ data }) {
          return data.column;
        },
        set({ data }, value) {
          data.column = value;
        },
      },
    },
  ],
};
