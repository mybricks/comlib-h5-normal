export default {
  "@inputConnected"({ data, input, output, slots }, fromPin, toPin) {
    if (toPin.id === "dataSource") {
      let itemSchema = {};
      if (fromPin.schema.type === "array") {
        itemSchema = fromPin.schema.items;
        input.get("dataSource").setSchema(fromPin.schema);
        slots.get("item").inputs.get("itemData").setSchema(itemSchema);
      }
    }
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "加载文案",
        type: "text",
        value: {
          get({ data }) {
            return data.loadingTip;
          },
          set({ data }, value) {
            data.loadingTip = value;
          },
        },
      },
      {
        title: "加载失败文案",
        type: "text",
        value: {
          get({ data }) {
            return data.errorTip;
          },
          set({ data }, value) {
            data.errorTip = value;
          },
        },
      },
      {
        title: "没有更多了文案",
        type: "text",
        value: {
          get({ data }) {
            return data.emptyTip;
          },
          set({ data }, value) {
            data.emptyTip = value;
          },
        },
      },
      {
        title: "",
        items: [
          {
            title: "开启滚动加载",
            type: "switch",
            value: {
              get({ data }) {
                return data.scrollRefresh;
              },
              set({ data }, value) {
                data.scrollRefresh = value;
              },
            },
          },
          {
            title: "当滚动加载时",
            type: "_event",
            ifVisible({ data }: EditorResult<any>) {
              return !!data.scrollRefresh;
            },
            options: {
              outputId: "onScrollLoad",
            },
          },
        ],
      },
    ];
    cate1.title = "样式";
    cate1.items = [];
    cate2.title = "高级";
    cate2.items = [
      // {
      //   title: "",
      //   items: [
      //     {
      //       title: "支持下拉刷新",
      //       type: "switch",
      //       value: {
      //         get({ data }) {
      //           return data.pullRefresh;
      //         },
      //         set({ data }, value) {
      //           data.pullRefresh = value;
      //         },
      //       },
      //     },
      //     {
      //       title: "当下拉刷新时",
      //       type: "_event",
      //       ifVisible({ data }: EditorResult<any>) {
      //         return !!data.pullRefresh;
      //       },
      //       options: {
      //         outputId: "onRefresh",
      //       },
      //     },
      //   ],
      // },
      {
        title: '唯一主键',
        type: 'text',
        value: {
          get({ data }) {
            return data.rowKey;
          },
          set({ data }, value) {
            data.rowKey = value;
          },
        },
      }
    ];
  },
};