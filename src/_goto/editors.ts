export default {
  ":root": [
    {
      title: "跳转方式",
      type: "Select",
      options: [
        { value: "navigateTo", label: "新页面打开" },
        { value: "redirectTo", label: "重定向" },
      ],
      value: {
        get({ data }) {
          return data.action;
        },
        set({ data }, value) {
          data.action = value;
        },
      },
    },
  ],
};
