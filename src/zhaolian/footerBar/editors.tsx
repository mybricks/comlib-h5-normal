export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": [
    {
      title: "Logo",
      type: "imageSelector",
      value: {
        get({ data }) {
          return data.logo;
        },
        set({ data }, val: string) {
          data.logo = val;
        },
      },
    },
    {
      title: "标题",
      type: "text",
      value: {
        get({ data }) {
          return data.title;
        },
        set({ data }, val: string) {
          data.title = val;
        },
      },
    },
    {
      title: "提示",
      type: "text",
      value: {
        get({ data }) {
          return data.tips;
        },
        set({ data }, val: string) {
          data.tips = val;
        },
      },
    },
  ],
  ".mybricks-logo": {
    style: [
      {
        title: "",
        options: ["size"],
        target: ".mybricks-logo",
      },
    ],
  },
  ".mybricks-title": {
    style: [
      {
        title: "",
        options: ["font"],
        target: ".mybricks-title",
      },
    ],
  },
  ".mybricks-tips": {
    style: [
      {
        title: "",
        options: ["font", "border", "background", "padding"],
        target: ".mybricks-tips",
      },
    ],
  },
};
