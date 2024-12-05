export default {
  ":root": [
    {
      title: "密钥",
      type: "text",
      value: {
        get({ data }) {
          return data.key;
        },
        set({ data }, value: boolean) {
          data.key = value;
        },
      },
    },
    {
      title: "偏移量",
      type: "text",
      value: {
        get({ data }) {
          return data.iv;
        },
        set({ data }, value: boolean) {
          data.iv = value;
        },
      },
    },
  ],
};
