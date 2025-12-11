export default {
  "@init": ({ style, data }) => {
    style.width = 300;
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "padding", "background"],
        target: ".taro_html",
      },
    ],
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "基础属性",
          items: [
            {
              title: "内容",
              type: "richtext",
              description:"填写要显示的富文本内容",
              options: {
                type: "h5",
              },
              value: {
                get({ data }) {
                  return decodeURIComponent(data.content);
                },
                set({ data }, val) {
                  data.content = encodeURIComponent(val);
                },
              },
            },
          ]
        },
        {
          title: "高级属性",
          items: [
            {
              title: "仅使用动态渲染",
              description:
                "开启后，页面默认不会渲染静态的「内容」，数据必须经过输入项「设置内容」来设置",
              type: "switch",
              value: {
                get({ data }) {
                  return data.useDynamic;
                },
                set({ data }, val) {
                  data.useDynamic = val;
                },
              },
            }
          ]
        },
      ];
    },
  },
};
