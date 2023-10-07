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
  ":root": {
    style: [
      {
        // horizontal
      },
      {
        title: "",
      },
    ],
    items: [
      {
        title: "布局方式",
        type: "radio",
        options: [
          {
            label: "网格布局",
            value: "grid",
          },
          {
            label: "横向布局",
            value: "horizontal",
          },
        ],
        value: {
          get({ data }) {
            return data.layout;
          },
          set({ data }, value) {
            data.layout = value;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.layout === "grid";
        },
        title: "每行列数",
        type: "slider",
        options: {
          min: 1,
          max: 12,
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
  },
};
