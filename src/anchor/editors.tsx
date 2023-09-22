export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  ":root": {
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "事件",
          items: [
            {
              title: "当可见时",
              type: "_event",
              options: {
                outputId: "onExposure",
              },
            },
            {
              title: "当不可见时",
              type: "_event",
              options: {
                outputId: "onUnexposure",
              },
            },
          ],
        },
      ];
    },
  },
};
