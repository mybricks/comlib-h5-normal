export default {
  ":root": [
    {
      title: "模板ID",
      type: "textarea",
      options: {
        placeholder: '多个ID用英文逗号,分隔'
      },
      value: {
        get({ data }) {
          return data.tempIds.join(',');
        },
        set({ data }, value) {
          data.tempIds = value.split(',');
        },
      },
    },
  ],
};
