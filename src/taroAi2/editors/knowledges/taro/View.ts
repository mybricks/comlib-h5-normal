export default {
  description: `组件`,
  editors: {
    ":root": {
      title: "容器",
      items: [
        {
          title: "样式",
          type: "style",
          options: ["background", "font", "border", "padding", "margin"],
        },
      ],
    },
  },
  docs: require("./View.md").default,
};
