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
        items: [
          {
            catelog: "未激活样式",
            title: "图标",
            options: ["border", "background"],
            target: `.mybricks-inactive .taroify-icon`,
          },
          {
            catelog: "未激活样式",
            title: "标题",
            options: ["font"],
            target: `.mybricks-inactive .mybricks-label`,
          },
          {
            catelog: "未激活样式",
            title: "描述文本",
            options: ["font"],
            target: `.mybricks-inactive .mybricks-brief`,
          },

          {
            catelog: "激活样式",
            title: "图标",
            options: ["border", "background"],
            target: `.mybricks-active .taroify-icon`,
          },
          {
            catelog: "激活样式",
            title: "标题",
            options: ["font"],
            target: `.mybricks-active .mybricks-label`,
          },
          {
            catelog: "激活样式",
            title: "描述文本",
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
          title: "单选项",
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
              return data.defaultRnderMode || "static";
            },
            set({ data }, value) {
              data.defaultRnderMode = value;
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
