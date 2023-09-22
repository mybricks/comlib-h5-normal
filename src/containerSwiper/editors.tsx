function getTabItem(data, focusArea) {
  const tabId = focusArea.dataset.tabId;
  for (let item of data.tabList) {
    if (item.tabId === tabId) {
      return item;
    }
  }
  return {};
}

const getFocusTab = (props) => {
  const { data, focusArea } = props;
  if (!focusArea) return {};
  const { index } = focusArea;
  return data.items[index];
};

function computedAction({ before, after }) {
  let beforeIds = before.map((item) => item._id);
  let afterIds = after.map((item) => item._id);

  switch (true) {
    case before.length > after.length: {
      let diffId = beforeIds.filter((x) => !afterIds.includes(x))[0];
      let diffItem = before.filter((x) => diffId.includes(x._id))[0];
      return {
        name: "remove",
        value: diffItem,
      };
    }
    case before.length < after.length: {
      let diffId = afterIds.filter((x) => !beforeIds.includes(x))[0];
      let diffItem = after.filter((x) => diffId.includes(x._id))[0];
      return {
        name: "add",
        value: diffItem,
      };
    }

    case before.length === after.length: {
      let diffItem = null;

      for (let i = 0; i < before.length; i++) {
        if (before[i].title !== after[i].title) {
          diffItem = after[i];
          console.warn("diffItem", diffItem);
          break;
        }
      }

      return {
        name: "update",
        value: diffItem,
      };
    }
  }
}

