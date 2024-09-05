import setSlotLayout from "../utils/setSlotLayout";

export default {
  "@init": ({ style, data }) => {
    style.width = 375 - 30;
    style.height = "auto";
  },
  ":slot": {},
  "@resize": {
    options: ["width"],
  },
  "@inputConnected"({ data, input, output, slots }, fromPin, toPin) {
    if (toPin.id === "dataSource") {
      let itemSchema = {};
      if (fromPin.schema.type === "array") {
        itemSchema = fromPin.schema.items;
        input.get("dataSource").setSchema(fromPin.schema);
        slots.get("item").inputs.get("itemData").setSchema(itemSchema);
      }
    }
  },
  ":root": {
    style: [
      {
        title: "按钮样式",
        options: ["border", "padding", "background", "size", "font"],
        target: ".mybricks-button",
      },
      {
        title: "按钮激活样式",
        options: ["border", "padding", "background", "size", "font"],
        target: ".mybricks-button-selected",
      },
    ],
    items({ data, slot }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "初始高度",
          description: "如果设置为 0，组件将不展示占位状态",
          type: "Text",
          options: {
            type: "number",
          },
          value: {
            get({ data }) {
              return data.layout.minHeight;
            },
            set({ data }, value: number) {
              if (value) {
                data.layout.minHeight = +value;
              }
            },
          },
        },
        {
          title: "列数",
          type: "Text",
          catelog: "默认",
          options: {
            type: "number",
          },
          value: {
            get({ data }) {
              return data.layout.column;
            },
            set({ data }, value: number) {
              if (value) {
                data.layout.column = +value;
              }
            },
          },
        },
        {
          title: "选项间距",
          type: "inputnumber",
          catelog: "默认",
          options: [
            { title: "行间距", min: 0, width: 80 },
            { title: "列间距", min: 0, width: 80 },
          ],
          value: {
            get({ data }) {
              return data.layout.gutter;
            },
            set({ data }, value: number[]) {
              data.layout.gutter = value;
            },
          },
        },
        {
          title: "选项对应的字段",
          type: "text",
          value: {
            get({ data }) {
              return data.selectedKey;
            },
            set({ data }, value) {
              data.selectedKey = value;
            },
          },
        },
        {},
        {
          title: "事件",
          items: [
            {
              title: "选中项变化",
              type: "_event",
              options: {
                outputId: "selectedChanged",
              },
            },
          ],
        },
      ];
      cate1.title = "高级";
      cate1.items = [
        {
          title: "唯一主键",
          type: "text",
          value: {
            get({ data }) {
              return data.rowKey;
            },
            set({ data }, value) {
              data.rowKey = value;
            },
          },
        },
      ];
    },
  },
};
