export default {
  "@init"({ style }) {
    style.height = "100%";
  },
  "@resize": {
    options: ["width"],
  },
  ":slot": {},
  ":root": {
    style: [],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [];
    },
  },
};
