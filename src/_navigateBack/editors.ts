export default {
  ":root": [
    {
      title: "返回的页面数",
      description: "如果 delta 大于现有页面数，则返回到首页",
      type: 'text',
      options: {
        type: 'number'
      },
      value: {
        get({ data }) {
          return data.delta;
        },
        set({ data }, value) {
          data.delta = value;
        },
      },
    },
  ],
};
