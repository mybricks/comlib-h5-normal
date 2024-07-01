export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":slot": {},

  ":root": {
    items: ({ data, output, style }, cate0, cate1, cate2) => {},
  },
};
