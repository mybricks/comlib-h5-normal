import comJson from "./com.json";
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
  ":slot": {},
  ":root": {
    style: [
      {
        title: "侧边栏底色",
        options: [
          { type: "background", config: { disableBackgroundImage: false } },
        ],
        target: ".taroify-tree-select__sidebar",
      },
      {
        title: "选中条",
        options: [
          { type: "background", config: { disableBackgroundImage: false } },
          { type: "size", config: { disableWidth: false } },
        ],
        target: ".taroify-sidebar-tab--active:before",
      },
      {
        title: "标签项",
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
            target: ".taroify-sidebar-tab:not(.taroify-sidebar-tab--active)",
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
            target: ".taroify-sidebar-tab--active",
          },
        ],
      },
    ],
    items({ data }, cate0, cate1, cate2) {
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
            ],
          },
          value: {
            get({ data }) {
              return data.tabs;
            },
            set({ data, slot, outputs }, value) {
              let action = computedAction({
                before: data.tabs,
                after: value,
              });

              switch (action?.name) {
                case "remove":
                  console.log("remove",`changeTab_${action?.value._id}`)
                  outputs.remove(`changeTab_${action?.value._id}`);
                  slot.remove(action?.value._id);
                  break;
                case "add":
                  slot.add({
                    id: action?.value._id,
                    title: defaultItem.tabName,
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
                  break;
                case "update":
                  // slot.setTitle(action?.value._id, action?.value.tabName);
                  break;
              }

              data.tabs = value;
            },
          },
        },
        {
          title: "动态标签",
          type: "switch",
          description: "开启后，可通过连线动态配置左侧的选项列表",
          value: {
            get({ data, slot }) {
              if (data.useDynamicTab === false) {
                if (slot.get("tabItem")) {
                  slot.remove("tabItem")
                }
              }
              return data.useDynamicTab;
            },
            set({ data, slot,output }, value) {
              data.useDynamicTab = value;
              //当动态标签开启时，把目前的全部output存起来，后面可以还原
              if (value) {
                data.slotStorage = data.tabs.map((item) => {
                  output.remove(`changeTab_${item._id}`)
                  return {
                    id: `changeTab_${item._id}`,
                    title: item.tabName,
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
                  };
                });
                //追加固定标签页
                slot.add(comJson.slots[2])
              } else {
                //动态标签页关闭时，还原存储的output
                data.slotStorage.forEach((item) => {
                  output.add(item)
                });
                slot.remove("tabItem")
                data.slotStorage = []
              }

            },
          }
        },
        {
          title: "标签名key",
          type: "text",
          description: "开启动态标签后，可通过此key获取标签名",
          value: {
            get({ data }) {
              return data.tabNameKey;
            },
            set({ data }, value) {
              data.tabNameKey = value;
            },
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
    },
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
            set({ data, focusArea, slot, output }, value) {
              if (!focusArea) return;
              focusItem.tabName = value;
              // slot.setTitle(focusItem._id, value);
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
          title: "删除标签项",
          type: "Button",
          value: {
            set({ data,outputs, slot, focusArea }) {
              if (!focusArea) return;
              data.tabs.splice(focusArea.index, 1);
              // const _id = getFocusTab({ data, focusArea })?._id
              console.log("remove",`changeTab_${focusItem._id}`)
              outputs.remove(`changeTab_${focusItem._id}`);
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
          // slot.setTitle(focusItem._id, value);
          output.setTitle(focusItem._id, value);
        },
      },
    },
  },
};
