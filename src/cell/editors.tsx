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
    style.width = 375;
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    styles: [],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "展示图标",
          type: "switch",
          value: {
            get({ data }) {
              return data.useThumb;
            },
            set({ data }, value: boolean) {
              data.useThumb = value;
            },
          },
        },
        {
          ifVisible({ data }) {
            return data.useThumb;
          },
          title: "图标",
          type: "imageSelector",
          value: {
            get({ data }) {
              return data.thumb;
            },
            set({ data }, value) {
              data.thumb = value;
            },
          },
        },
        {
          title: "标题",
          type: "text",
          value: {
            get({ data }) {
              return data.title;
            },
            set({ data }, val) {
              data.title = val;
            },
          },
        },
        {
          title: "描述",
          type: "text",
          value: {
            get({ data }) {
              return data.brief;
            },
            set({ data }, val) {
              data.brief = val;
            },
          },
        },
        {
          title: "内容",
          items: [
            {
              title: "开启内容插槽",
              type: "switch",
              value: {
                get({ data }) {
                  return data.useChildren;
                },
                set({ data }, value: boolean) {
                  data.useChildren = value;
                },
              },
            },
            {
              ifVisible({ data }) {
                return data.useChildren;
              },
              title: "内容插槽布局",
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
              ifVisible({ data }) {
                return !data.useChildren;
              },
              title: "内容",
              type: "text",
              value: {
                get({ data }) {
                  return data.content;
                },
                set({ data }, val) {
                  data.content = val;
                },
              },
            },
            {
              title: "显示右箭头",
              type: "switch",
              value: {
                get({ data }) {
                  return data.useArrowIcon;
                },
                set({ data }, value: boolean) {
                  return (data.useArrowIcon = value);
                },
              },
            },
            {
              ifVisible({ data }) {
                return data.useChildren && data.useArrowIcon;
              },
              title: "右箭头颜色",
              type: "colorpicker",
              value: {
                get({ data }) {
                  return data.arrowIconColor;
                },
                set({ data }, value: string) {
                  data.arrowIconColor = value;
                },
              },
            },
          ],
        },
        {
          title: "事件",
          items: [
            {
              title: "单击",
              type: "_event",
              options: {
                outputId: "onClick",
              },
            },
          ],
        },
      ];
    },
  },
  ".mybricks-thumb": {
    title: "图标",
    style: [
      {
        title: "",
        options: ["size", "border"],
        target: ".mybricks-thumb",
      },
    ],
    items: [
      {
        title: "展示图标",
        type: "switch",
        value: {
          get({ data }) {
            return data.useThumb;
          },
          set({ data }, value: boolean) {
            data.useThumb = value;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useThumb;
        },
        title: "图标",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.thumb;
          },
          set({ data }, value) {
            data.thumb = value;
          },
        },
      },
    ],
  },
  ".mybricks-title": {
    title: "标题",
    "@dblclick": {
      type: "text",
      value: {
        get({ data }) {
          return data.title;
        },
        set({ data, input }, value) {
          data.title = value;
        },
      },
    },
    style: [
      {
        title: "",
        options: ["font"],
        target: ".mybricks-title",
      },
    ],
    items: [
      {
        title: "标题",
        type: "text",
        value: {
          get({ data }) {
            return data.title;
          },
          set({ data }, val) {
            data.title = val;
          },
        },
      },
    ],
  },
  ".mybricks-brief": {
    title: "描述",
    "@dblclick": {
      type: "text",
      value: {
        get({ data }) {
          return data.brief;
        },
        set({ data, input }, value) {
          data.brief = value;
        },
      },
    },
    style: [
      {
        title: "",
        options: ["font"],
        target: ".mybricks-brief",
      },
    ],
    items: [
      {
        title: "描述",
        type: "text",
        value: {
          get({ data }) {
            return data.brief;
          },
          set({ data }, val) {
            data.brief = val;
          },
        },
      },
    ],
  },
  ".mybricks-content": {
    title: "内容",
    "@dblclick": {
      type: "text",
      value: {
        get({ data }) {
          return data.content;
        },
        set({ data, input }, value) {
          data.content = value;
        },
      },
    },
    style: [
      {
        title: "",
        options: ["font"],
        target: ".mybricks-content",
      },
    ],
    items: [
      {
        title: "开启内容插槽",
        type: "switch",
        value: {
          get({ data }) {
            return data.useChildren;
          },
          set({ data }, value: boolean) {
            data.useChildren = value;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useChildren;
        },
        title: "内容插槽布局",
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
        ifVisible({ data }) {
          return !data.useChildren;
        },
        title: "内容",
        type: "text",
        value: {
          get({ data }) {
            return data.content;
          },
          set({ data }, val) {
            data.content = val;
          },
        },
      },
      {
        title: "显示右箭头",
        type: "switch",
        value: {
          get({ data }) {
            return data.useArrowIcon;
          },
          set({ data }, value: boolean) {
            return (data.useArrowIcon = value);
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useChildren && data.useArrowIcon;
        },
        title: "右箭头颜色",
        type: "colorpicker",
        value: {
          get({ data }) {
            return data.arrowIconColor;
          },
          set({ data }, value: string) {
            data.arrowIconColor = value;
          },
        },
      },
    ],
  },

  ".mybricks-children": {
    title: "内容",
    items: [
      {
        title: "开启内容插槽",
        type: "switch",
        value: {
          get({ data }) {
            return data.useChildren;
          },
          set({ data }, value: boolean) {
            data.useChildren = value;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useChildren;
        },
        title: "内容插槽布局",
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
        ifVisible({ data }) {
          return !data.useChildren;
        },
        title: "内容",
        type: "text",
        value: {
          get({ data }) {
            return data.content;
          },
          set({ data }, val) {
            data.content = val;
          },
        },
      },
      {
        title: "显示右箭头",
        type: "switch",
        value: {
          get({ data }) {
            return data.useArrowIcon;
          },
          set({ data }, value: boolean) {
            return (data.useArrowIcon = value);
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useChildren && data.useArrowIcon;
        },
        title: "右箭头颜色",
        type: "colorpicker",
        value: {
          get({ data }) {
            return data.arrowIconColor;
          },
          set({ data }, value: string) {
            data.arrowIconColor = value;
          },
        },
      },
    ],
  },
};