export default {
  "@init": ({ style, data }) => {
    style.width = '100%';
    style.height = 114;

    // style.marginTop = 12;
    // style.marginBottom = 12;
    // style.marginLeft = 12;
    // style.marginRight = 12;
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
    items({ data }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        // {
        //   title: '模式',
        //   type: 'select',
        //   options: [
        //     { label: '顶部导航', value: 'topbar' },
        //     { label: '侧边导航', value: 'sidebar' },
        //   ],
        //   value: {
        //     get({ data }) {
        //       return data.mode
        //     },
        //     set({ data }, value) {
        //       data.mode = value
        //     },
        //   },
        // },
        {
          title: "轮播项",
          type: "array",
          options: {
            selectable: true,
            editable: false,
            getTitle: (item, index) => {
              return [`${item.title || ""}`];
            },
            onAdd() {
              let defaultItem = {
                title: "轮播项",
              };
              return defaultItem;
            },
            onSelect(_id, index) {
              if (index !== -1) {
                if (!data.edit) {
                  data.edit = {}
                }
                data.edit.currentTabId = data.items[index]?._id;
              }
            },
            items: [
              {
                title: "名称",
                type: "text",
                value: "title",
              },
            ],
          },
          value: {
            get({ data }) {
              return data.items;
            },
            set({ data, slot }, value) {
              let action = computedAction({
                before: data.items,
                after: value,
              });
  
              switch (action?.name) {
                case "remove":
                  slot.remove(action?.value._id);
                  break;
                case "add":
                  slot.add(action?.value._id);
                  break;
                case "update":
                  slot.setTitle(action?.value._id, action?.value.title);
                  break;
              }
  
              data.items = value;
            },
          },
        },
        {
          title: '轮播设置',
          items: [
            {
              title: "循环轮播",
              description: '滑动到最后一项后可以继续滑动到第一项',
              type: "switch",
              value: {
                get({ data }) {
                  return data.circular ?? false;
                },
                set({ data }, value) {
                  data.circular = value;
                },
              },
            },
            // {
            //   title: "自动播放",
            //   type: "switch",
            //   value: {
            //     get({ data }) {
            //       return data.autoplay;
            //     },
            //     set({ data }, value) {
            //       data.autoplay = value;
            //     },
            //   },
            // },
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
        // {
        //   title: '内容最小高度（0表示不限制高度）',
        //   type: 'text',
        //   options: {
        //     type: 'number',
        //   },
        //   value: {
        //     get({ data }) {
        //       return data.contentMinHeight
        //     },
        //     set({ data }, value) {
        //       data.contentMinHeight = value
        //     },
        //   },
        // },
        // {
        //   title: "事件",
        //   items: [
        //     {
        //       title: "标签切换",
        //       type: "_event",
        //       options: {
        //         outputId: "changeTab",
        //       },
        //     },
        //     {
        //       title: "初始化时触发一次「标签切换」事件",
        //       type: "switch",
        //       value: {
        //         get({ data }) {
        //           return data.initChangeTab;
        //         },
        //         set({ data }, value) {
        //           data.initChangeTab = value;
        //         },
        //       },
        //     },
        //   ],
        // },
      ];
  
      // cate1.title = "样式";
      // cate1.items = [
      //   // {
      //   //   title: '位置',
      //   //   type: 'select',
      //   //   options: [
      //   //     { value: 'top', label: '上方' },
      //   //     { value: 'fixed-top', label: '上方+吸顶' },
      //   //     { value: 'bottom', label: '下方' },
      //   //   ],
      //   //   value: {
      //   //     get({ data }) {
      //   //       return data.position
      //   //     },
      //   //     set({ data }, value) {
      //   //       data.position = value
      //   //     },
      //   //   },
      //   // },
      //   // {
      //   //   title: '吸顶距离',
      //   //   type: 'Text',
      //   //   options: {
      //   //     type: 'number',
      //   //   },
      //   //   description: '距离顶部状态栏的高度',
      //   //   ifVisible({ data }) {
      //   //     return data.position === 'fixed-top'
      //   //   },
      //   //   value: {
      //   //     get({ data }) {
      //   //       return data.stickyOffset
      //   //     },
      //   //     set({ data }, value) {
      //   //       data.stickyOffset = Number(value)
      //   //     },
      //   //   },
      //   // },
      //   // {
      //   //   title: '禁用安全距离',
      //   //   type: 'switch',
      //   //   value: {
      //   //     get({ data }) {
      //   //       return data.disableSafeArea;
      //   //     },
      //   //     set({ data }, value) {
      //   //       data.disableSafeArea = value;
      //   //     },
      //   //   },
      //   // },
      //   {
      //     title: "tab背景设置",
      //     type: "style",
      //     options: {
      //       defaultOpen: true,
      //       plugins: ["border", "bgColor", "bgImage"],
      //     },
      //     value: {
      //       get({ data }) {
      //         return data.style;
      //       },
      //       set({ data }, value) {
      //         data.style = { ...value };
      //       },
      //     },
      //   },
      // ];
  
      // cate2.title = '标签栏'
      // cate2.items = [
      //   {
      //     title: '类型',
      //     type: 'select',
      //     options: [
      //       { value: 'fixed-width', label: '定宽' },
      //       { value: 'stretch', label: '拉伸' },
      //       { value: 'fit-content', label: '适用内容' },
      //     ],
      //     value: {
      //       get({ data }) {
      //         return data.type
      //       },
      //       set({ data }, value) {
      //         data.type = value
      //       },
      //     },
      //   },
      //   // {
      //   //   title: '换行',
      //   //   type: 'switch',
      //   //   value: {
      //   //     get({ data }) {
      //   //       return data.wrap;
      //   //     },
      //   //     set({ data }, value) {
      //   //       data.wrap = value;
      //   //     },
      //   //   },
      //   // },
      //   {
      //     type: 'style',
      //     options: {
      //       defaultOpen: true,
      //       plugins: ['bgcolor'],
      //     },
      //     value: {
      //       get({ data, focusArea }) {
      //         return data.navBarListStyle
      //       },
      //       set({ data }, value) {
      //         data.navBarListStyle = {
      //           ...data.navBarListStyle,
      //           ...value,
      //         }
      //       },
      //     },
      //   },
      //   {
      //     title: '对齐',
      //     type: 'iconradio',
      //     ifVisible: ({ data }) => {
      //       return data.type !== 'stretch'
      //     },
      //     options: [
      //       {
      //         label: '左对齐',
      //         value: 'left',
      //         url: 'https://ali2.a.kwimgs.com/kos/nlav11092/left.d8013936e3ef47ea.png',
      //       },
      //       {
      //         label: '居中',
      //         value: 'center',
      //         url: 'https://ali2.a.kwimgs.com/kos/nlav11092/col-center.a994ba179331542e.png',
      //       },
      //       {
      //         label: '右对齐',
      //         value: 'right',
      //         url: 'https://ali2.a.kwimgs.com/kos/nlav11092/right.5f9b94f3690a5eaf.png',
      //       },
      //     ],
      //     value: {
      //       get({ data, slot }) {
      //         return data.navBarListStyle.justifyContent || 'left'
      //       },
      //       set({ data, slot }, value) {
      //         data.navBarListStyle = {
      //           ...data.navBarListStyle,
      //           justifyContent: value,
      //         }
      //       },
      //     },
      //   },
      //   {
      //     title: '内间距',
      //     type: 'styleProperties',
      //     options: {
      //       plugins: ['padding'],
      //     },
      //     value: {
      //       get({ data }) {
      //         return data.navBarListStyle || {}
      //       },
      //       set({ data }, value) {
      //         console.log('style2 value', value)
      //         data.navBarListStyle = { ...data.navBarListStyle, ...value }
      //       },
      //     },
      //   },
      //   {
      //     title: '标签项',
      //     items: [
      //       {
      //         title: '左右内间距',
      //         type: 'text',
      //         option: {
      //           type: 'number',
      //         },
      //         ifVisible({ data }) {
      //           return data.type === 'fit-content'
      //         },
      //         value: {
      //           get({ data }) {
      //             const style = data.normalNavItemStyle
      //             return style.paddingLeft ? parseInt(style.paddingLeft) : 0
      //           },
      //           set({ data }, value) {
      //             data.normalNavItemStyle = {
      //               ...data.normalNavItemStyle,
      //               paddingLeft: value + 'px',
      //               paddingRight: value + 'px',
      //             }
      //           },
      //         },
      //       },
      //       {
      //         title: '宽',
      //         type: 'text',
      //         option: {
      //           type: 'number',
      //         },
      //         ifVisible({ data }) {
      //           return data.type !== 'fit-content'
      //         },
      //         value: {
      //           get({ data }) {
      //             const style = data.normalNavItemStyle
      //             return style.width ? parseInt(style.width) : 0
      //           },
      //           set({ data }, value) {
      //             data.normalNavItemStyle = {
      //               ...data.normalNavItemStyle,
      //               width: value + 'px',
      //             }
      //           },
      //         },
      //       },
      //       {
      //         title: '高',
      //         type: 'text',
      //         option: {
      //           type: 'number',
      //         },
      //         value: {
      //           get({ data }) {
      //             const style = data.normalNavItemStyle
      //             return style.height ? parseInt(style.height) : 0
      //           },
      //           set({ data }, value) {
      //             data.normalNavItemStyle = {
      //               ...data.normalNavItemStyle,
      //               height: value + 'px',
      //             }
      //           },
      //         },
      //       },
      //       {
      //         title: '间隔',
      //         type: 'text',
      //         options: { type: 'number' },
      //         value: {
      //           get({ data }) {
      //             return data.navBarGutter
      //           },
      //           set({ data }, value) {
      //             data.navBarGutter = value
      //           },
      //         },
      //       },
      //       {
      //         catelogChange: {},
      //         items: [
      //           {
      //             type: 'style',
      //             catelog: '默认样式',
      //             options: {
      //               defaultOpen: true,
      //               plugins: ['font', 'border', 'bgcolor', 'bgimage'],
      //             },
      //             value: {
      //               get({ data, focusArea }) {
      //                 return data.normalNavItemStyle
      //               },
      //               set({ data }, value) {
      //                 data.normalNavItemStyle = {
      //                   ...data.normalNavItemStyle,
      //                   ...value,
      //                 }
      //               },
      //             },
      //           },
      //           {
      //             type: 'style',
      //             catelog: '选中样式',
      //             options: {
      //               defaultOpen: true,
      //               plugins: ['font', 'border', 'bgcolor', 'bgimage'],
      //             },
      //             value: {
      //               get({ data }) {
      //                 return data.focusNavItemStyle
      //               },
      //               set({ data }, value) {
      //                 data.focusNavItemStyle = {
      //                   ...data.focusNavItemStyle,
      //                   ...value,
      //                 }
      //               },
      //             },
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ]
    },
  },
};
