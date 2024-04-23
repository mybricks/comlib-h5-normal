import { createDataFormatEditor, FormatType } from "./../utils/data-format";
import css from "./style.less"

export default {
  ":root": [
    ...createDataFormatEditor({
      title: "格式化",
      value: {
        get({ data, focusArea }) {
          return data.formatData;
        },
        set({ data, focusArea }, value) {
          console.warn(value);
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
        },
      ],
    }).items,
    {
      title: "说明",
      type: "editorRender",
      options: {
        render: (props) => {
          return (
            <div className={css.text}>
              <div>字符格式化支持对以下数据进行格式化</div>
              <li>枚举值</li>
              <li>时间戳</li>
            </div>
          );
        },
      },
    },
    ,
  ],
};
