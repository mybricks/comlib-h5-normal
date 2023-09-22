export default {
  ":root": [
    {
      title: "操作第几项（例如第一项就填1）",
      type: "text",
      value: {
        get({ data }) {
          return data.index;
        },
        set({ data }, value) {
          data.index = value;
        },
      },
    },
    {
      title: "红点内容",
      type: "text",
      value: {
        get({ data }) {
          return data.text;
        },
        set({ data }, value) {
          data.text = value;
        },
      },
    },
  ],
};
