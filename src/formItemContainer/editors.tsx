export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "fit-content";
  },
  "@resize": {
    options: ["width","height"],
  },
  ":slot": {},

  ":root": {
    items: ({ data, output, style }, cate0, cate1, cate2) => {},
  },
};
