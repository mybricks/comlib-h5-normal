import { createDataFormatEditor, FormatType } from "./../utils/data-format";

export default {
  ":root": [
    ...createDataFormatEditor({
      title: "格式化",
      value: {
        get({ data, focusArea }) {
          return data.formatData;
        },
        set({ data, focusArea }, value) {

          console.warn(value)
          data.formatData = value;
        },
      },
      formatters: [
        {
          formatter: FormatType.NONE,
        },
        {
          formatter: FormatType.KEYMAP,
        },
        {
          formatter: FormatType.TIME_TEMPLATE,
        },
        {
          formatter: FormatType.TIME_CUSTOM,
        }
      ]
    }).items,
    // {
    //   title: "跳转页面",
    //   type: "text",
    //   value: {
    //     get({ data }) {
    //       return data.path;
    //     },
    //     set({ data }, value) {
    //       data.path = value;
    //     },
    //   },
    // },
    ,
  ],
};
