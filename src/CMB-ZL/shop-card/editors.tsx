export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  // "@resize": {
  //   options: ["width", "height"],
  // },
  ":root": [
    {
      title: "选择组件",
      type: "comSelector",
      options: {
        schema: "mybricks/shop_card:1.0",
      },
      value: {
        get({ data }) {
          return data.selectComNameSpace;
        },
        set({ data, slot }, namespace) {
          data.selectComNameSpace = namespace;
          slot.get("shop_card").clear();
          if (namespace) {
            slot.get("shop_card").addCom(namespace);
          }
        },
      },
    },
  ],
};
