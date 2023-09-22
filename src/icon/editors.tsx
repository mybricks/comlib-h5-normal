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
        title: "标签",
        options: ["font", "background"],
        target: ".mybricks-icon-label",
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
              description: "设置徽标内容时请注意为组件设置合适的尺寸",
              type: "editorRender",
              options: {
                render: (props) => {
                  return <IconSelector value={props.editConfig.value}  />;
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
          ],
        },
        {
          title: "徽标设置",
          items: [
            {
              title: "徽标内容",
              type: "text",
              description: "设置徽标内容时请注意为组件设置合适的尺寸",
              value: {
                get({ data }) {
                  return data.badgeContent;
                },
                set({ data }, value: string) {
                  data.badgeContent = value;
                },
              },
            },
          ],
        },
        {
          title: "标签设置",
          items: [
            {
              title: "展示标签",
              type: "switch",
              value: {
                get({ data }) {
                  return data.useLabel;
                },
                set({ data }, value: boolean) {
                  data.useLabel = value;
                },
              },
            },
            {
              title: "标签文案",
              type: "text",
              ifVisible({ data }: any) {
                return data.useLabel;
              },
              value: {
                get({ data }) {
                  return data.labelContent;
                },
                set({ data }, value: string) {
                  data.labelContent = value;
                },
              },
            },
            // {
            //   title: "标签样式",
            //   type: "style",
            //   options: {
            //     defaultOpen: true,
            //     plugins: ["font", "bgColor"],
            //   },
            //   value: {
            //     get: ({ data }) => {
            //       return data.labelStyle;
            //     },
            //     set: ({ data }, value) => {
            //       data.labelStyle = { ...data.labelStyle, ...value };
            //     },
            //   },
            // },
          ],
        },
      ];
  
      cate1.title = "样式";
      cate1.items = [];
  
      cate2.title = "动作";
      cate2.items = [
        {
          title: "单击",
          type: "_event",
          options: {
            outputId: "onClick",
          },
        },
        {
          title: "点击时自动清空徽标内容",
          type: "switch",
          value: {
            get({ data }) {
              return data.autoClearBadgeWhenClick;
            },
            set({ data }, value: boolean) {
              data.autoClearBadgeWhenClick = value;
            },
          },
        },
      ];
    },
  }
  
};
