const setSlotLayout = (slot, val) => {
  if (!slot) return;
  if (val.position === "absolute") {
    slot.setLayout(val.position);
  } else if (val.display === "flex") {
    if (val.flexDirection === "row") {
      slot.setLayout("flex-row");
    } else if (val.flexDirection === "column") {
      slot.setLayout("flex-column");
    }
  }
};

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "自动布局",
        type: "layout",
        options: [],
        value: {
          get({ data, slots }) {
            const { slotStyle = {} } = data;
            const slotInstance = slots.get("content");
            setSlotLayout(slotInstance, slotStyle);
            return slotStyle;
          },
          set({ data, slots }, val: any) {
            if (!data.slotStyle) {
              data.slotStyle = {};
            }
            data.slotStyle = {
              ...data.slotStyle,
              ...val,
            };
            const slotInstance = slots.get("content");
            setSlotLayout(slotInstance, val);
          },
        },
      },
      {
        title: "卡片样式",
        options: ["border", "padding", "background"],
        target: ".mybricks-card",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "卡片标题",
          type: "text",
          value: {
            get({ data }) {
              return data.title;
            },
            set({ data }, value: string) {
              data.title = value;
            },
          },
        },
        {
          title: "右上角区域展示",
          type: "select",
          options: [
            {
              label: "文本",
              value: "text",
            },
            {
              label: "自定义",
              value: "slot",
            },
            {
              label: "隐藏",
              value: "none",
            },
          ],
          value: {
            get({ data }) {
              return data.useExtra;
            },
            set({ data }, value: boolean) {
              data.useExtra = value;
            },
          },
        },
        {
          ifVisible({ data }) {
            return data.useExtra === "text";
          },
          title: "右上角文本",
          type: "text",
          value: {
            get({ data }) {
              return data.extraText;
            },
            set({ data }, value: string) {
              data.extraText = value;
            },
          },
        },

        {
          title: "右上角区域单击",
          type: "_event",
          options: {
            outputId: "extraClick",
          },
        },
      ];
    },
  },
  ".mybricks-title": {
    title: "标题",
    style: [
      {
        title: "标题样式",
        options: ["font", "padding", "border"],
        target: `.mybricks-card .mybricks-head .mybricks-title`,
      },
    ],
    items: [
      {
        title: "卡片标题",
        type: "text",
        value: {
          get({ data }) {
            return data.title;
          },
          set({ data }, value: string) {
            data.title = value;
          },
        },
      },
    ],
  },
};
