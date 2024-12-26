export default {
  "@init"({ style }) {
    style.width = 200;
    style.height = 50;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "background"],
        target: ".mybricks-container",
      },
    ],
    items: [],
  },
};
