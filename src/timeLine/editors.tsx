export default {
  "@init"({ style }) {
    style.width = 375;
    style.height = "auto";
  },
  ":slot": {},
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "点样式",
        options: ["border", "background", "size"],
        target: "#mybricks-dot",
      },
      {
        title: "线样式",
        options: ["background", "size"],
        target: "#mybricks-line",
      },
    ],
    items: [
      {
        title: "时间线断线",
        description: "时间轴之间留白",
        type: "switch",
        value: {
          get({ data }) {
            return data.line_spacing;
          },
          set({ data }, value) {
            data.line_spacing = value;
          },
        },
      },
      {
        title: "内容间距",
        description: "每个时间轴内容的垂直间距",
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
        title:"无内容时显示none",
        description: "当时间轴为空时，显示无数据或者你自定义的插槽",
        type:"switch",
        value: {
          get({ data }) {
            return data.displaysEmptySpace;
          },
          set({ data }, value) {
            data.displaysEmptySpace = value;
          },
        }
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
    ],
  },
};
