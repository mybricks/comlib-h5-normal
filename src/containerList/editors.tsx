import { Direction } from "./constant";

export default {
  "@init": ({ style, data }) => {
    style.width = 375;
    style.height = "auto";
  },
  ":slot": {},
  "@resize": {
    options: ["width", "height"],
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
    cate0.title = "循环列表";
    cate0.items = [
      {
        title: "基础属性",
        items: [
          {
            title: "排列方向",
            description:
              "列表项的排列方向，竖向排列时，列表项垂直排列；横向排列时，列表项水平排列",
            type: "select",
            options: [
              { label: "竖向排列", value: Direction.Column },
              { label: "横向排列", value: Direction.Row },
            ],
            value: {
              get({ data }) {
                return data.direction ?? Direction.Column;
              },
              set({ data }, value) {
                data.direction = value;
              },
            },
          },
          {
            title: "间距",
            description: "当竖向排列时，为垂直间距；当横向排列时，为水平间距",
            type: "text",
            options: {
              type: "number",
            },
            value: {
              get({ data }) {
                return data.spacing;
              },
              set({ data }, value) {
                data.spacing = value;
              },
            },
          },
          {
            title: "开启换行",
            description:
              "当横向排列时，开启换行功能，列表项会在到达容器边界时换行",
            type: "switch",
            ifVisible({ data }) {
              return data.direction === Direction.Row;
            },
            value: {
              get({ data }) {
                return data.wrap;
              },
              set({ data }, value) {
                data.wrap = value;
              },
            },
          },
          {
            title: "默认展示",
            description:
              "列表初始化时，默认展示的状态，无表示不展示任何内容，加载中表示展示加载中的状态",
            type: "select",
            options: [
              {
                label: "无",
                value: "none",
              },
              {
                label: "加载中",
                value: "loading",
              },
            ],
            value: {
              get({ data }) {
                return data.defaultActive ?? "none";
              },
              set({ data, slot }, value) {
                data.defaultActive = value;
              },
            },
          },
          {
            title: "自动展示无内容状态",
            description: "当传入的数据源为一个空数组[]时，自动切换列表到空状态",
            type: "switch",
            value: {
              get({ data }) {
                return data.autoEmptyCondition;
              },
              set({ data, slot }, value) {
                data.autoEmptyCondition = value;
              },
            },
          },
        ],
      },
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
            description: "列表加载中时，展示的加载中的文案",
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
            description: "列表加载失败时，展示的加载失败文案",
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
            description: "列表没有更多数据时，展示的没有更多文案",
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
          {
            title: "提示文案",
            description: "列表初始化时，展示的空状态文案",
            type: "text",
            catelog: "无内容",
            value: {
              get({ data }) {
                return data.initialEmptyTip;
              },
              set({ data }, value) {
                data.initialEmptyTip = value;
              },
            },
          },
          {
            title: "无内容插槽",
            description: "是否展示无内容插槽，用于自定义空状态的展示",
            type: "switch",
            catelog: "无内容",
            value: {
              get({ data }) {
                return data.showEmptySlot;
              },
              set({ data }, value) {
                data.showEmptySlot = value;
              },
            },
          },
        ],
      },
      {
        title: "事件",
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
