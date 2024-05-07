export default {
  ":root": {
    items: [
      {
        type: "text",
      },
    ],
  },
  ".bbb": {
    items: ({ focusArea }, cate0, cate1, cate2) => {
      console.warn(focusArea);

      cate0.title = "常规";
      cate0.items = [
        {
          title: "文本",
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
      ];
    },
  },
};
