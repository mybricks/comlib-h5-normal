export default {
  "@init"({ data, isAutoRun }) {
    if (isAutoRun()) {
      data.runImmediate = true;
    }
  },
  ":root"({}, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [];
  },
};
