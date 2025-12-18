import {
  defaultSelectedIconPath,
  defaultNormalIconPath,
  defaultIcon,
  defaultNormalFontIconStyle,
  defaultSelectedFontIconStyle,
} from "../const";
import IconSelector from "../../../editors/iconSelector";
const message = window.antd?.message;

let selectedSceneId = null;
let lock = 0;

const getDefaultTabItem = (id) => {
  return {
    scene: {
      id,
    },
    text: "标签项",
    selectedIconUseImg: false,
    selectedIconPath: defaultSelectedIconPath,
    selectedIcon: defaultIcon,
    selectedFontIconStyle: defaultSelectedFontIconStyle,
    selectedIconStyle: {
      width: "22px",
      height: "22px",
    },
    selectedTextStyle: {
      marginTop: "6px",
      fontSize: 12,
      color: "#FD6A00",
    },
    normalIconUseImg: false,
    normalIconPath: defaultNormalIconPath,
    normalIcon: defaultIcon,
    normalFontIconStyle: defaultNormalFontIconStyle,
    normalIconStyle: {
      width: "22px",
      height: "22px",
    },
    normalTextStyle: {
      marginTop: "6px",
      fontSize: 12,
      color: "#909093",
    },
  };
};

function iconEditor(type: string) {
  const kesMap = {
    normal: {
      useIconImg: "normalIconUseImg",
      iconPath: "normalIconPath",
      icon: "normalIcon",
      iconStyle: "normalFontIconStyle",
      iconImgStyle: "normalIconStyle",
    },
    selected: {
      useIconImg: "selectedIconUseImg",
      iconPath: "selectedIconPath",
      icon: "selectedIcon",
      iconStyle: "selectedFontIconStyle",
      iconImgStyle: "selectedIconStyle",
    },
  };
  const curKey = kesMap[type];
  const typeStr = type === "normal" ? "默认" : "激活";
  return [
    {
      catelog: `${typeStr}图标`,
      title: "图标类型",
      description: `图标库：从图标库中选取图标；自定义图标：上传自定义图片图标`,
      type: "radio",
      options: [
        { label: "图标库", value: false },
        { label: "自定义图标", value: true },
      ],
      value: {
        get({ data, focusArea }) {
          if (!focusArea) return;
          return data.tabBar[focusArea.index]?.[curKey.useIconImg] !== false;
        },
        set({ data, focusArea }, value) {
          let tabBar = JSON.parse(JSON.stringify(data.tabBar));
          tabBar[focusArea.index][curKey.useIconImg] = value;

          // 兼容没有图标库之前的项目，赋值初始值
          tabBar[focusArea.index][curKey.icon] =
            tabBar[focusArea.index][curKey.icon] ?? defaultIcon;
          tabBar[focusArea.index][curKey.iconStyle] =
            tabBar[focusArea.index][curKey.iconStyle] ??
            (type === "normal"
              ? defaultNormalFontIconStyle
              : defaultSelectedFontIconStyle);

          data.tabBar = tabBar;

          window.__tabbar__?.set(tabBar);
        },
      },
    },
    {
      ifVisible({ data, focusArea }) {
        return data.tabBar[focusArea.index]?.[curKey.useIconImg] !== false;
      },
      catelog: `${typeStr}图标`,
      description: `上传${typeStr}图标的自定义图标图片`,
      title: "图标",
      type: "imageSelector",
      options: {
        fileSizeLimit: 10,
        useBase64Only: true,
      },
      value: {
        get({ data, focusArea }) {
          if (!focusArea) return;
          return data.tabBar[focusArea.index]?.[curKey.iconPath];
        },
        set({ data, focusArea }, value) {
          let tabBar = JSON.parse(JSON.stringify(data.tabBar));
          tabBar[focusArea.index][curKey.iconPath] = value;
          data.tabBar = tabBar;

          window.__tabbar__?.set(tabBar);
        },
      },
    },
    {
      ifVisible({ data, focusArea }) {
        return data.tabBar[focusArea.index]?.[curKey.useIconImg] === false;
      },
      catelog: `${typeStr}图标`,
      title: "图标",
      description: `选择${typeStr}图标`,
      type: "editorRender",
      options: {
        render: (props) => {
          return <IconSelector value={props.editConfig.value} />;
        },
      },
      value: {
        get({ data, focusArea }) {
          if (!focusArea) return;
          return data.tabBar[focusArea.index]?.[curKey.icon] ?? defaultIcon;
        },
        set({ data, focusArea }, value) {
          let tabBar = JSON.parse(JSON.stringify(data.tabBar));
          tabBar[focusArea.index][curKey.icon] = value;
          data.tabBar = tabBar;

          window.__tabbar__?.set(tabBar);
        },
      },
    },
    {
      ifVisible({ data, focusArea }) {
        return data.tabBar[focusArea.index]?.[curKey.useIconImg] !== false;
      },
      catelog: `${typeStr}图标`,
      title: "大小",
      description: `自定义${typeStr}图标大小`,
      type: "styleNew",
      options: {
        defaultOpen: true,
        plugins: ["size"],
      },
      value: {
        get({ data, focusArea }) {
          if (!focusArea) return;
          return data.tabBar[focusArea.index]?.[curKey.iconImgStyle];
        },
        set({ data, focusArea }, value) {
          let tabBar = JSON.parse(JSON.stringify(data.tabBar));
          tabBar[focusArea.index][curKey.iconImgStyle] = {
            ...value,
          };
          data.tabBar = tabBar;

          window.__tabbar__?.set(tabBar);
        },
      },
    },
    {
      ifVisible({ data, focusArea }) {
        return data.tabBar[focusArea.index]?.[curKey.useIconImg] === false;
      },
      catelog: `${typeStr}图标`,
      title: "样式",
      description: `${typeStr}图标样式`,
      type: "stylenew",
      options: {
        defaultOpen: true,
        plugins: [
          {
            type: "font",
            config: {
              disableTextAlign: true,
              disableFontFamily: true,
              disableLineHeight: true,
              disableFontWeight: true,
              disableLetterSpacing: true,
            },
          },
        ],
      },
      value: {
        get({ data, focusArea }) {
          if (!focusArea) return;
          const defaultStyle =
            type === "normal"
              ? defaultNormalFontIconStyle
              : defaultSelectedFontIconStyle;
          return (
            data.tabBar[focusArea.index]?.[curKey.iconStyle] ?? defaultStyle
          );
        },
        set({ data, focusArea }, value) {
          let tabBar = JSON.parse(JSON.stringify(data.tabBar));
          tabBar[focusArea.index][curKey.iconStyle] = {
            ...value,
          };
          data.tabBar = tabBar;

          window.__tabbar__?.set(tabBar);
        },
      },
    },
  ];
}

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
              let tabBar = [...globalTabBar, getDefaultTabItem(data.id)];

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
        title: "图标",
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
        items: [...iconEditor("normal"), ...iconEditor("selected")],
      },
      {
        title: "文案",
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
            catelog: "默认文案",
            title: "样式",
            type: "styleNew",
            options: {
              defaultOpen: true,
              plugins: ["font", "margin"],
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
          {
            catelog: "激活文案",
            title: "样式",
            type: "styleNew",
            options: {
              defaultOpen: true,
              plugins: ["font", "margin"],
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
    ];
  },
};
