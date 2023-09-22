export default {
  ":root": [
    {
      name: "复制的内容",
      type: "text",
      value: {
        get({ data }) {
          return data.text;
        },
        set({ data }, val) {
          data.text = val;
        }
      }
    }
  ],
};
