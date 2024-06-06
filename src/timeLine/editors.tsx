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
        target: ".mybricks-dot",
      },
      {
        title: "线样式",
        options: ["border", "background", "size"],
        target: ".mybricks-line",
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
    ],
  },
};
