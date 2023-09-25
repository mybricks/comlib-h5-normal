export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  // "@resize": {
  //   options: ["width", "height"],
  // },
  ":root": {
    style: [
      {
        title: "",
        options: ["margin", "padding", "background"],
        target: `.mybricks-couponList`,
      },
    ],
    items: [
      {
        title: "选择组件",
        type: "comSelector",
        options: {
          schema: "mybricks/coupon:1.0",
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
    ],
  },
};
