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
        ifVisible({ data }) {
          return data.type === "switch" || !data.type;
        },
        title: "切换按钮",
        options: ["background"],
        target: ".taroify-switch--checked",
      },
      {
        ifVisible({ data }) {
          return data.type === "checkbox";
        },
        title: "未激活样式",
        options: ["border", "background"],
        target: `.mybricks-inactive .taroify-icon`,
      },
      {
        ifVisible({ data }) {
          return data.type === "checkbox";
        },
        title: "激活样式",
        options: ["border", "background"],
        target: `.mybricks-active .taroify-icon`,
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "开关";
      cate0.items = [
        {
          title: "基础属性",
          items: [
            {
              title: "外观",
              type: "radio",
              options: [
                { label: "开关", value: "switch" },
                { label: "选择框", value: "checkbox" },
              ],
              value: {
                get({ data }) {
                  return data.type || "switch";
                },
                set({ data }, value) {
                  data.type = value;
                },
              },
            },
          ],
        },
        {
          title: "事件",
          items: [
            {
              title: "当值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
          ],
        },
      ];
    },
  },
};
