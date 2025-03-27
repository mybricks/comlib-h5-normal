export default {
  "@init"({ style }) {
    style.height = "100%";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        items: [
          {
            title: "默认样式",
            catelog: "默认样式",
            options: [
              { type: "font" },
              { type: "size" },
              { type: "border" },
              { type: "padding" },
              { type: "background" },
            ],
            target: ".mbs-filter_sort",
          },
          {
            title: "选中样式",
            catelog: "选中样式",
            options: [
              { type: "font" },
              { type: "size" },
              { type: "border" },
              { type: "padding" },
              { type: "background" },
            ],
            target: ".mbs-filter_sort--active",
          },
        ],
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        // {
        //   title: "标题",
        //   type: "text",
        //   value: {
        //     get({ data }) {
        //       return data.label;
        //     },
        //     set({ data }, value) {
        //       if (data.label === data.name) {
        //         data.label = value;
        //         data.name = value;
        //       } else {
        //         data.label = value;
        //       }
        //     },
        //   },
        // },
        // {
        //   title: "隐藏标题",
        //   type: "switch",
        //   value: {
        //     get({ data }) {
        //       return data.hideLabel;
        //     },
        //     set({ data }, value) {
        //       data.hideLabel = value;
        //     },
        //   },
        // },
        {
          title: "排序模式",
          type: "select",
          options: {
            mode: "multiple",
            options: [
              {
                label: "升序",
                value: "asc"
              },
              {
                label: "降序",
                value: "desc",
              },
            ],
          },
          value: {
            get({ data }) {
              return data.modes ?? [];
            },
            set({ data }, value) {
              // if (!value.length) {
              //   window.antd?.message?.error('至少保留一项排序项')
              //   return
              // }
              data.modes = value
            },
          },
        },
        {
          title: "兜底文案",
          type: "text",
          value: {
            get({ data }) {
              return data.optionMap?.none?.label;
            },
            set({ data }, value) {
              if (!data.optionMap) {
                data.optionMap = {
                  none: {}
                };
              }
              data.optionMap.none.label = value
            },
          },
        },
        {
          title: "升序状态",
          ifVisible({ data }: EditorResult<Data>) {
            return data.modes?.includes('asc');
          },
          items: [
            {
              title: "值",
              type: "text",
              value: {
                get({ data }) {
                  return data.optionMap?.asc?.value;
                },
                set({ data }, value) {
                  if (!data.optionMap) {
                    data.optionMap = {
                      asc: {}
                    };
                  }
                  data.optionMap.asc.value = value
                },
              },
            },
            {
              title: "文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.optionMap?.asc?.label;
                },
                set({ data }, value) {
                  if (!data.optionMap) {
                    data.optionMap = {
                      asc: {}
                    };
                  }
                  data.optionMap.asc.label = value
                },
              },
            },
          ],
        },
        {
          title: "降序状态",
          ifVisible({ data }: EditorResult<Data>) {
            return data.modes?.includes('desc');
          },
          items: [
            {
              title: "值",
              type: "text",
              
              value: {
                get({ data }) {
                  return data.optionMap?.desc?.value;
                },
                set({ data }, value) {
                  if (!data.optionMap) {
                    data.optionMap = {
                      desc: {}
                    };
                  }
                  data.optionMap.desc.value = value
                },
              },
            },
            {
              title: "文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.optionMap?.desc?.label;
                },
                set({ data }, value) {
                  if (!data.optionMap) {
                    data.optionMap = {
                      desc: {}
                    };
                  }
                  data.optionMap.desc.label = value
                },
              },
            },
          ],
        }
      ];
    },
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          return props.data?.optionMap?.none?.label
        },
        set({ data }, val: string) {
          data.optionMap.none.label = val;
        },
      },
    },
  },
};
