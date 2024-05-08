export default {
  "@init": ({ style, data }) => {
    style.width = 375;
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    "@dblclick": {
      type: "text",
      value: {
        get({ data, focusArea }) {
          return data.noticeText;
        },
        set({ data, focusArea, input }, value) {
          data.noticeText = value;
        },
      },
    },
    style: [
      {
        title: "样式",
        options: ["border", "background", "font"],
        target: `.taroify-notice-bar`,
      },
    ],
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        // {
        //   title: '图标',
        //   type: 'imageSelector',
        //   value: {
        //     get({ data }) {
        //       return data.noticeIcon
        //     },
        //     set({ data }, val) {
        //       data.noticeIcon = val
        //     }
        //   }
        // },
        {
          title: "内容",
          type: "text",
          value: {
            get({ data }) {
              return data.noticeText;
            },
            set({ data }, val) {
              data.noticeText = val;
            },
          },
        },
        {
          title: "是否滚动播放",
          type: "switch",
          value: {
            get({ data }) {
              return data.scrollable;
            },
            set({ data }, val) {
              data.scrollable = val;
              if (val) {
                data.wordwrap = false;
              }
            },
          },
        },
        {
          title: "是否多行展示",
          type: "switch",
          ifVisible({ data }: EditorResult<any>) {
            return !data?.scrollable;
          },
          value: {
            get({ data }) {
              return data.wordwrap;
            },
            set({ data }, val) {
              data.wordwrap = val;
            },
          },
        },
      ];
      // cate1.title = '样式'
      // cate1.items = [
      //   {
      //     title: '样式',
      //     type: 'Style',
      //     options: {
      //       plugins: ['border', 'bgColor', 'bgImage', 'font'],
      //     },
      //     value: {
      //       get({ data }) {
      //         return data.style
      //       },
      //       set({ data }, val) {
      //         data.style = {
      //           ...data.style,
      //           ...val,
      //         }
      //       },
      //     },
      //   },
      // ]
      cate1.title = "动作";
      cate1.items = [
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
  }
};
