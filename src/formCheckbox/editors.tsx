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
        catelog: "未激活样式",
        title: "图标",
        options: ["border", "background"],
        target: `.mybricks-inactive .taroify-icon`,
      },
      {
        catelog: "未激活样式",
        title: "标题",
        options: ["font"],
        target: `.mybricks-inactive .taroify-checkbox__label`,
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
        target: `.mybricks-active .taroify-checkbox__label`,
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
          ifVisible({ data }) {
            return data.direction === "horizontal";
          },
          title: "水平列数",
          type: "number",
          description: "0 表示不限制，根据内容自动调整",
          value: {
            get({ data }) {
              return data.columns || 0;
            },
            set({ data }, value) {
              data.columns = value;
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
        {
          title:"选项间距",
          type:"number",
          value:{
            get({data}){
              return data.gap || 12
            },
            set({data},value){
              data.gap = value
            }
          }
        },
        {
          title: "禁用编辑",
          type: "Switch",
          value: {
            get({ data }) {
              return data.disabled;
            },
            set({ data }, value) {
              data.disabled = value;
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
