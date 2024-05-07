import comJson from "./com.json";
const ScopeSlotInputs = comJson.slots[2].inputs;
let defaultItem = {
  tabName: "未命名",
};

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

function computedAction({ before, after }) {
  let beforeIds = before.map((item) => item._id);
  let afterIds = after.map((item) => item._id);
  console.log("beforeLength", before.length, "afterLength", after.length);

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
        if (before[i].tabName !== after[i].tabName) {
          diffItem = after[i];
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
  "@init"({ style }) {
    style.width = "100%";
    style.height = "auto";
  },
  ":root"({ data }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "标签项",
        type: "array",
        options: {
          selectable: true,
          editable: false,
          getTitle: (item, index) => {
            return [`${item.tabName || "未命名"}`];
          },
          onAdd() {
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
            //   title: '附加内容',
            //   type: 'textarea',
            //   value: 'extra',
            // }
          ],
        },
        value: {
          get({ data }) {
            return data.tabs;
          },
          set({ data, slot }, value) {
            console.log("设置值", value);
            let action = computedAction({
              before: data.tabs,
              after: value,
            });

            switch (action?.name) {
              case "remove":
                slot.remove(action?.value._id);
                break;
              case "add":
                console.log("add", action?.value._id, action?.value.tabName);
                slot.add({
                  id: action?.value._id,
                  title: defaultItem.tabName,
                  type: "scope",
                  input: ScopeSlotInputs,
                });
                break;
              case "update":
                console.log("update", action?.value._id, action?.value.tabName);
                slot.setTitle(action?.value._id, action?.value.tabName);
                break;
            }

            data.tabs = value;
          },
        },
      },
      {
        title: "内容展示方式",
        type: "radio",
        description:
          "锚定显示：在同一个页面显示所有内容，点击后滚动到对应区域；切换显示：在不同页面显示对应的侧边栏内容",
        options: [
          { label: "锚定显示", value: "roll" },
          { label: "切换显示", value: "switch" },
        ],
        value: {
          get({ data }) {
            return data.contentShowType;
          },
          set({ data }, value) {
            data.contentShowType = value;
          },
        },
      },
      {
        title: "顶部插槽",
        type: "switch",
        description: "开启后，可在侧边栏顶部插入自定义内容（如搜索框）",
        value: {
          get({ data }) {
            return data.useTopSlot;
          },
          set({ data }, value) {
            data.useTopSlot = value;
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
        ],
      },
    ];

    cate1.title = "样式";
    cate1.items = [
      // {
      //   title: '位置',
      //   type: 'select',
      //   options: [
      //     { value: 'top', label: '上方' },
      //     { value: 'fixed-top', label: '上方+吸顶' },
      //     { value: 'bottom', label: '下方' },
      //   ],
      //   value: {
      //     get({ data }) {
      //       return data.position
      //     },
      //     set({ data }, value) {
      //       data.position = value
      //     },
      //   },
      // },
      // {
      //   title: '吸顶距离',
      //   type: 'Text',
      //   options: {
      //     type: 'number',
      //   },
      //   description: '距离顶部状态栏的高度',
      //   ifVisible({ data }) {
      //     return data.position === 'fixed-top'
      //   },
      //   value: {
      //     get({ data }) {
      //       return data.stickyOffset
      //     },
      //     set({ data }, value) {
      //       data.stickyOffset = Number(value)
      //     },
      //   },
      // },
      // {
      //   title: '禁用安全距离',
      //   type: 'switch',
      //   value: {
      //     get({ data }) {
      //       return data.disableSafeArea;
      //     },
      //     set({ data }, value) {
      //       data.disableSafeArea = value;
      //     },
      //   },
      // },
      {
        title: "tab背景设置",
        type: "style",
        options: {
          defaultOpen: true,
          plugins: ["border", "bgColor", "bgImage"],
        },
        value: {
          get({ data }) {
            return data.style;
          },
          set({ data }, value) {
            data.style = { ...value };
          },
        },
      },
    ];

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
  ".taroify-sidebar-tab": {
    title: "标签项",
    items: (props, cate1, cate2, cate3) => {
      if (!props.focusArea) return;
      const focusItem = getFocusTab(props);
      props.data.edit.currentTabId = focusItem._id;
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
        {
          title: "删除标签项",
          type: "Button",
          value: {
            set({ data, slot, focusArea }) {
              if (!focusArea) return;
              data.tabs.splice(focusArea.index, 1);
              // const _id = getFocusTab({ data, focusArea })?._id
              slot.remove(focusItem._id);
              data.edit.currentTabId = data.tabs[0]?._id;
            },
          },
        },
      ];
    },
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          const focusItem = getFocusTab(props);
          return focusItem?.tabName;
        },
        set(props, value) {
          const { data, focusArea, slot, output } = props;
          const focusItem = getFocusTab(props);
          if (!focusArea) return;
          focusItem.tabName = value;
          slot.setTitle(focusItem._id, value);
          output.setTitle(focusItem._id, value);
        },
      },
    },
  },

};
