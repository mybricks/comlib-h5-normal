import { uuid } from "../utils";

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      // {
      //   title: "标题",
      //   type: "text",
      //   value: {
      //     get({ data }) {
      //       return data.label;
      //     },
      //     set({ data }, value) {
      //       if (data.label === data.name) {
      //         data.label = value;
      //         data.name = value;
      //       } else {
      //         data.label = value;
      //       }
      //     },
      //   },
      // },
      // {
      //   title: "字段",
      //   type: "text",
      //   value: {
      //     get({ data }) {
      //       return data.name;
      //     },
      //     set({ data }, value) {
      //       return (data.name = value);
      //     },
      //   },
      // },
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
        title: "选项",
        type: "array",
        options: {
          getTitle: (item, index) => {
            return [`选项：${item.label || ""}`];
          },
          onAdd() {
            return {
              label: "选项",
              value: uuid(),
            };
          },
          items: [
            {
              title: "选项",
              type: "text",
              value: "label",
            },
            {
              title: "值",
              type: "text",
              value: "value",
            },
          ],
        },
        value: {
          get({ data }) {
            return data.options;
          },
          set({ data }, value) {
            data.options = value;
          },
        },
      },
      {},
      {
        title: "当值变化",
        type: "_event",
        options: {
          outputId: "onChange",
        },
      },
    ];
  },
};
