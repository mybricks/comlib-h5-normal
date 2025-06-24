import { defaultSelectedIconPath, defaultNormalIconPath } from "../const";
const message = window.antd?.message;

let selectedSceneId = null;
let lock = 0;

const getDefaultTabItem = (id) => {
  return {
    scene: {
      id,
    },
    text: "标签项",
    selectedIconPath: defaultSelectedIconPath,
    selectedIconStyle: {
      width: "22px",
      height: "22px",
    },
    selectedTextStyle: {
      fontSize: 12,
      color: "#FD6A00",
    },
    normalIconPath: defaultNormalIconPath,
    normalIconStyle: {
      width: "22px",
      height: "22px",
    },
    normalTextStyle: {
      fontSize: 12,
      color: "#909093",
    },
  };
};


export default {
  ".mybricks-tabBar": {
    items: [
      {
        title: "作为标签页",
        type: "switch",
        value: {
          get({ data }) {
            return data.useTabBar;
          },
          set({ data }, value: boolean) {
            data.useTabBar = value;

            // 开启
            let globalTabBar = window.__tabbar__?.get() ?? [];

            let isContain = globalTabBar.find((item) => {
              return item.scene.id == data.id;
            });

            if (value && !isContain) {
              let tabBar = [
                ...globalTabBar,
                getDefaultTabItem(data.id),
              ];

              window.__tabbar__?.set(tabBar);

              if (tabBar.length > 5) {
                message.error("由于底部标签栏最多支持5个标签");
              }
            }

            // 关闭
            if (!value && isContain) {
              let tabBar = globalTabBar.filter((item) => {
                return item.scene.id != data.id;
              });
              window.__tabbar__?.set(tabBar);
            }
          },
        },
      },
    ],
  },
  ".mybricks-tabItem"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "标签名",
        type: "text",
        value: {
          get({ data, focusArea }) {
            if (!focusArea) return;
            return data.tabBar[focusArea.index]?.text;
          },
          set({ data, focusArea, slot }, value) {
            if (!focusArea) return;
            let tabBar = JSON.parse(JSON.stringify(data.tabBar));
            tabBar[focusArea.index].text = value;
            data.tabBar = tabBar;

            window.__tabbar__?.set(tabBar);
          },
        },
      },
      {
        title: "激活图标",
        type: "imageSelector",
        options: {
          fileSizeLimit: 10,
          useBase64Only: true,
        },
        value: {
          get({ data, focusArea }) {
            if (!focusArea) return;
            return data.tabBar[focusArea.index]?.selectedIconPath;
          },
          set({ data, focusArea }, value) {
            let tabBar = JSON.parse(JSON.stringify(data.tabBar));
            tabBar[focusArea.index].selectedIconPath = value;
            data.tabBar = tabBar;

            window.__tabbar__?.set(tabBar);
          },
        },
      },
      {
        title: "默认图标",
        type: "imageSelector",
        options: {
          fileSizeLimit: 10,
          useBase64Only: true,
        },
        value: {
          get({ data, focusArea }) {
            if (!focusArea) return;
            return data.tabBar[focusArea.index]?.normalIconPath;
          },
          set({ data, focusArea }, value) {
            let tabBar = JSON.parse(JSON.stringify(data.tabBar));
            tabBar[focusArea.index].normalIconPath = value;
            data.tabBar = tabBar;

            window.__tabbar__?.set(tabBar);
          },
        },
      },
      {
        title: "标签样式",
        catelogChange: {
          value: {
            get({ data, focusArea }) {
              if (!focusArea) return;
              return data.selectedTabItemCatelog;
            },
            set({ data, focusArea, catelog }, value) {
              if (!focusArea) return;
              data.selectedTabItemCatelog = catelog;
            },
          },
        },
        items: [
          {
            catelog: "激活样式",
            title: "图标",
            type: "styleNew",
            options: {
              defaultOpen: true,
              plugins: ["size"],
            },
            value: {
              get({ data, focusArea }) {
                if (!focusArea) return;
                return data.tabBar[focusArea.index]?.selectedIconStyle;
              },
              set({ data, focusArea }, value) {
                let tabBar = JSON.parse(JSON.stringify(data.tabBar));
                tabBar[focusArea.index].selectedIconStyle = {
                  ...value,
                };
                data.tabBar = tabBar;

                window.__tabbar__?.set(tabBar);
              },
            },
          },
          {
            catelog: "激活样式",
            title: "文案",
            type: "styleNew",
            options: {
              defaultOpen: true,
              plugins: ["font"],
            },
            value: {
              get({ data, focusArea }) {
                if (!focusArea) return;
                return data.tabBar[focusArea.index]?.selectedTextStyle;
              },
              set({ data, focusArea }, value) {
                let tabBar = JSON.parse(JSON.stringify(data.tabBar));
                tabBar[focusArea.index].selectedTextStyle = {
                  ...value,
                };
                data.tabBar = tabBar;

                window.__tabbar__?.set(tabBar);
              },
            },
          },
          {
            catelog: "默认样式",
            title: "图标",
            type: "styleNew",
            options: {
              defaultOpen: true,
              plugins: ["size"],
            },
            value: {
              get({ data, focusArea }) {
                if (!focusArea) return;
                return data.tabBar[focusArea.index]?.normalIconStyle;
              },
              set({ data, focusArea }, value) {
                let tabBar = JSON.parse(JSON.stringify(data.tabBar));
                tabBar[focusArea.index].normalIconStyle = {
                  ...value,
                };
                data.tabBar = tabBar;

                window.__tabbar__?.set(tabBar);
              },
            },
          },
          {
            catelog: "默认样式",
            title: "文案",
            type: "styleNew",
            options: {
              defaultOpen: true,
              plugins: ["font"],
            },
            value: {
              get({ data, focusArea }) {
                if (!focusArea) return;
                return data.tabBar[focusArea.index]?.normalTextStyle;
              },
              set({ data, focusArea }, value) {
                let tabBar = JSON.parse(JSON.stringify(data.tabBar));
                tabBar[focusArea.index].normalTextStyle = {
                  ...value,
                };
                data.tabBar = tabBar;

                window.__tabbar__?.set(tabBar);
              },
            },
          },
        ],
      },
      {
        title: "前移",
        type: "Button",
        value: {
          set({ data, focusArea }) {
            if (!focusArea) return;

            let tabBar = JSON.parse(JSON.stringify(data.tabBar));
            let index = tabBar
              .map((item) => item.scene.id)
              .indexOf(selectedSceneId);

            if (index === 0) {
              return;
            }

            let targetItem = JSON.parse(JSON.stringify(tabBar[index - 1]));
            let originItem = JSON.parse(JSON.stringify(tabBar[index]));

            tabBar[index - 1] = originItem;
            tabBar[index] = targetItem;

            clearTimeout(lock);
            lock = setTimeout(() => {
              lock = null;
              console.log("lock", lock);
            }, 100);

            // data.tabBar = tabBar;
            window.__tabbar__?.set(tabBar);
          },
        },
      },
      {
        title: "后移",
        type: "Button",
        value: {
          set({ data, focusArea }) {
            if (!focusArea) return;

            let tabBar = JSON.parse(JSON.stringify(data.tabBar));
            let index = tabBar
              .map((item) => item.scene.id)
              .indexOf(selectedSceneId);

            if (index + 1 === tabBar.length) {
              return;
            }

            let originItem = JSON.parse(JSON.stringify(tabBar[index]));
            let targetItem = JSON.parse(JSON.stringify(tabBar[index + 1]));

            tabBar[index] = targetItem;
            tabBar[index + 1] = originItem;

            clearTimeout(lock);
            lock = setTimeout(() => {
              lock = null;
              console.log("lock", lock);
            }, 100);

            // data.tabBar = tabBar;
            window.__tabbar__?.set(tabBar);
          },
        },
      },
      {
        title: "",
        type: "editorRender",
        options: {
          render: (props) => {
            props.editConfig.value.get();
            return <></>;
          },
        },
        value: {
          get({ data, focusArea }) {
            if (!focusArea) return;
            if (lock) return;
            selectedSceneId = data.tabBar[focusArea.index]?.scene.id;
          },
        },
      },
    ];
    cate1.title = "样式";
    cate1.items = [
      {
        catelog: "激活",
        title: "背景色",
        type: "styleNew",
        options: {
          defaultOpen: true,
          plugins: ["background", "border"],
        },
        value: {
          get({ data, focusArea }) {
            if (!focusArea) return;
            return data.tabBar[focusArea.index]?.selectedBackgroundStyle;
          },
          set({ data, focusArea, slot }, value) {
            let tabBar = JSON.parse(JSON.stringify(data.tabBar));
            tabBar[focusArea.index].selectedBackgroundStyle = {
              ...value,
            };
            data.tabBar = tabBar;

            window.__tabbar__?.set(tabBar);
          },
        },
      },
      {
        catelog: "默认",
        title: "背景色",
        type: "styleNew",
        options: {
          defaultOpen: true,
          plugins: ["background", "border"],
        },
        value: {
          get({ data, focusArea }) {
            if (!focusArea) return;
            return data.tabBar[focusArea.index]?.normalBackgroundStyle;
          },
          set({ data, focusArea, slot }, value) {
            let tabBar = JSON.parse(JSON.stringify(data.tabBar));
            tabBar[focusArea.index].normalBackgroundStyle = {
              ...value,
            };
            data.tabBar = tabBar;

            window.__tabbar__?.set(tabBar);
          },
        },
      },

    ]
  },
};
