import setSlotLayout from "../utils/setSlotLayout";

const loadingOptions = [
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
];

const loadingBarOptions = [
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
];

const errorOptions = [
  {
    title: "提示图标",
    type: "imageselector",
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
    value: {
      get({ data }) {
        return data.error.text;
      },
      set({ data }, value) {
        data.error.text = value;
      },
    },
  },
];

const errorBarOptions = [
  {
    title: "提示文案",
    type: "text",
    value: {
      get({ data }) {
        return data.errorBar.text;
      },
      set({ data }, value) {
        data.errorBar.text = value;
      },
    },
  },
];

const emptyOptions = [
  {
    title: "提示图标",
    type: "imageselector",
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
    value: {
      get({ data }) {
        return data.empty.text;
      },
      set({ data }, value) {
        data.empty.text = value;
      },
    },
  },
];

const emptyBarOptions = [
  {
    title: "提示文案",
    type: "text",
    value: {
      get({ data }) {
        return data.emptyBar.text;
      },
      set({ data }, value) {
        data.emptyBar.text = value;
      },
    },
  },
];

export default {
  "@init": ({ style, data }) => {
    style.width = 375 - 30;
    style.height = "auto";
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
            title: "初始状态",
            catelog: "加载中",
            items: [...loadingOptions],
          },
          {
            title: "状态条",
            catelog: "加载中",
            items: [...loadingBarOptions],
          },
          {
            title: "初始状态",
            catelog: "加载失败",
            items: [...errorOptions],
          },
          {
            title: "状态条",
            catelog: "加载失败",
            items: [...errorBarOptions],
          },
          {
            title: "初始状态",
            catelog: "没有更多",
            items: [...emptyOptions],
          },
          {
            title: "状态条",
            catelog: "没有更多",
            items: [...emptyBarOptions],
          },
        ],
      },
      {},
      {
        title: "分页配置",
        items: [
          {
            title: "开启触底加载",
            type: "switch",
            value: {
              get({ data }) {
                return data.enableLoadMore;
              },
              set({ data }, value) {
                data.enableLoadMore = value;
              },
            },
          },
          {
            title: "起始页码",
            type: "Text",
            ifVisible: ({ data }) => {
              return data.enableLoadMore;
            },
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
            ifVisible: ({ data }) => {
              return data.enableLoadMore;
            },
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
            ifVisible: ({ data }) => {
              return data.enableLoadMore;
            },
            options: {
              outputId: "onScrollLoad",
            },
          },
        ],
      },
      {
        type: "editorRender",
        options: {
          render: (props) => {
            console.warn("~~~~~!!!!!!");
            console.warn(props.editConfig.value.get());
            return <div></div>;
          },
        },
        value: {
          get({ inputs, outputs }) {
            console.log("~~~~~~~~~~~~~~~~");
            if (!outputs.get("afterRefreshDataSource")) {
              outputs.add("afterRefreshDataSource", "覆盖数据后", {
                type: "any",
              });

              inputs
                .get("refreshDataSource")
                .setRels(["afterRefreshDataSource"]);
            }

            if (!outputs.get("afterAddDataSource")) {
              outputs.add("afterAddDataSource", "添加数据后", {
                type: "any",
              });

              inputs.get("addDataSource").setRels(["afterAddDataSource"]);
            }

            return "";
          },
        },
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

  ".mybricks-loading": {
    title: "加载中初始状态",
    items: [...loadingOptions],
    style: [
      {
        title: "样式",
        options: ["background"],
        target: ".mybricks-loading",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-loading-icon": {
    title: "提示图标",
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
    ],
    style: [
      {
        title: "样式",
        options: ["size", "margin"],
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
        options: ["font", "padding", "border", "background"],
        target: ".mybricks-loading-text",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-loadingBar": {
    title: "加载中状态条",
    items: [...loadingBarOptions],
    style: [
      {
        title: "样式",
        options: ["size", "font", "background"],
        target: ".mybricks-loadingBar",
        defaultOpen: true,
      },
    ],
  },

  ".mybricks-error": {
    title: "加载失败初始状态",
    items: [...errorOptions],
    style: [
      {
        title: "样式",
        options: ["background"],
        target: ".mybricks-error",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-error-icon": {
    title: "提示图标",
    items: [
      {
        title: "提示图标",
        type: "imageselector",
        value: {
          get({ data }) {
            return data.error.icon;
          },
          set({ data }, value) {
            data.error.icon = value;
          },
        },
      },
    ],
    style: [
      {
        title: "样式",
        options: ["size", "margin"],
        target: ".mybricks-error-icon",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-error-text": {
    title: "提示文案",
    items: [
      {
        title: "提示文案",
        type: "text",
        value: {
          get({ data }) {
            return data.error.text;
          },
          set({ data }, value) {
            data.error.text = value;
          },
        },
      },
    ],
    style: [
      {
        title: "样式",
        options: ["font", "padding", "border", "background"],
        target: ".mybricks-error-text",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-errorBar": {
    title: "加载失败状态条",
    items: [...errorBarOptions],
    style: [
      {
        title: "样式",
        options: ["size", "font", "background"],
        target: ".mybricks-errorBar",
        defaultOpen: true,
      },
    ],
  },

  ".mybricks-empty": {
    title: "没有更多初始状态",
    items: [...emptyOptions],
    style: [
      {
        title: "样式",
        options: ["background"],
        target: ".mybricks-empty",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-empty-icon": {
    title: "提示图标",
    items: [
      {
        title: "提示图标",
        type: "imageselector",
        value: {
          get({ data }) {
            console.warn(JSON.stringify(data.empty));
            console.warn(JSON.stringify(data.empty));
            console.warn(JSON.stringify(data.empty));

            return data.empty.icon;
          },
          set({ data }, value) {
            data.empty.icon = value;
          },
        },
      },
    ],
    style: [
      {
        title: "样式",
        options: ["size", "margin"],
        target: ".mybricks-empty-icon",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-empty-text": {
    title: "提示文案",
    items: [
      {
        title: "提示文案",
        type: "text",
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
    style: [
      {
        title: "样式",
        options: ["font", "padding", "border", "background"],
        target: ".mybricks-empty-text",
        defaultOpen: true,
      },
    ],
  },
  ".mybricks-emptyBar": {
    title: "没有更多状态条",
    items: [...emptyBarOptions],
    style: [
      {
        title: "样式",
        options: ["size", "font", "background"],
        target: ".mybricks-emptyBar",
        defaultOpen: true,
      },
    ],
  },
};
