export default {
  ":root": [
    {
      title: "按钮列表",
      description: "最多配置6项",
      type: "array",
      options: {
        getTitle: (item, index) => {
          return [`${item.label}`];
        },
        onAdd() {
          return {
            label: "选项",
            value: "选项",
          };
        },
        items: [
          {
            title: "按钮文案",
            type: "text",
            value: "label",
          },
          {
            title: "输出值",
            type: "text",
            value: "value",
          },
        ],
      },
      value: {
        get({ data }) {
          return data.itemList;
        },
        set({ data }, value) {
          data.itemList = value;
        },
      },
    },
  ],
};
