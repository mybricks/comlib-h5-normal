export default {
  "@init"({ data, style }) {
    style.width = "100%";
    style.height = "100%";
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "padding", "background"],
        target: ".mybricks-content",
      },
    ],
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "弹出位置",
          type: "Select",
          options: [
            { value: "center", label: "居中" },
            { value: "top", label: "顶部弹出" },
            { value: "bottom", label: "底部弹出" },
            { value: "left", label: "左侧弹出" },
            { value: "right", label: "右侧弹出" },
          ],
          value: {
            get({ data }) {
              return data.position;
            },
            set({ data }, val) {
              data.position = val;
            },
          },
        },
        {
          title: "点击蒙层关闭",
          type: "switch",
          value: {
            get({ data }) {
              return data.maskClose;
            },
            set({ data }, val) {
              data.maskClose = val;
            },
          },
        },
        // {
        //   title: "样式",
        //   type: "Style",
        //   options: {
        //     plugins: ["border", "bgColor", "bgImage"],
        //   },
        //   value: {
        //     get({ data }) {
        //       return data.contentStyle;
        //     },
        //     set({ data }, val) {
        //       data.contentStyle = {
        //         ...data.contentStyle,
        //         ...val,
        //       };
        //     },
        //   },
        // },
      ];
      // cate1.title = '样式'
      // cate1.items = [
      //   {
      //     title: '样式',
      //     type: 'Style',
      //     options: {
      //       plugins: ['border', 'bgColor', 'bgImage'],
      //     },
      //     value: {
      //       get({ data }) {
      //         return data.contentStyle
      //       },
      //       set({ data }, val) {
      //         data.contentStyle = {
      //           ...data.contentStyle,
      //           ...val,
      //         }
      //       },
      //     },
      //   },
      // ]
      // cate2.title = '高级'
      // cate2.items = [
      //   {
      //     title: '事件',
      //     items: [
      //       {
      //         title: '点击遮罩时',
      //         type: '_event',
      //         options: {
      //           outputId: 'onClickOverlay',
      //         },
      //       },
      //     ],
      //   }
      // ]
    },
  }
  // ".mybricks-content": {
  //   style: [
  //     {
  //       title: "样式",
  //       options: ["border", "padding", "background"],
  //       target: ".mybricks-content",
  //     },
  //   ],
  //   items: [
  //     {
  //       title: "弹出位置",
  //       type: "Select",
  //       options: [
  //         { value: "center", label: "居中" },
  //         { value: "top", label: "顶部弹出" },
  //         { value: "bottom", label: "底部弹出" },
  //         { value: "left", label: "左侧弹出" },
  //         { value: "right", label: "右侧弹出" },
  //       ],
  //       value: {
  //         get({ data }) {
  //           return data.position;
  //         },
  //         set({ data }, val) {
  //           data.position = val;
  //         },
  //       },
  //     },
  //   ],
  // },
};
