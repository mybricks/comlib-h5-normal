const setSlotLayout = (slot, value) => {
  if (!slot) return;
  if (value.position === "smart") {
    slot.setLayout("smart");
  } else if (value.position === "absolute") {
    slot.setLayout(value.position);
  } else if (value.display === "flex") {
    if (value.flexDirection === "row") {
      slot.setLayout("flex-row");
    } else if (value.flexDirection === "column") {
      slot.setLayout("flex-column");
    }
  }
};

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
        title: "列表初始高度",
        description: "如果设置为 0，组件将不展示占位状态",
        type: "Text",
        options: {
          type: "number",
        },
        value: {
          get({ data }) {
            return data.layout.minHeight;
          },
          set({ data }, value: number) {
            if (value) {
              data.layout.minHeight = +value;
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
            title: "类型",
            type: "select",
            catelog: "默认",
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
            catelog: "默认",
            options: {
              type: "number",
            },
            value: {
              get({ data }) {
                return data.layout.column;
              },
              set({ data }, value: number) {
                if (value) {
                  data.layout.column = +value;
                }
              },
            },
          },
          {
            title: "列表项间距",
            type: "inputnumber",
            catelog: "默认",
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
            catelog: "加载中",
            type: "editorRender",
            options: {
              render: () => {
                return <></>;
              },
            },
          },
          {
            title: "初始加载状态",
            catelog: "加载中",
            items: [
              {
                title: "提示图标",
                type: "imageselector",
                value: {
                  get({ data }) {
                    return data.loading.icon;
                  },
                  set({ data }, value) {
                    data.loading.icon = value;
                  },
                },
              },
              {
                title: "提示文案",
                type: "text",
                value: {
                  get({ data }) {
                    return data.loading.text;
                  },
                  set({ data }, value) {
                    data.loading.text = value;
                  },
                },
              },
            ],
          },
          {
            title: "滚动加载更多状态",
            catelog: "加载中",
            items: [
              {
                title: "提示文案",
                type: "text",
                value: {
                  get({ data }) {
                    return data.loadingBar.text;
                  },
                  set({ data }, value) {
                    data.loadingBar.text = value;
                  },
                },
              },
            ],
          },
          {
            title: "提示图标",
            type: "imageselector",
            catelog: "加载失败",
            value: {
              get({ data }) {
                return data.error.icon;
              },
              set({ data }, value) {
                data.error.icon = value;
              },
            },
          },
          {
            title: "提示文案",
            type: "text",
            catelog: "加载失败",
            value: {
              get({ data }) {
                return data.error.text;
              },
              set({ data }, value) {
                data.error.text = value;
              },
            },
          },
          {
            title: "提示图标",
            type: "imageselector",
            catelog: "没有更多",
            value: {
              get({ data }) {
                return data.empty.icon;
              },
              set({ data }, value) {
                data.empty.icon = value;
              },
            },
          },
          {
            title: "提示文案",
            type: "text",
            catelog: "没有更多",
            value: {
              get({ data }) {
                return data.empty.text;
              },
              set({ data }, value) {
                data.empty.text = value;
              },
            },
          },
        ],
      },
      {},
      {
        title: "分页配置",
        items: [
          {
            title: "起始页码",
            type: "Text",
            options: {
              type: "number",
            },
            value: {
              get({ data }) {
                return data.pagenation.page;
              },
              set({ data }, value: number) {
                if (value) {
                  data.pagenation.page = +value;
                }
              },
            },
          },
          {
            title: "每次加载条数",
            type: "Text",
            options: {
              type: "number",
            },
            value: {
              get({ data }) {
                return data.pagenation.pageSize;
              },
              set({ data }, value: number) {
                if (value) {
                  data.pagenation.pageSize = +value;
                }
              },
            },
          },
          {
            title: "当触发加载时",
            type: "_event",
            options: {
              outputId: "onScrollLoad",
            },
          },
        ],
      },
    ];
    cate1.title = "高级";
    cate1.items = [
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

  ".mybricks-loading-icon": {
    title: "提示图标",
    items: [
      {
        title: "提示图标",
        type: "imageselector",
        src: {
          get({ data }) {
            return data.loading.icon;
          },
          set({ data }, value) {
            data.loading.icon = value;
          },
        },
      },
    ],
    style: [
      {
        title: "样式",
        options: ["size"],
        target: ".mybricks-loading-icon",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-loading-text": {
    title: "提示文案",
    items: [
      {
        title: "提示文案",
        type: "text",
        value: {
          get({ data }) {
            return data.loading.text;
          },
          set({ data }, value) {
            data.loading.text = value;
          },
        },
      },
    ],
    style: [
      {
        title: "样式",
        options: ["font", "margin", "padding", "border", "background"],
        target: ".mybricks-loading-text",
        defaultOpen: true,
      },
    ],
  },

  ".mybricks-loadingBar": {
    style: [
      {
        title: "样式",
        options: ["font", "padding", "border", "background"],
        target: ".mybricks-loadingBar",
        defaultOpen: true,
      },
    ],
  },
};
