export default {
  "@init": ({ style, data }) => {
    style.width = '100%';
    style.height = 98;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: '轮播',
        options: [
          'border'
        ],
        target: '.mybricks-swiper-wrapper'
      },
      {
        title: '默认指示器',
        options: [
          { type: 'background', config: { disableBackgroundImage: true } },
        ],
        target: '.mybricks-swiper-wrapper .indicator:not(.indicator-active)',
      },
      {
        title: '高亮指示器',
        options: [
          { type: 'background', config: { disableBackgroundImage: true } }
        ],
        target: '.mybricks-swiper-wrapper .indicator.indicator-active',
      },
    ],
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "轮播项",
          type: "array",
          options: {
            getTitle: (item, index) => {
              return [
                <div style={{ display: "flex", alignItems: "center" }}>
                  轮播图：
                  <img
                    style={{ display: "block", height: 30 }}
                    src={item.thumbnail}
                  />
                </div>,
              ];
            },
            selectable: true,
            onSelect: (_id, index) => {
              if (index !== -1) {
                if (!data?.edit) {
                  data?.edit = {}
                }
                data?.edit?.current = index
              }
            },
            onAdd() {
              return {
                thumbnail:
                  "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
                useCustomLink: false,
                customLink: "",
                scene: {},
              };
            },
            items: [
              {
                title: "图片",
                type: "imageSelector",
                value: "thumbnail",
              },
              {
                title: "使用自定义跳转链接",
                type: "switch",
                value: "useCustomLink",
              },
              {
                ifVisible(itemValue, editIndex) {
                  return itemValue?.useCustomLink;
                },
                title: "自定义跳转链接",
                type: "text",
                value: "customLink",
              },
              {
                ifVisible(itemValue, editIndex) {
                  return !itemValue?.useCustomLink;
                },
                title: "跳转场景",
                type: "_sceneSelect",
                value: "scene",
              },
            ],
          },
          value: {
            get({ data }) {
              return data.items;
            },
            set({ data }, value) {
              data.items = value;
            },
          },
        },
        {
          title: '播放设置',
          items: [
            {
              title: "自动播放",
              type: "switch",
              value: {
                get({ data }) {
                  return data.autoplay;
                },
                set({ data }, value) {
                  data.autoplay = value;
                },
              },
            },
            {
              title: "循环轮播",
              description: '滑动到最后一项后可以继续滑动到第一项',
              type: "switch",
              value: {
                get({ data }) {
                  return data.circular ?? true;
                },
                set({ data }, value) {
                  data.circular = value;
                },
              },
            },
            // {
            //   title: "动画时长(ms)",
            //   type: "text",
            //   value: {
            //     get({ data }) {
            //       return data.duration ?? 500;
            //     },
            //     set({ data }, value) {
            //       data.duration = value;
            //     },
            //   },
            // },
          ]
        },
        {
          title: '展示指示器',
          type: 'switch',
          value: {
            get({ data }) {
              return data.showIndicator ?? true;
            },
            set({ data }, value) {
              data.showIndicator = value;
            },
          }
        }
      ];
    }
  },
};
