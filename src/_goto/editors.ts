export default {
  ":root": [
    {
      title: "跳转方式",
      type: "Select",
      options: [
        { value: "navigateTo", label: "新页面打开" },
        { value: "redirectTo", label: "重定向" },
        { value: "reLaunch", label: "关闭所有页面，打开到应用内的某个页面" },
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
