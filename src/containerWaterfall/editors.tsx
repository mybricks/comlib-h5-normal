import { Direction } from "./constant";

export default {
  "@init": ({ style, data }) => {
    // style.width = "fit-content";
  },
  ":slot": {},
  "@resize": {
    options: ["width"],
  },
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
        title: "类型",
        type: "select",
        options: [
          {
            label: "网格布局",
            value: "grid",
          },
          {
            label: "瀑布流布局",
            value: "waterfall",
          },
        ],
        value: {
          get({ data }) {
            return data.layout.type;
          },
          set({ data }, value: string) {
            data.layout.type = value;
          },
        },
      },
      {
        title: "列数",
        type: "Text",
        options: {
          type: "number",
        },
        value: {
          get({ data }) {
            return data.layout.column;
          },
          set({ data }, value: number) {
            if (value) {
              data.layout.column = value;
            }
          },
        },
      },
      {
        title: "列表项间距",
        type: "inputnumber",
        options: [
          { title: "行间距", min: 0, width: 80 },
          { title: "列间距", min: 0, width: 80 },
        ],
        value: {
          get({ data }) {
            return data.layout.gutter;
          },
          set({ data }, value: number[]) {
            data.layout.gutter = value;
          },
        },
      },
      {
        title: "列数",
        type: "Text",
        options: {
          type: "number",
        },
        value: {
          get({ data }) {
            return data.layout.column;
          },
          set({ data }, value: number) {
            if (value) {
              data.layout.column = value;
            }
          },
        },
      },
      {},
      {
        catelogChange: {
          value: {
            get({ data }) {
              return data._edit_status_;
            },
            set({ data, catelog }) {
              data._edit_status_ = catelog;
            },
          },
        },
        items: [
          {
            title: "",
            catelog: "默认",
            type: "editorRender",
            options: {
              render: () => "暂无",
            },
          },
          {
            title: "提示文案",
            type: "text",
            catelog: "加载中",
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
            title: "提示文案",
            type: "text",
            catelog: "加载失败",
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
            title: "提示文案",
            type: "text",
            catelog: "没有更多",
            value: {
              get({ data }) {
                return data.emptyTip;
              },
              set({ data }, value) {
                data.emptyTip = value;
              },
            },
          },
        ],
      },
      {},
      {
        title: "瀑布流配置",
        items: [
          {
            title: "开启滚动加载",
            description:
              "开启后，支持通过滚动加载更多数据，逻辑编排时注意使用「添加数据」",
            type: "switch",
            ifVisible({ data }) {
              return data.direction !== Direction.Row;
            },
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
        title: "唯一主键",
        type: "text",
        value: {
          get({ data }) {
            return data.rowKey;
          },
          set({ data }, value) {
            data.rowKey = value;
          },
        },
      },
    ];
  },
};
