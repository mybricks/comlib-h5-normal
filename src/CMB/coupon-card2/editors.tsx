export default {
  ":root": [
    {
      title: "文本配置",
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
    {
      title: "布尔配置",
      type: "switch",
      value: {
        get({ data }) {
          return data.switch;
        },
        set({ data }, value) {
          data.switch = value;
        },
      },
    },
    
  ],
};
