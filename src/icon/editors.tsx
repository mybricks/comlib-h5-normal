import IconSelector from "../editors/iconSelector";

export default {
  "@init": ({ style, data }) => {
    style.width = "auto";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "图标",
        options: ["border", "padding", "background", "boxshadow", "margin"],
        target: ".mybricks-icon",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "图标设置",
          items: [
            {
              title: "图标",
              type: "editorRender",
              options: {
                render: (props) => {
                  return <IconSelector value={props.editConfig.value} />;
                },
              },
              value: {
                get({ data }) {
                  return data.icon;
                },
                set({ data }, value: string) {
                  data.icon = value;
                },
              },
            },
            {
              title: "大小",
              type: "inputnumber",
              options: [{ min: 1 }],
              value: {
                get({ data }) {
                  return [data.fontSize];
                },
                set({ data }, value: string) {
                  if (Array.isArray(value)) {
                    data.fontSize = value?.[0];
                  } else {
                    data.fontSize = value;
                  }
                },
              },
            },
            {
              title: "颜色",
              type: "colorpicker",
              value: {
                get({ data }) {
                  return data.fontColor;
                },
                set({ data }, value: string) {
                  data.fontColor = value;
                },
              },
            },
          ],
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
