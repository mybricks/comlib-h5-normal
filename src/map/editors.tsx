import GeoConfig from "./editor/geoConfig";

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = 300;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "样式",
        options: ["border", "background"],
        target: `.mybricks-map`,
      },
    ],
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = "地图";
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
          title: "基础属性",
          items: [
            {
              title: "展示比例尺",
              description: "开启后，地图上会展示比例尺",
              type: "switch",
              value: {
                get({ data }) {
                  return data.showScale;
                },
                set({ data }, val) {
                  data.showScale = val;
                },
              },
            },
            {
              title: "展示指南针",
              description: "开启后，地图上会展示指南针",
              type: "switch",
              value: {
                get({ data }) {
                  return data.showCompass;
                },
                set({ data }, val) {
                  data.showCompass = val;
                },
              },
            },
            {
              title: "支持缩放",
              description: "开启后，用户可以通过缩放地图来改变地图的缩放级别",
              type: "switch",
              value: {
                get({ data }) {
                  return data.enableZoom;
                },
                set({ data }, val) {
                  data.enableZoom = val;
                },
              },
            },
            {
              title: "支持拖动",
              description: "开启后，用户可以通过拖动地图来改变地图的中心位置",
              type: "switch",
              value: {
                get({ data }) {
                  return data.enableScroll;
                },
                set({ data }, val) {
                  data.enableScroll = val;
                },
              },
            },
          ],
        },
        {
          title: "高级属性",
          items: [
            {
              title: "展示实时路况",
              description: "开启后，地图上会展示实时路况",
              type: "switch",
              value: {
                get({ data }) {
                  return data.enableTraffic;
                },
                set({ data }, val) {
                  data.enableTraffic = val;
                },
              },
            },
          ],
        },

        // {
        //   title: "覆盖物配置",
        //   type: "editorRender",
        //   // description: '展示方式的区别主要在图片尺寸与配置尺寸对不齐的情况下起作用',
        //   options: {
        //     render: GeoConfig,
        //   },
        //   value: {
        //     get({ data, style }) {
        //       return data.geos;
        //     },
        //     set({}, value) {
        //       data.geos = value;
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
      // cate1.title = '动作'
      // cate1.items = [
      //   {
      //     title: '事件',
      //     items: [
      //       {
      //         title: '单击',
      //         type: '_event',
      //         options: {
      //           outputId: 'onClick',
      //         },
      //       },
      //     ],
      //   }
      // ]
    },
  },
};
