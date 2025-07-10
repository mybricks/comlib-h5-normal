import { uuid } from "../utils";
import { DynamicArrayData } from "./../utils/dynamic-array";
import comJson from "./com.json";

const ScopeSlotInputs = comJson.slots[0].inputs;
const dynamicArrayData = new DynamicArrayData({ keyName: "tabs" });

function getTabItem(data, focusArea) {
  const tabId = focusArea.dataset.tabId;
  for (let item of data.tabList) {
    if (item.tabId === tabId) {
      return item;
    }
  }
  return {};
}

function findItemByInnerId(_id, data) {
  return data.tabs.find((t) => t._id === _id) ?? {};
}

const getFocusTab = (props) => {
  const { data, focusArea } = props;
  if (!focusArea) return {};
  const { index } = focusArea;
  return data.tabs[index];
};

export default {
  "@init"({ style, data, ...opt }) {
    style.width = 375;
    style.height = 200;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":slot": {},
  ":root": {
    style: [
      {
        title: "Tabs",
        options: [
          { type: "background", config: { disableBackgroundImage: true } },
        ],
        target: ".mybricks-tabs",
      },
      {
        title: "标签栏",
        options: [
          "border",
          "padding",
          { type: "background", config: { disableBackgroundImage: true } },
        ],
        target: ".taroify-tabs__wrap .taroify-tabs__wrap__scroll",
      },
      {
        title: "标签项",
        items: [
          {
            title: "宽度",
            type: "select",
            options: [
              { label: "拉伸铺满", value: "fill" },
              { label: "适应内容", value: "fit" },
            ],
            value: {
              get({ data }) {
                return data.tabWidthType ?? "fill";
              },
              set({ data }, value) {
                data.tabWidthType = value;
              },
            },
          },
          {
            title: "标签项间距",
            type: "InputNumber",
            options: [{ min: 0 }],
            ifVisible({ data }) {
              return data.tabWidthType == "fit";
            },
            value: {
              get({ data }) {
                return [data.tabItemGap];
              },
              set({ data }, value) {
                data.tabItemGap = value[0];
              },
            },
          },
          {
            title: "样式",
            items: [
              {
                title: "默认样式",
                catelog: "默认样式",
                options: [
                  { type: "font", config: { disableTextAlign: true } },
                  { type: "size" },
                  { type: "border" },
                  { type: "padding" },
                  { type: "background" },
                ],
                target: ".taroify-tabs__tab:not(.taroify-tabs__tab--active)",
              },
              {
                title: "选中样式",
                catelog: "选中样式",
                options: [
                  { type: "font", config: { disableTextAlign: true } },
                  { type: "size" },
                  { type: "border" },
                  { type: "padding" },
                  { type: "background" },
                ],
                target: ".taroify-tabs__tab--active",
              },
            ],
          },
        ],
      },
      {
        title: "选中条",
        options: [
          "border",
          { type: "background", config: { disableBackgroundImage: true } },
          { type: "size", config: { disableWidth: false } },
        ],
        target: ".taroify-tabs__line",
      },
    ],
    items({ data, input, slots, outputs }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
        dynamicArrayData.editors(
          { data },
          {
            title: "标签项",
            array: {
              options: {
                selectable: true,
                getTitle: (item, index) => {
                  return [`${item.tabName || ""}`];
                },
                onAdd() {
                  const id = `tab_${uuid("", 5)}`;
                  const title = `标签项${data.new_index++}`;

                  let defaultItem = {
                    tabId: id,
                    tabName: title,
                  };

                  return defaultItem;
                },
                onSelect(_id, index) {
                  if (index !== -1) {
                    data.edit.currentTabId = data.tabs[index]?._id;
                  }
                },
                onRemove(_id) {
                  const item = findItemByInnerId(_id, data);
                  input.remove(_id);
                  outputs.remove(`changeTab_${item._id}`);
                  // slots.remove(_id);

                  // if (id === data.defaultActiveId) {
                  //   data.defaultActiveId = undefined;
                  // }
                },
                draggable: false,
                items: [
                  {
                    title: "标签项",
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
              },
            },
            effects: {
              // onRemove: ({ slot }, action) => {
              //   console.log("effects-onRemove")
              //   // slot.remove(action?.value._id);
              // },
              onAdd: ({ slot }, action) => {
                //添加输入连线
                input.add({
                  id: action?.value._id,
                  title: `切换到 ${action?.value.tabName}`,
                  schema: {
                    type: "any",
                  },
                  rels: ["changeDone"],
                });

                input.get(action?.value._id).setRels(["changeDone"]);

                slot.add({
                  id: action?.value._id,
                  title: action?.value.tabName,
                });

                outputs.add({
                  id: `changeTab_${action?.value._id}`,
                  title: action?.value.tabName,
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      tabName: {
                        type: "string",
                      },
                      index: {
                        type: "number",
                      },
                    },
                  },
                });
              },
              onUpdate: ({ slot }, action) => {
                slot.setTitle(action?.value._id, action?.value.tabName);

                outputs.setTitle(
                  `changeTab_${action?.value._id}`,
                  action?.value.tabName
                );
              },
              onSwitchToDynamic: (datasource) => {
                // 增加动态插槽
                if (!slot.get("item")) {
                  slot.add({
                    id: "item",
                    title: "内容项",
                    type: "scope",
                    inputs: ScopeSlotInputs,
                  });
                }
                // 删除静态插槽
                datasource.forEach((item) => {
                  slot.remove(item._id);
                });
              },
              onSwitchToStatic: (datasource) => {
                // 增加静态插槽
                datasource.forEach((item) => {
                  if (!slot.get(item._id)) {
                    slot.add({
                      id: item._id,
                      title: item.tabName,
                      type: "scope",
                      inputs: ScopeSlotInputs,
                    });
                  }
                });
                // 删除动态插槽
                slot.remove("item");
              },
              // onSwitchTo
            },
          }
        ),
        {
          title: "动态标签",
          type: "switch",
          description: "开启后，可通过连线动态配置左侧的选项列表",
          value: {
            get({ data, slot }) {
              console.log("data.useDynamicTab", data.useDynamicTab);
              if (!data.useDynamicTab) {
                try {
                  slot.remove("tabItem");
                } catch (e) {}
              }
              return data.useDynamicTab;
            },
            set({ data, slot }, value) {
              data.useDynamicTab = value;
              //当动态标签开启时，把目前的全部slot存起来，后面可以还原
              if (value) {
                data.slotStorage = data.tabs.map((item) => {
                  slot.remove(item._id);
                  return {
                    id: item._id,
                    title: item.tabName,
                  };
                });
                slot.add(comJson.slots[0]);
              } else {
                //动态标签页关闭时，还原存储的slot
                data.slotStorage.forEach((item) => {
                  slot.add(item);
                });
                slot.remove("tabItem");
                data.slotStorage = [];
              }
            },
          },
        },
        // {
        //   title: "支持滑动",
        //   type: "switch",
        //   value: {
        //     get({ data }) {
        //       return data.swipeable;
        //     },
        //     set({ data }, value) {
        //       data.swipeable = value;
        //     },
        //   },
        // },
        {
          title: "吸顶",
          type: "switch",
          description:
            "当tabs上滑到页面顶部时触发吸顶，tabs内容完全离开屏幕时吸顶会自动取消",
          ifVisible({ data }) {
            return !data.hideContent;
          },
          value: {
            get({ data }) {
              return data.sticky;
            },
            set({ data }, value) {
              data.sticky = value;
            },
          },
        },
        {
          title: "隐藏内容",
          type: "switch",
          description: "开启后tab内容项不展示",
          value: {
            get({data}){
              return data.hideContent
            },
            set({ data }, value) {
              data.hideContent = value
            }
          }
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
        {},
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
            {
              title: "初始化时是否触发「标签切换」事件",
              type: "switch",
              value: {
                get({ data }) {
                  return data.initChangeTab;
                },
                set({ data }, value) {
                  data.initChangeTab = value;
                },
              },
            },
          ],
        },
      ];

      cate1.title = "高级";
      cate1.items = [
        // {
        //   title: "升级",
        //   type: "button",
        //   value: {
        //     set({ data, slots }) {
        //       console.log("升级", slots.get("tabId1"));
        //       console.log("升级", slots.get("tabId2"));

        //       slots.get("tabId1").setLayout("flex-column");
        //       slots.get("tabId2").setLayout("flex-column");
        //     },
        //   },
        // },
      ];
    },
  },

  ".taroify-tabs__tab": {
    title: "标签项",
    items: (props, cate1, cate2, cate3) => {
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
            set({ data, focusArea, slot, output }, value) {
              if (!focusArea) return;
              focusItem.tabName = value;
              slot.setTitle(focusItem._id, value);
              output.setTitle("changeTab_" + focusItem._id, value);
            },
          },
        },
        {
          title: "切换到该标签时",
          type: "_event",
          options: {
            outputId: `changeTab_${focusItem._id}`,
          },
        },
        {
          items: [
            {
              title: "删除标签项",
              type: "Button",
              value: {
                set({ data, slot, input, outputs, focusArea }) {
                  if (!focusArea) return;
                  const item = findItemByInnerId(focusItem._id, data);
                  outputs.remove(`changeTab_${item._id}`);
                  data.tabs.splice(focusArea.index, 1);
                  input.remove(focusItem._id);
                  slot.remove(focusItem._id);
                },
              },
            },
          ],
        },
      ];
      cate2.title = "样式";
      cate2.items = [
        {
          title: "独立样式",
          description: "开启后每个标签项可以单独配置样式，会覆盖通用样式",
          type: "switch",
          value: {
            get({ data }) {
              return !!focusItem.useStyle;
            },
            set({ data }, value) {
              focusItem.useStyle = value;
            },
          },
        },
        {
          title: "",
          items: [
            {
              title: "默认样式",
              type: "stylenew",
              catelog: "默认样式",
              options: {
                defaultOpen: true,
                plugins: [
                  { type: "font", config: { disableTextAlign: true } },
                  { type: "size" },
                  { type: "border" },
                  { type: "padding" },
                  { type: "background" },
                ],
              },
              ifVisible({ data }: EditorResult<Data>) {
                return !!focusItem.useStyle;
              },
              value: {
                get({ data }) {
                  return focusItem.style;
                },
                set({ data }, value) {
                  focusItem.style = value;
                },
              },
            },
            {
              title: "选中样式",
              type: "stylenew",
              catelog: "选中样式",
              options: {
                defaultOpen: true,
                plugins: [
                  { type: "font", config: { disableTextAlign: true } },
                  { type: "size" },
                  { type: "border" },
                  { type: "padding" },
                  { type: "background" },
                ],
              },
              ifVisible({ data }: EditorResult<Data>) {
                return !!focusItem.useStyle;
              },
              value: {
                get({ data }) {
                  return focusItem.activeStyle;
                },
                set({ data }, value) {
                  focusItem.activeStyle = value;
                },
              },
            },
          ],
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
          output.setTitle("changeTab_" + focusItem._id, value);
        },
      },
    },
  },
};
