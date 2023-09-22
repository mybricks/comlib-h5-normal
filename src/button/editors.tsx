import { ButtonType } from "./constant";
import css from "./style.less";

export default {
  "@init"({ style, data }) {
    style.width = 70;
    style.height = 35;
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "按钮",
        options: ["font", "border", "background", "padding"],
        target: ".mybricks-button",
        initValue: {
          color: "white",
          fontWeight: "bold",
          backgroundColor: "#FA6400",
          textAlign: "center",
          fontSize: "15px",
          borderRadius: "5px",
          height: "35px",
          display: "flex",
          lineHeight: "35px",
        },
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "文字标题",
          type: "text",
          value: {
            get({ data }) {
              return data.text;
            },
            set({ data }, value: string) {
              data.text = value;
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "单击",
              type: "_event",
              options: {
                outputId: "onClick",
              },
            },
          ],
        },
      ];
    },
  },
};
