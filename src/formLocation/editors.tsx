export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":slot": {},
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "background"],
        target: `.mybricks-formLocation`,
      },
      {
        title: "字体样式",
        options: ["font"],
        target: `.mybricks-input`,
      }
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "配置为插槽",
          type: "switch",
          value: {
            get({ data }) {
              return data.isSlot;
            },
            set({ data, slot, style }, value) {
              data.isSlot = value;
              if (value) {
                // const slotInstance = slot.get("content");
                // setSlotLayout(slotInstance, data.slotStyle);
                style.height = 50;
                style.width = 50;
              } else {
                style.height = 24;
                style.width = 375;
              }
            },
          },
        },
        {
          title: "选择器层级",
          description: "用于设置选择器的层级",
          type: "select",
          options: [
            { label: "省级选择器", value: "province" },
            { label: "市级选择器", value: "city" },
            { label: "区级选择器", value: "region" },
            { label: "街道选择器", value: "sub-district" },
          ],
          value: {
            get({ data }) {
              return data.level;
            },
            set({ data }, value) {
              data.level = value;
            },
          },
        },
        {
          title: "提示内容",
          description: "该提示内容会在值为空时显示",
          type: "text",
          value: {
            get({ data }) {
              return data.placeholder;
            },
            set({ data }, value) {
              data.placeholder = value;
            },
          },
        },
        {
          title: "禁用编辑",
          type: "Switch",
          value: {
            get({ data }) {
              return data.disabled;
            },
            set({ data }, value) {
              data.disabled = value;
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "当值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
          ],
        },
      ]
    }
  },
};
