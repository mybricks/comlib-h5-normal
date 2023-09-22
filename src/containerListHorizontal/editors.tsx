export default {
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
  "@init"({ style, data, slots }) {
    style.width = "100%";
    style.height = "fit-content";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "开启换行",
        type: "switch",
        value: {
          get({ data }) {
            return data.wrap;
          },
          set({ data }, value) {
            data.wrap = value;
          },
        },
      },
    ];
    cate2.title = "高级";
    cate2.items = [
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
};
