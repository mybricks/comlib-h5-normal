import setSlotLayout from "../utils/setSlotLayout";

export default {
  "@init": ({ style, data }) => {
    style.width = 375;
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
        options: ["border", "background", "padding"],
        target: `.mybricks-cell`,
      },
    ],
    items: ({ data, output, inputs, style }, cate0, cate1, cate2) => {
      //临时升级
      if (!inputs.get("swipe")) {
        inputs.add({
          id: "swipe",
          title: "开启左滑",
          schema: {
            type: "boolean",
          },
        });
      }
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
          title: "卡片滑动",
          items: [
            {
              title: "支持左滑",
              type: "switch",
              value: {
                get({ data }) {
                  return data.useSwipeLeft;
                },
                set({ data, outputs }, value) {
                  data.useSwipeLeft = value;

                  if (value) {
                    outputs.add({
                      id: "onClickLeftAction",
                      title: "单击左滑主按钮",
                      schema: {
                        type: "any",
                      },
                    });
                  } else {
                    outputs.remove("onClickLeftAction");
                  }
                },
              },
            },
            {
              ifVisible({ data }) {
                return data.useSwipeLeft;
              },
              title: "左滑主按钮文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.leftSwipeText;
                },
                set({ data }, value) {
                  data.leftSwipeText = value;
                },
              },
            },
            {
              ifVisible({ data }) {
                return data.useSwipeLeft;
              },
              title: "主按钮样式",
              type: "styleNew",
              options: {
                defaultOpen: true,
                plugins: ["background", "font", "size", "border"],
              },
              value: {
                get({ data }) {
                  return (
                    // 兜底编辑器 bug
                    data.leftSwipeStyle ?? {
                      paddingTop: "0px",
                      paddingLeft: "0px",
                      paddingBottom: "0px",
                      paddingRight: "0px",
                    }
                  );
                },
                set({ data }, value) {
                  console.log("主按钮样式配置", JSON.parse(JSON.stringify(value)))
                  data.leftSwipeStyle = JSON.parse(JSON.stringify(value));
                },
              },
            },
            // {
            //   ifVisible({ data }) {
            //     return data.useSwipeLeft;
            //   },
            //   title: "左滑主按钮宽度",
            //   type: "number",
            //   value: {
            //     get({ data }) {
            //       return data.leftSwipeWidth;
            //     },
            //     set({ data }, value) {
            //       data.leftSwipeWidth = value;
            //     },
            //   },
            // },
            // {
            //   ifVisible({ data }) {
            //     return data.useSwipeLeft;
            //   },
            //   title: "左滑主按钮文字色",
            //   type: "colorpicker",
            //   value: {
            //     get({ data }) {
            //       return data.leftSwipeFontColor;
            //     },
            //     set({ data }, value) {
            //       data.leftSwipeFontColor = value;
            //     },
            //   },
            // },
            // {
            //   ifVisible({ data }) {
            //     return data.useSwipeLeft;
            //   },
            //   title: "左滑主按钮背景色",
            //   type: "colorpicker",
            //   value: {
            //     get({ data }) {
            //       return data.leftSwipeBgColor;
            //     },
            //     set({ data }, value) {
            //       data.leftSwipeBgColor = value;
            //     },
            //   },
            // },
            {
              ifVisible({ data }) {
                return data.useSwipeLeft;
              },
              title: "单击主按钮",
              type: "_event",
              options: {
                outputId: "onClickLeftAction",
              },
            },
            {
              title: "开启左滑副按钮",
              type: "switch",
              ifVisible({ data }) {
                return data.useSwipeLeft;
              },
              value: {
                get({ data }) {
                  return data.useSwipeLeftSecondary;
                },
                set({ data, outputs }, value) {
                  data.useSwipeLeftSecondary = value;

                  if (value) {
                    outputs.add({
                      id: "onClickLeftActionSecondary",
                      title: "单击左滑副按钮",
                      schema: {
                        type: "any",
                      },
                    });
                  } else {
                    outputs.remove("onClickLeftActionSecondary");
                  }
                },
              },
            },
            {
              ifVisible({ data }) {
                return data.useSwipeLeftSecondary;
              },
              title: "左滑副按钮文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.leftSwipeTextSecondary;
                },
                set({ data }, value) {
                  data.leftSwipeTextSecondary = value;
                },
              },
            },
            {
              ifVisible({ data }) {
                return data.useSwipeLeftSecondary;
              },
              title: "副按钮样式",
              type: "styleNew",
              options: {
                defaultOpen: true,
                plugins: ["background", "font", "size", "border"],
              },
              value: {
                get({ data }) {
                  return (
                    // 兜底编辑器 bug
                    data.leftSwipeStyleSecondary ?? {
                      paddingTop: "0px",
                      paddingLeft: "0px",
                      paddingBottom: "0px",
                      paddingRight: "0px",
                    }
                  );
                },
                set({ data }, value) {
                  data.leftSwipeStyleSecondary = JSON.parse(JSON.stringify(value));
                },
              },
            },
            // {
            //   ifVisible({ data }) {
            //     return data.useSwipeLeftSecondary;
            //   },
            //   title: "左滑副按钮宽度",
            //   type: "number",
            //   value: {
            //     get({ data }) {
            //       return data.leftSwipeWidthSecondary;
            //     },
            //     set({ data }, value) {
            //       data.leftSwipeWidthSecondary = value;
            //     },
            //   },
            // },
            // {
            //   ifVisible({ data }) {
            //     return data.useSwipeLeftSecondary;
            //   },
            //   title: "左滑主按钮文字色",
            //   type: "colorpicker",
            //   value: {
            //     get({ data }) {
            //       return data.leftSwipeFontColorSecondary;
            //     },
            //     set({ data }, value) {
            //       data.leftSwipeFontColorSecondary = value;
            //     },
            //   },
            // },
            // {
            //   ifVisible({ data }) {
            //     return data.useSwipeLeftSecondary;
            //   },
            //   title: "左滑副按钮背景色",
            //   type: "colorpicker",
            //   value: {
            //     get({ data }) {
            //       return data.leftSwipeBgColorSecondary;
            //     },
            //     set({ data }, value) {
            //       data.leftSwipeBgColorSecondary = value;
            //     },
            //   },
            // },
            {
              ifVisible({ data }) {
                return data.useSwipeLeftSecondary;
              },
              title: "单击副按钮",
              type: "_event",
              options: {
                outputId: "onClickLeftActionSecondary",
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
        options: ["font", "margin"],
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
        options: ["font", "margin"],
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
