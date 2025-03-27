const getFocusSelected = (props) => {
  const { data, focusArea } = props;
  if (!focusArea) return {};
  const { index } = focusArea;
  return data.options[index];
};

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    // style.height = "auto";
  },
  ":slot": {},
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "容器",
        options: ["border", "background", "padding"],
        target: ".mybricks-checkList",
      },
      {
        title: "选项",
        items: [
          {
            title: "图文排列",
            type: "layout",
            options: {
              defaultDirection: ["column", "row"],
            },
            value: {
              get({ data }) {
                return data.itemLayoutStyle || {};
              },
              set({ data }, value) {
                data.itemLayoutStyle = value;
              },
            },
          },
          {
            title: "高度",
            description: "单位 px，如果设置为 0，则高度自适应",
            type: "text",
            options: {
              type: "number",
            },
            value: {
              get({ data }) {
                return data.itemHeight;
              },
              set({ data }, value) {
                data.itemHeight = value;
              },
            },
          },
          // {
          //   title: "图文排列方向",
          //   type: "radio",
          //   options: [
          //     { label: "上下排列", value: "vertical" },
          //     { label: "左右排列", value: "horizontal" },
          //   ],
          //   value: {
          //     get({ data }) {
          //       return data.itemLayout;
          //     },
          //     set({ data }, value) {
          //       data.itemLayout = value;
          //     },
          //   },
          // },
          {
            title: "选项卡",
            items: [
              {
                title: "选项卡",
                catelog: "默认",
                options: ["border", "padding", "background"],
                target: ".mybricks-item",
              },
              {
                title: "选项卡",
                catelog: "选中时",
                options: ["border", "padding", "background"],
                target: ".mybricks-item-selected",
              },
            ],
          },
          {
            title: "选项卡图标",
            options: ["size", "margin"],
            target() {
              return [
                ".mybricks-item .mybricks-icon",
                ".mybricks-item-selected .mybricks-icon",
              ];
            },
          },
          {
            title: "文字",
            items: [
              {
                title: "选项卡文本",
                catelog: "默认",
                options: ["font"],
                target: ".mybricks-text",
              },
              {
                title: "选项卡文本",
                catelog: "选中时",
                options: ["font"],
                target: ".mybricks-text-selected",
              },
            ],
          },
        ],
      },
    ],
    items({ data }, cate0, cate1, cate2) {
      cate0.title = "基础";
      cate0.items = [
        {
          title: "选项",
          type: "array",
          options: {
            getTitle: (item, index) => {
              return `选项：${item.label}`;
            },
            onAdd(_id) {
              return {
                label: `选项`,
                value: `选项${_id}`,
                icon: "",
                selectedIcon: "",
              };
            },
            items: [
              {
                title: "选项名",
                type: "text",
                value: "label",
              },
              {
                title: "选项值",
                type: "text",
                value: "value",
              },
              {
                title: "默认图标",
                type: "imageSelector",
                value: "icon",
              },
              {
                title: "选中图标",
                type: "imageSelector",
                value: "selectedIcon",
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
          title: "启用换行",
          type: "switch",
          value: {
            get({ data }) {
              return data.useWrap;
            },
            set({ data }, value) {
              data.useWrap = value;
            },
          },
        },
        {
          ifVisible({ data }) {
            return !data.useWrap;
          },
          title: "最小宽度",
          type: "inputnumber",
          options: [{ min: 75 }],
          value: {
            get({ data }) {
              return [data.itemMinWidth];
            },
            set({ data }, value) {
              data.itemMinWidth = value[0];
            },
          },
        },
        {
          ifVisible({ data }) {
            return data.useWrap;
          },
          title: "每行列数",
          type: "inputnumber",
          options: [{ min: 1 }],
          value: {
            get({ data }) {
              return [data.column];
            },
            set({ data }, value) {
              data.column = value[0];
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
              return data.gutter;
            },
            set({ data }, value: number[]) {
              data.gutter = value;
            },
          },
        },
        {
          title: "选择模式",
          type: "radio",
          options: [
            { label: "单选", value: false },
            { label: "多选", value: true },
          ],
          value: {
            get({ data }) {
              return data.useMultiple;
            },
            set({ data }, value) {
              data.useMultiple = value;
            },
          },
        },
        {
          ifVisible({ data }) {
            return data.defaultRenderMode !== "dynamic" && !data.useMultiple;
          },
          title: "默认选中项",
          type: "select",
          options: [
            {
              label: "无",
              value: "",
            },
          ].concat(
            data.options.map((item) => ({
              label: item.label,
              value: item.value,
            }))
          ),
          value: {
            get({ data }) {
              return data.defaultValue[0] ?? "";
            },
            set({ data }, value) {
              data.defaultValue = [value];
            },
          },
        },
        {
          ifVisible({ data }) {
            return data.defaultRenderMode !== "dynamic" && data.useMultiple;
          },
          title: "默认选中项",
          type: "select",
          options: {
            mode: "tags",
            multiple: true,
            options: [
              {
                label: "无",
                value: "",
              },
            ].concat(
              data.options.map((item) => ({
                label: item.label,
                value: item.value,
              }))
            ),
          },
          value: {
            get({ data }) {
              return data.defaultValue;
            },
            set({ data }, value) {
              data.defaultValue = value;
            },
          },
        },
        {},
        {
          title: "事件",
          items: [
            {
              title: "选中项变化",
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
  ".mybricks-items":{
    title: "选项",
    items:(props, cate1, cate2, cate3) => {
      if (!props.focusArea) return;
      const { data, focusArea } = props
      const focusItem = getFocusSelected(props);
      cate1.title = "常规";
      cate1.items = [
        {
          title: "选项名",
          type: "text",
          value: {
            get({ data, focusArea }) {
              // return focusItem?.tabName;
              return data.options[focusArea.dataset.index].label
            },
            set({ data, focusArea, slot, output }, value) {
              if (!focusArea) return;
              data.options[focusArea.dataset.index].label = value
              // slot.setTitle(focusItem._id, value);
              // output.setTitle("changeTab_" + focusItem._id, value);
            },
          },
        },
        {
          title: "选项值",
          type: "text",
          value: {
            get({ data, focusArea }) {
              return data.options[focusArea.dataset.index].value
            },
            set({ data, focusArea, slot, output }, value) {
              if (!focusArea) return;
              data.options[focusArea.dataset.index].value = value
              // slot.setTitle(focusItem._id, value);
              // output.setTitle("changeTab_" + focusItem._id, value);
            },
          },
        }
      ];
    },
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          const { data, index,focusArea } = props
          return data.options[focusArea.dataset.index].label
        },
        set(props, value) {
          const { data, index,focusArea } = props
          if (!focusArea) return;
          data.options[focusArea.dataset.index].label = value
        },
      },
    },
  },
};
