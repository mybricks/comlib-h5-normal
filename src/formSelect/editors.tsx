import { uuid } from "../utils";

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "输入框",
        options: ["border", "size", "padding", "background"],
        target({ id }) {
          return [".mybricks-select", ".mybricks-h5Select"];
        },
      },
      {
        title: "内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-select .mybricks-input`,
            `.mybricks-h5Select .mybricks-input`,
          ];
        },
      },
      {
        title: "提示内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-select .mybricks-placeholder`,
            `.mybricks-h5Select .mybricks-placeholder`,
          ];
        },
      },
      {
        title: "箭头",
        type: "radio",
        options: [
          { label: "向右", value: "right" },
          { label: "向下", value: "down" },
          { label: "隐藏", value: "none" },
        ],
        value: {
          get({ data }) {
            return data.arrow || "right";
          },
          set({ data }, value) {
            data.arrow = value;
          },
        },
      },
    ],
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
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
        {
          title: "选项默认渲染方式",
          type: "radio",
          description:
            "当选择使用动态数据时，默认不渲染选项，需要通过「设置选项」输入项动态设置",
          options: [
            { label: "使用静态数据", value: "static" },
            { label: "使用动态数据", value: "dynamic" },
          ],
          value: {
            get({ data }) {
              return data.defaultRenderMode || "static";
            },
            set({ data }, value) {
              data.defaultRenderMode = value;
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
        {
          title: "取消选择或点遮罩层收起时",
          type: "_event",
          options: {
            outputId: "onCancel",
          },
        },
      ];
    },
  },
};
