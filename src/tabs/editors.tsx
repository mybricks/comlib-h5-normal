import { uuid } from "../utils";
import { DynamicArrayData } from './../utils/dynamic-array'
import comJson from './com.json'

const ScopeSlotInputs = comJson.slots[0].inputs;
const dynamicArrayData = new DynamicArrayData({ keyName: 'tabs' });

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
  return data.tabs[index];
};

export default {
  "@init"({ style, data, ...opt }) {
    style.width = "100%";
    style.height = "auto";
  },
  ":root": {
    style: [
      {
        title: '标签项',
        items: [
          {
            title: '默认Tab',
            catelog: '默认',
            options: [
              { type: 'font', config: { disableTextAlign: true } },
              { type: 'size'},
              { type: 'border'},
              { type: 'padding' },
              { type: 'background' }
            ],
            target: '.taroify-tabs__tab:not(.taroify-tabs__tab--active)',
          },
          {
            title: '选中Tab',
            catelog: '选中',
            options: [
              { type: 'font', config: { disableTextAlign: true } },
              { type: 'size'},
              { type: 'border'},
              { type: 'padding' },
              { type: 'background' }
            ],
            target: '.taroify-tabs__tab--active',
          },
        ]
      },
      {
        title: '选中条',
        options: [
          'border',
          { type: 'background', config: { disableBackgroundImage: true } },
          { type: 'size', config: { disableWidth: false } }
        ],
        target: '.taroify-tabs__line'
      }
    ],
    items({ data, slot }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        // {
        //   title: "动态标签",
        //   type: "switch",
        //   value: {
        //     get({ data }) {
        //       return data.defaultTab;
        //     },
        //     set({ data }, value) {
        //       data.defaultTab = value;
        //     },
        //   },
        // },
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
        // {
        //   title: "标签项",
        //   type: "array",
        //   options: {
        //     selectable: true,
        //     getTitle: (item, index) => {
        //       return [`${item.tabName || ""}`];
        //     },
        //     onAdd() {
        //       let defaultItem = {
        //         tabName: "标签名",
        //       };
        //       return defaultItem;
        //     },
        //     onSelect(_id, index) {
        //       if (index !== -1) {
        //         data.edit.currentTabId = data.tabs[index]?._id;
        //       }
        //     },
        //     items: [
        //       {
        //         title: "标签名",
        //         type: "text",
        //         value: "tabName",
        //       },
        //       {
        //         title:"tab图标(可选)",
        //         type:"imageSelector",
        //         value:"tabPic"
        //       },
        //       {
        //         title:"tab图标-选中(可选)",
        //         type:"imageSelector",
        //         value:"tabPicActive"
        //       }
        //     ],
        //   },
        //   value: {
        //     get({ data }) {
        //       return data.tabs;
        //     },
        //     set({ data, slot }, value) {
        //       let action = computedAction({
        //         before: data.tabs,
        //         after: value,
        //       });
  
        //       switch (action?.name) {
        //         case "remove":
        //           slot.remove(action?.value._id);
        //           break;
        //         case "add":
        //           slot.add(action?.value._id);
        //           break;
        //         case "update":
        //           slot.setTitle(action?.value._id, action?.value.tabName);
        //           break;
        //       }
        //       data.tabs = value;
        //     },
        //   },
        // },
        dynamicArrayData.editors({ data }, {
          title: '标签项',
          array: {
            options: {
              selectable: true,
              getTitle: (item, index) => {
                return [`${item.tabName || ""}`];
              },
              onAdd() {
                let defaultItem = {
                  tabName: "标签名",
                };
                return defaultItem;
              },
              onSelect(_id, index) {
                if (index !== -1) {
                  data.edit.currentTabId = data.tabs[index]?._id;
                }
              },
              items: [
                {
                  title: "标签名",
                  type: "text",
                  value: "tabName",
                },
                // {
                //   title:"tab图标(可选)",
                //   type:"imageSelector",
                //   value:"tabPic"
                // },
                // {
                //   title:"tab图标-选中(可选)",
                //   type:"imageSelector",
                //   value:"tabPicActive"
                // }
              ],
            }
          },
          effects: {
            onRemove: ({ slot }, action) => {
              slot.remove(action?.value._id);
            },
            onAdd: ({ slot }, action) => {
              slot.add({ id: action?.value._id, title: action?.value.tabName, type: 'scope', inputs: ScopeSlotInputs })
            },
            onUpdate: ({ slot }, action) => {
              slot.setTitle(action?.value._id, action?.value.tabName);
            },
            onSwitchToDynamic: (datasource) => {
              // 增加动态插槽
              if (!slot.get('item')) {
                slot.add({ id: 'item', title: '内容项', type: 'scope', inputs: ScopeSlotInputs })
              }
              // 删除静态插槽
              datasource.forEach(item => {
                slot.remove(item._id);
              });
            },
            onSwitchToStatic: (datasource) => {
              // 增加静态插槽
              datasource.forEach(item => {
                if (!slot.get(item._id)) {
                  slot.add({ id: item._id, title: item.tabName, type: 'scope', inputs: ScopeSlotInputs })
                }
              });
              // 删除动态插槽
              slot.remove('item');
            }
            // onSwitchTo
          }
        }),
        {
          title: "支持滑动",
          type: "switch",
          value: {
            get({ data }) {
              return data.swipeable;
            },
            set({ data }, value) {
              data.swipeable = value;
            },
          },
        },
        {
          title: "隐藏内容",
          type: "switch",
          value: {
            get({ data }) {
              return data.hideContent;
            },
            set({ data }, value) {
              data.hideContent = value;
            },
          },
        },
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
        {
          title: "事件",
          items: [
            {
              title: "标签切换",
              type: "_event",
              options: {
                outputId: "changeTab",
              },
            },
            // {
            //   title: "初始化时触发一次「标签切换」事件",
            //   type: "switch",
            //   value: {
            //     get({ data }) {
            //       return data.initChangeTab;
            //     },
            //     set({ data }, value) {
            //       data.initChangeTab = value;
            //     },
            //   },
            // },
          ],
        },
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
  
  ".taroify-tabs__tab"(props, cate1, cate2, cate3) {
    // title: '标签',
    // items: (props, cate1, cate2, cate3) => {
    //   if (!props.focusArea) return;
    //   const focusItem = getFocusTab(props)
    //   cate1.title = '常规';
    //   cate1.items = [
    //     {
    //       title: '标签项',
    //       type: 'text',
    //       value: {
    //         get({ data, focusArea }) {
    //           return focusItem?.tabName
    //         },
    //         set({ data, focusArea, slot }, value) {
    //           if (!focusArea) return
    //           focusItem.tabName = value
    //           slot.setTitle(focusItem._id, value)
    //         },
    //       },
    //     },
    //     {
    //       title: '删除标签项',
    //       type: 'Button',
    //       value: {
    //         set({ data, slot, focusArea }) {
    //           if (!focusArea) return
    //           data.tabs.splice(focusArea.index, 1);
    //           // const _id = getFocusTab({ data, focusArea })?._id
    //           slot.remove(focusItem._id)
    //         },
    //       },
    //     },
    //     // {
    //     //   title: '独立样式配置',
    //     //   type: 'switch',
    //     //   value: {
    //     //     get({ data }) {
    //     //       return data.advancedNavItem
    //     //     },
    //     //     set({ data }, value) {
    //     //       data.advancedNavItem = value
    //     //     },
    //     //   },
    //     // },
    //     // {
    //     //   catelogChange: {},
    //     //   ifVisible({ data }) {
    //     //     return data.advancedNavItem
    //     //   },
    //     //   items: [
    //     //     {
    //     //       type: 'style',
    //     //       catelog: '默认样式',
    //     //       options: {
    //     //         defaultOpen: true,
    //     //         plugins: ['font', 'border', 'bgcolor', 'bgimage'],
    //     //       },
    //     //       value: {
    //     //         get({ data, focusArea }) {
    //     //           if (!focusArea) return
    //     //           const tabItem = getTabItem(data, focusArea)
    //     //           return tabItem.normalStyle
    //     //         },
    //     //         set({ data, focusArea }, value) {
    //     //           if (!focusArea) return
    //     //           const tabItem = getTabItem(data, focusArea)
    //     //           tabItem.normalStyle = {
    //     //             ...tabItem.normalStyle,
    //     //             ...value,
    //     //           }
    //     //         },
    //     //       },
    //     //     },
    //     //     {
    //     //       type: 'style',
    //     //       catelog: '选中样式',
    //     //       options: {
    //     //         defaultOpen: true,
    //     //         plugins: ['font', 'border', 'bgcolor', 'bgimage'],
    //     //       },
    //     //       value: {
    //     //         get({ data, focusArea }) {
    //     //           if (!focusArea) return
    //     //           const tabItem = getTabItem(data, focusArea)
    //     //           return tabItem.focusStyle
    //     //         },
    //     //         set({ data, focusArea }, value) {
    //     //           if (!focusArea) return
    //     //           const tabItem = getTabItem(data, focusArea)
    //     //           tabItem.focusStyle = {
    //     //             ...tabItem.focusStyle,
    //     //             ...value,
    //     //           }
    //     //         },
    //     //       },
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   type: "editorRender",
    //     //   options: {
    //     //     render: (props) => {
    //     //       props.editConfig.value.get();
    //     //       return (<></>);
    //     //     }
    //     //   },
    //     //   value: {
    //     //     get({ data, focusArea }) {
    //     //       if (!focusArea) return;
    //     //       console.error(focusArea)
    //     //       // data.selectedTabItemCatelog = "激活样式";
    //     //       // data.selectedTabItemIndex = focusArea.index;
    //     //     },
    //     //   },
    //     // },
    //   ]

    //   cate2.title = '样式';
    //   cate2.items = []

    //   cate3.title = '高级';
    //   cate3.items = []
    // }

    if (!props.focusArea) return;
    const focusItem = getFocusTab(props);

    cate1.title = "常规";
    cate1.items = [
      {
        title: "标签项",
        type: "text",
        value: {
          get({ data, focusArea }) {
            return focusItem?.tabName;
          },
          set({ data, focusArea, slot }, value) {
            if (!focusArea) return;
            focusItem.tabName = value;
            slot.setTitle(focusItem._id, value);
          },
        },
      },
      // {
      //   title: "使用独立样式配置",
      //   type: "switch",
      //   value: {
      //     get({ data }) {
      //       return focusItem?.useIndependentStyle;
      //     },
      //     set({ data, focusArea }, value) {
      //       if (!focusArea) return;
      //       focusItem.useIndependentStyle = value;
      //     },
      //   },
      // },

      // // 通用样式
      // {
      //   ifVisible({ data }) {
      //     return !focusItem?.useIndependentStyle;
      //   },
      //   catelogChange: {},
      //   items: [
      //     {
      //       type: "style",
      //       catelog: "默认样式",
      //       options: {
      //         defaultOpen: true,
      //         plugins: [
      //           "size",
      //           "padding",
      //           "font",
      //           "border",
      //           "bgcolor",
      //           "bgimage",
      //         ],
      //       },
      //       value: {
      //         get({ data, focusArea }) {
      //           return data.normalNavItemStyle;
      //         },
      //         set({ data, focusArea }, value) {
      //           data.normalNavItemStyle = value;
      //         },
      //       },
      //     },
      //     {
      //       type: "style",
      //       catelog: "激活样式",
      //       options: {
      //         defaultOpen: true,
      //         plugins: [
      //           "size",
      //           "padding",
      //           "font",
      //           "border",
      //           "bgcolor",
      //           "bgimage",
      //         ],
      //       },
      //       value: {
      //         get({ data, focusArea }) {
      //           return data.activeNavItemStyle;
      //         },
      //         set({ data, focusArea }, value) {
      //           data.activeNavItemStyle = value;
      //         },
      //       },
      //     },
      //   ],
      // },
      // // 独立样式
      // {
      //   ifVisible({ data }) {
      //     return focusItem?.useIndependentStyle;
      //   },
      //   catelogChange: {},
      //   items: [
      //     {
      //       type: "style",
      //       catelog: "默认样式",
      //       options: {
      //         defaultOpen: true,
      //         plugins: [
      //           "size",
      //           "padding",
      //           "font",
      //           "border",
      //           "bgcolor",
      //           "bgimage",
      //         ],
      //       },
      //       value: {
      //         get({ data, focusArea }) {
      //           return focusItem.normalNavItemStyle;
      //         },
      //         set({ data, focusArea }, value) {
      //           if (!focusArea) return;
      //           focusItem.normalNavItemStyle = value;
      //         },
      //       },
      //     },
      //     {
      //       type: "style",
      //       catelog: "激活样式",
      //       options: {
      //         defaultOpen: true,
      //         plugins: [
      //           "size",
      //           "padding",
      //           "font",
      //           "border",
      //           "bgcolor",
      //           "bgimage",
      //         ],
      //       },
      //       value: {
      //         get({ data, focusArea }) {
      //           return focusItem.activeNavItemStyle;
      //         },
      //         set({ data, focusArea }, value) {
      //           if (!focusArea) return;
      //           focusItem.activeNavItemStyle = value;
      //         },
      //       },
      //     },
      //   ],
      // },

      {
        items: [
          {
            title: "删除标签项",
            type: "Button",
            value: {
              set({ data, slot, focusArea }) {
                if (!focusArea) return;
                data.tabs.splice(focusArea.index, 1);
                slot.remove(focusItem._id);
              },
            },
          },
        ],
      },
      // {
      //   title: '独立样式配置',
      //   type: 'switch',
      //   value: {
      //     get({ data }) {
      //       return data.advancedNavItem
      //     },
      //     set({ data }, value) {
      //       data.advancedNavItem = value
      //     },
      //   },
      // },
      // {
      //   catelogChange: {},
      //   ifVisible({ data }) {
      //     return data.advancedNavItem
      //   },
      //   items: [
      //     {
      //       type: 'style',
      //       catelog: '默认样式',
      //       options: {
      //         defaultOpen: true,
      //         plugins: ['font', 'border', 'bgcolor', 'bgimage'],
      //       },
      //       value: {
      //         get({ data, focusArea }) {
      //           if (!focusArea) return
      //           const tabItem = getTabItem(data, focusArea)
      //           return tabItem.normalStyle
      //         },
      //         set({ data, focusArea }, value) {
      //           if (!focusArea) return
      //           const tabItem = getTabItem(data, focusArea)
      //           tabItem.normalStyle = {
      //             ...tabItem.normalStyle,
      //             ...value,
      //           }
      //         },
      //       },
      //     },
      //     {
      //       type: 'style',
      //       catelog: '选中样式',
      //       options: {
      //         defaultOpen: true,
      //         plugins: ['font', 'border', 'bgcolor', 'bgimage'],
      //       },
      //       value: {
      //         get({ data, focusArea }) {
      //           if (!focusArea) return
      //           const tabItem = getTabItem(data, focusArea)
      //           return tabItem.focusStyle
      //         },
      //         set({ data, focusArea }, value) {
      //           if (!focusArea) return
      //           const tabItem = getTabItem(data, focusArea)
      //           tabItem.focusStyle = {
      //             ...tabItem.focusStyle,
      //             ...value,
      //           }
      //         },
      //       },
      //     },
      //   ],
      // },
      // {
      //   type: "editorRender",
      //   options: {
      //     render: (props) => {
      //       props.editConfig.value.get();
      //       return (<></>);
      //     }
      //   },
      //   value: {
      //     get({ data, focusArea }) {
      //       if (!focusArea) return;
      //       console.error(focusArea)
      //       // data.selectedTabItemCatelog = "激活样式";
      //       // data.selectedTabItemIndex = focusArea.index;
      //     },
      //   },
      // },
    ];
  },
};
