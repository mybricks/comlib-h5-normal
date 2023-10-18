export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
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
        title: "券id",
        type: "text",
        options: {
          placeholder: "请输入券id",
        },
        value: {
          get({ data }) {
            return data.couponId;
          },
          set({ data }, value) {
            data.couponId = value;
          },
        },
      },
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
      {
        title: "领券后使用自定义事件",
        type: "switch",
        value: {
          get({ data }) {
            return data.useAfterFetch;
          },
          set({ data, slot }, value) {
            data.useAfterFetch = value;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useAfterFetch;
        },
        title: "自定义事件名称",
        type: "_event",
        options: {
          outputId: "afterFetch",
        },
      },
    ],
  },
};
