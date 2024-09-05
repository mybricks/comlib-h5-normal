export default {
  title: "设置为首页",
  type: "switch",
  value: {
    get({ data }) {
      return data.asEntryPagePath;
    },
    set({ data }, value) {
      data.asEntryPagePath = value;
    },
  },
};
