export default {
  "@init"({ style }) {
    style.width = "fit-content";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    "@dblclick": {
      type: "text",
      value: {
        get({ data }) {
          return data.text;
        },
        set({ data }, val) {
          data.text = val;
        },
      },
    },
    style: [
      {
        title: "样式",
        options: ["font", "padding", "border", "background"],
        target: ".mybricks-text",
      },
      {
        title: "开启文本省略",
        type: "Switch",
        value: {
          get({ data }) {
            return data.ellipsis;
          },
          set({ data }, val: boolean) {
            data.ellipsis = val;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.ellipsis;
        },
        title: "最大行数",
        type: "InputNumber",
        options: [{ min: 1 }],
        value: {
          get({ data }) {
            return [data.maxLines];
          },
          set({ data }, val) {
            data.maxLines = val[0];
          },
        },
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "文本内容",
          type: "textarea",
          value: {
            get({ data }) {
              return data.text;
            },
            set({ data, setTitle }, value: string) {
              data.text = value;

              // if (value.length > 5) {
              //   setTitle(value.slice(0, 5) + "...");
              // } else {
              //   setTitle(value);
              // }
            },
          },
          // binding: {
          //   with: 'data.text',
          //   scheme: {
          //     type: 'string'
          //   }
          // }
        },
        // {
        //   title: "仅使用动态渲染",
        //   description:
        //     "开启后，页面默认不会渲染静态的「文本内容」，数据必须经过输入项「修改内容」来设置",
        //   type: "switch",
        //   value: {
        //     get({ data }) {
        //       return data.useDynamic;
        //     },
        //     set({ data }, val) {
        //       data.useDynamic = val;
        //     },
        //   },
        // },
        {
          title:"默认展示状态",
          type:"radio",
          description:"静态：原样显示文本；隐藏：在加载完成之前不显示任何内容；骨架：加载过程显示动效",
          options: [
            { label: "静态", value: "static" },
            { label: "隐藏", value: "hidden" },
            { label: "骨架", value: "skeleton" },
          ],
          value: {
            get({ data }) {
              return data.displayState || "static";
            },
            set({ data }, value: string) {
              data.displayState = value;
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
            {
              title: "长按",
              items: [
                {
                  type: "select",
                  options: [
                    { label: "无", value: "none" },
                    { label: "提示气泡框", value: "tooltip" },
                    { label: "自定义", value: "custom" },
                  ],
                  value: {
                    get({ data }) {
                      return data.useLongPress;
                    },
                    set({ data }, val) {
                      data.useLongPress = val;

                      if (val === "custom") {
                        output.add("onLongPress", "长按", { type: "string" });
                      } else {
                        output.remove("onLongPress");
                      }
                    },
                  },
                },
                {
                  ifVisible({ data }) {
                    return data.useLongPress === "custom";
                  },
                  title: "自定义事件",
                  type: "_event",
                  options: {
                    outputId: "onLongPress",
                  },
                },
              ],
            },
          ],
        },
      ];
    },
  },
};
