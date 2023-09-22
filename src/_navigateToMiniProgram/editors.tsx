export default {
  ":root": [
    {
      title: "小程序链接",
      description: "链接可以通过【小程序菜单】->【复制链接】获取",
      type: "text",
      value: {
        get({ data }) {
          return data.shortLink;
        },
        set({ data }, value: string) {
          data.shortLink = value;
        },
      },
    },
  ],
};