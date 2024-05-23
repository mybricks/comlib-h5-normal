export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "background"],
        target: ".mybricks-table",
      },
    ],
  },
};
