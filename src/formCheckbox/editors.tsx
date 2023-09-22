import { uuid } from "../utils";

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "未激活状态",
        options: ["border", "bgColor"],
        target: `.mybricks-inactive`,
      },
      {
        title: "未激活状态字体",
        options: ["font"],
        target: `.mybricks-inactive .taroify-checkbox__label`,
      },
      {
        title: "激活状态",
        options: ["border", "bgColor"],
        target: `.mybricks-active`,
      },
      {
        title: "激活状态字体",
        options: ["font"],
        target: `.mybricks-active .taroify-checkbox__label`,
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
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
        //   title: "隐藏标题",
        //   type: "switch",
        //   value: {
        //     get({ data }) {
        //       return data.hideLabel;
        //     },
        //     set({ data }, value) {
        //       data.hideLabel = value;
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
          title: "选项排列方向",
          type: "radio",
          options: [
            { label: "水平", value: "horizontal" },
            { label: "垂直", value: "vertical" },
          ],
          value: {
            get({ data }) {
              return data.direction;
            },
            set({ data }, value) {
              data.direction = value;
            },
          },
        },
        {
          title: "选项",
          type: "array",
          options: {
            getTitle: (item, index) => {
              return [`标签项：${item.label || ""}`];
            },
            onAdd: () => {
              const defaultOption = {
                label: `选项`,
                value: uuid(),
                icon: "",
              };
              return defaultOption;
            },
            items: [
              {
                title: "标签项",
                type: "text",
                value: "label",
              },
              {
                title: "标签值",
                type: "text",
                value: "value",
              },
              {
                title: "自定义图标",
                type: "imageSelector",
                value: "icon",
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
  },
};
