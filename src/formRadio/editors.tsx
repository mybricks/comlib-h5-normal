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
        catelogChange: {
          value: {},
        },
        items: [
          {
            catelog: "未激活样式",
            title: "未激活状态",
            options: ["border", "padding", "background"],
            target: `.mybricks-inactive`,
          },
          {
            catelog: "未激活样式",
            title: "未激活状态标签项",
            options: ["font"],
            target: `.mybricks-inactive .mybricks-label`,
          },
          {
            catelog: "未激活样式",
            title: "未激活状态描述",
            options: ["font"],
            target: `.mybricks-inactive .mybricks-brief`,
          },
          {
            catelog: "激活样式",
            title: "激活状态",
            options: ["border", "padding", "background"],
            target: `.mybricks-active`,
          },
          {
            catelog: "激活样式",
            title: "激活状态标签项",
            options: ["font"],
            target: `.mybricks-active .mybricks-label`,
          },
          {
            catelog: "激活样式",
            title: "激活状态描述",
            options: ["font"],
            target: `.mybricks-inactive .mybricks-brief`,
          },
        ],
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
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
                title: "描述",
                type: "text",
                value: "brief",
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
