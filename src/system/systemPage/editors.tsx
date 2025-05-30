import MybricksNavigationEditor from "./editor/mybricks-navigation";
import MybricksTabBarEditor from "./editor/mybricks-tabBar";
import css from "./editors.less";
import SkeletonEditor from "./editor/skeleton";
import { defaultSelectedIconPath, defaultNormalIconPath } from "./const";
import setSlotLayout from "../../utils/setSlotLayout";
import entryPagePathEditor from "./editor/entryPagePath";

const Input = window.antd.Input;
const message = window.antd?.message;

function rgbaToHex(rgba) {
  const result = rgba.match(
    /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*(\d*\.?\d+)?\)/
  );

  if (!result) {
    return null;
  }

  const r = parseInt(result[1], 10);
  const g = parseInt(result[2], 10);
  const b = parseInt(result[3], 10);

  const toHex = (c) => ("0" + c.toString(16)).slice(-2);

  return "#" + toHex(r) + toHex(g) + toHex(b);
}
//     { label: "居上", value: "top" },
//     { label: "居中", value: "center" },
//     { label: "居下", value: "bottom" },
//     { label: "居左", value: "left" },
//     { label: "居右", value: "right" },
//     { label: "左上", value: "top left" },
//     { label: "左下", value: "bottom left" },
//     { label: "右上", value: "top right" },
//     { label: "右下", value: "bottom right" },
const positionTransform = (position) => {
  switch (position) {
    case "center top":
      return "top";
      break;
    case "center center":
      return "center";
      break;
    case "center bottom":
      return "bottom";
      break;
    case "left center":
      return "left";
      break;
    case "right center":
      return "right";
      break;
    case "left top":
      return "top left";
      break;
    case "left bottom":
      return "bottom left";
      break;
    case "right top":
      return "top right";
      break;
    case "right bottom":
      return "bottom right";
      break;
    default:
      return "top";
      break;
  }
};

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
      fontSize: "12px",
      color: "#FD6A00",
    },
    normalIconPath: defaultNormalIconPath,
    normalIconStyle: {
      width: "22px",
      height: "22px",
    },
    normalTextStyle: {
      fontSize: "12px",
      color: "#909093",
    },
  };
};

export default {
  "@init": ({ style, data, env }) => {
    style.width = "100%";
    data.id = env.canvas.id;

    setTimeout(() => {
      if (!data.useTabBar) return;

      // 如果模式为标签页，且当前页面不在标签页中，则添加到标签页中
      let globalTabBar = window.__tabbar__?.get() ?? [];
      if (!globalTabBar.find((item) => item.scene.id === data.id)) {
        globalTabBar.push(getDefaultTabItem(data.id));
      }

      window.__tabbar__?.set(JSON.parse(JSON.stringify(globalTabBar)));
    }, 0);
  },

  "@delete": ({ data, env }) => {
    console.warn("@delete", data.id);

    let globalTabBar = window.__tabbar__?.get() ?? [];
    globalTabBar = globalTabBar.filter((item) => {
      return item.scene.id != data.id;
    });

    window.__tabbar__?.set(JSON.parse(JSON.stringify(globalTabBar)));
  },
  ":slot": {},
  "@resize": {
    options: ["height"],
  },

  ":root": {
    style: [],
    items: ({ env, data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "页面";
      cate0.items = [
        {
          title: "布局",
          type: "layout",
          value: {
            get({ data, slots }) {
              return data.layout;
            },
            set({ data, slots }, value) {
              data.layout = value;
              setSlotLayout( slots.get("content"), value);
            },
          },
        },
        { ...entryPagePathEditor },
          MybricksTabBarEditor[".mybricks-tabBar"].items[0],
        {
          title: "顶部导航栏",
          items: MybricksNavigationEditor[".mybricks-navigation"].items,
        },
        {
          title: "页面",
          items: [
            {
              title: "背景配置",
              type: "styleNew",
              options: {
                defaultOpen: true,
                plugins: ["background"],
              },
              value: {
                get({ data }) {
                  return {
                    backgroundColor: data.background,
                    backgroundImage: data.backgroundImage,
                    backgroundPosition: data.backgroundPosition || "center top",
                    backgroundSize: data.backgroundSize,
                    backgroundRepeat: data.backgroundRepeat || "repeat",
                  };
                },
                set({ data }, value) {
                  console.log("set", value);
                  data.backgroundImage =
                    value?.backgroundImage !== undefined
                      ? value.backgroundImage
                      : data.backgroundImage;
                  let backgroundPosition =
                    value?.backgroundPosition !== undefined
                      ? value.backgroundPosition
                      : data.backgroundPosition;
                  data.backgroundPosition =
                    positionTransform(backgroundPosition);
                  data.backgroundSize =
                    value?.backgroundSize !== undefined
                      ? value.backgroundSize
                      : data.backgroundSize;
                  data.backgroundRepeat =
                    value?.backgroundRepeat !== undefined
                      ? value.backgroundRepeat
                      : data.backgroundRepeat;
                  data.background =
                    value?.backgroundColor !== undefined
                      ? value.backgroundColor
                      : data.backgroundColor;
                },
              },
            },
            {
              title: "底部空间留存",
              type: "text",
              options: {
                type: "number",
                min: 0,
              },
              value: {
                get({ data }) {
                  return data.bottomSpace || 0;
                },
                set({ data }, value) {
                  data.bottomSpace = value;
                },
              },
            },
            {
              title: "禁用页面滚动",
              type: "switch",
              value: {
                get({ data }) {
                  return data.disableScroll;
                },
                set({ data }, value) {
                  data.disableScroll = value;
                },
              },
            },

            {
              ifVisible({ data }) {
                return !data.useTabBar;
              },
              title: "开启页脚容器",
              type: "switch",
              value: {
                get({ data }) {
                  return data.useFooter;
                },
                set({ data, slot }, value) {
                  data.useFooter = value;
    
                  if (value) {
                    slot.add("footerBar", "页脚容器");
                  } else {
                    slot.remove("footerBar");
                  }
                },
              },
            },
            {
              title: "页面地址",
              type: "editorRender",
              options: {
                render: (props) => {
                  let url = `/pages/${props.editConfig.value.get()}/index`;
    
                  const onCopy = (text) => {
                    const textarea = document.createElement("textarea");
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textarea);
    
                    message.success("复制成功");
                  };
    
                  return (
                    <div
                      className={css.pagePath}
                      onClick={() => {
                        onCopy(url);
                      }}
                    >
                      <div className={css.url}>{url}</div>
                      <div className={css.copy}></div>
                    </div>
                  );
                },
              },
              value: {
                get({ data }) {
                  return data.id;
                },
              },
            },
            {
              title: "页面别名",
              description: "如果设置了页面别名，则将使用别名覆盖默认页面地址，多张页面设置别名时，所设置的值请勿重复",
              type: "editorRender",
              options: {
                render: (props) => {
                  let url = `/pages/${props.editConfig.value.get()}/index`;
    
                  return (
                    <div className={css.pageAlias}>
                      <div className={css.url}>
                        {
                          <Input
                            className={css.input}
                            defaultValue={props.editConfig.value.get()}
                            onChange={(e) => {
                              let value = e.target.value;
                              props.editConfig.value.set(value);
                            }}
                          />
                        }
                      </div>
                    </div>
                  );
                },
              },
              value: {
                get({ data }) {
                  return data.alias || "";
                },
                set({ data }, val) {
                  data.alias = val;
                },
              },
            },
            // {
            //   title: "大小",
            //   type: "select",
            //   options: [
            //     { label: "填充（无留白）", value: "cover" },
            //     { label: "适应（有留白）", value: "contain" },
            //     { label: "拉伸", value: "100% 100%" },
            //     { label: "原始大小", value: "auto" },
            //   ],
            //   value: {
            //     get({ data }) {
            //       return data.backgroundSize || "cover";
            //     },
            //     set({ data }, value) {
            //       data.backgroundSize = value;
            //     },
            //   },
            // },
            // {
            //   title: "平铺",
            //   type: "select",
            //   options: [
            //     { label: "平铺", value: "repeat" },
            //     { label: "不平铺", value: "no-repeat" },
            //   ],
            //   ifVisible({ data }: EditorResult<Data>) {
            //     return (
            //       data.backgroundSize === "contain" ||
            //       data.backgroundSize === "auto"
            //     );
            //   },
            //   value: {
            //     get({ data }) {
            //       return data.backgroundRepeat || "repeat";
            //     },
            //     set({ data }, value) {
            //       data.backgroundRepeat = value;
            //     },
            //   },
            // },
            // {
            //   title: "位置",
            //   type: "select",
            //   options: [
            //     { label: "居上", value: "top" },
            //     { label: "居中", value: "center" },
            //     { label: "居下", value: "bottom" },
            //     { label: "居左", value: "left" },
            //     { label: "居右", value: "right" },
            //     { label: "左上", value: "top left" },
            //     { label: "左下", value: "bottom left" },
            //     { label: "右上", value: "top right" },
            //     { label: "右下", value: "bottom right" },
            //   ],
            //   ifVisible({ data }: EditorResult<Data>) {
            //     return data.backgroundSize !== "100% 100%";
            //   },
            //   value: {
            //     get({ data }) {
            //       return data.backgroundPosition || "top";
            //     },
            //     set({ data }, value) {
            //       data.backgroundPosition = value;
            //     },
            //   },
            // },
          ],
        },

        // {
        //   title: "顶部下拉背景色",
        //   type: "colorpicker",
        //   description: "页面顶部下拉时外露的背景色",
        //   value: {
        //     get({ data }) {
        //       return data.backgroundColorTop;
        //     },
        //     set({ data }, value) {
        //       data.backgroundColorTop = rgbaToHex(value);
        //     },
        //   },
        // },
        // {
        //   title: "底部上滑背景色",
        //   type: "colorpicker",
        //   description: "页面底部上滑时外露的背景色",
        //   value: {
        //     get({ data }) {
        //       return data.backgroundColorBottom;
        //     },
        //     set({ data }, value) {
        //       data.backgroundColorBottom = rgbaToHex(value);
        //     },
        //   },
        // },
        

        
        
        
       
        // {
        //   title: "骨架屏",
        //   items: [
        //     {
        //       title: "开启",
        //       description: "开启后，必须连接初始化完成才会隐藏骨架屏",
        //       type: "switch",
        //       value: {
        //         get({ data }) {
        //           return data.useSkeleton;
        //         },
        //         set({ data, input }, value) {
        //           data.useSkeleton = value;

        //           if (value) {
        //             input.add("ready", "初始化完成", { type: "any" });
        //           } else {
        //             input.remove("ready");
        //           }
        //         },
        //       },
        //     },
        //     // {
        //     //   ifVisible({ data }) {
        //     //     return data.useSkeleton;
        //     //   },
        //     //   title: "配置",
        //     //   type: "editorRender",
        //     //   options: {
        //     //     render: (props) => {
        //     //       return <SkeletonEditor {...props} />;
        //     //     },
        //     //   },
        //     //   value: {
        //     //     get({ data }) {
        //     //       return data.skeleton;
        //     //     },
        //     //     set({ data }, value) {
        //     //       data.skeleton = value;
        //     //     },
        //     //   },
        //     // },
        //   ],
        // },
      ];

      cate1.title = "事件";
      cate1.items = [
        {
          title: "当页面重新显示时",
          description:
            "请注意，当页面第一次显示时，不会触发该事件。仅当页面被打开后，重新显示/切入前台时触发。",
          type: "_event",
          options: {
            outputId: "pageDidShow",
          },
        },
        {
          title: "当页面隐藏时",
          type: "_event",
          options: {
            outputId: "pageDidHide",
          },
        },
        // {
        //   title: "分享",
        //   type: "switch",
        //   value: {
        //     get({ data }) {
        //       return data.enabledShareMessage ?? false;
        //     },
        //     set({ data }, value) {
        //       data.enabledShareMessage = value;
        //     },
        //   },
        // },
        {
          title: "分享给朋友",
          type: "switch",
          description:"打开该选项后，才能开启分享到朋友圈",
          value: {
            get({ data }) {
              return data.enabledShareAppMessage ?? false;
            },
            set({ data }, value) {
              data.enabledShareAppMessage = value;
            },
          },
        },
        {
          title: "分享到朋友圈",
          type: "switch",
          ifVisible({ data }: EditorResult<Data>) {
            return data?.enabledShareAppMessage;
          },
          description:"开启分享给朋友后，该选项才能生效",
          value: {
            get({ data }) {
              return data.enabledShareTimeline ?? false;
            },
            set({ data }, value) {
              data.enabledShareTimeline = value;
            },
          },
        },
        {
          title: "下拉刷新",
          type: "switch",
          value: {
            get({ data }) {
              return data.enabledPulldown;
            },
            set({ data, slots }, value) {
              data.enabledPulldown = value;
            },
          },
        },
        {
          title: "当下拉刷新触发时",
          ifVisible({ data }) {
            return data.enabledPulldown;
          },
          type: "_event",
          options: {
            outputId: "pulldown",
          },
        },
        {
          title: "开启页面 Loading",
          type: "switch",
          value: {
            get({ data }) {
              return data.useLoading;
            },
            set({ data, input }, value) {
              data.useLoading = value;

              if (value) {
                input.add("ready", "初始化完成", { type: "any" });
              } else {
                input.remove("ready");
              }
            },
          },
        },
        
        

      ];

      (cate2.title = "高级"),
        (cate2.items = [
          {
            title: "强制加入主包(beta)",
            type: "switch",
            description: "强制加入主包，仅在页面需要分享出去时才可使用",
            value: {
              get({ data }) {
                return data.forceMainPackage;
              },
              set({ data }, value) {
                data.forceMainPackage = value;
              },
            }
          },
          // {
          //   title: "偷偷的upgrade",
          //   type: "button",
          //   // ifVisible({ data }: EditorResult<any>) {
          //   //   return !!new URL(location.href).searchParams.get('update');
          //   // },
          //   value: {
          //     set: ({ input, output }) => {
          //       if (!output.get("pageDidShow")) {
          //         output.add("pageDidShow", "当页面重新显示时", { type: "object" });
          //       }
          //       if (!output.get("pageDidHide")) {
          //         output.add("pageDidHide", "当页面隐藏时", { type: "object" });
          //       }
          //     },
          //   },
          // },
        ]);
    },
  },
  // ...MybricksNavigationEditor,

  ".mybricks-backIcon": {
    style: [
      {
        title: "样式",
        options: ["size"],
        target: ".mybricks-backIcon",
      },
    ],
    items: [
      {
        title: "自定义图标",
        type: "imageselector",
        options: {
          fileSizeLimit: 10,
          useBase64Only: true,
        },
        value: {
          get({ data }) {
            return data.customBackIcon;
          },
          set({ data }, value) {
            data.customBackIcon = value;
          },
        },
      },
    ],
  },

  ...MybricksTabBarEditor,

  ".mybricks-footer": {
    style: [
      {
        title: "页脚容器",
        options: ["background"],
        target: `.mybricks-footer`,
      },
    ],
  },
  ".mybricks-navigation-title": {
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          const { data, focusArea } = props;
          return data.navigationBarTitleText
        },
        set(props, value) {
          const { data, focusArea } = props;
          data.navigationBarTitleText = value
        },
      },
    }
  },
  ".mybricks-tabbar-text": {
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          const { data, focusArea } = props;
          let innerText = focusArea.ele.innerText;
          return innerText
        },
        set(props, value) {
          const { data, focusArea } = props;

          let tabBar = JSON.parse(JSON.stringify(data.tabBar));
          tabBar[focusArea.index].text = value;
          data.tabBar = tabBar;
          window.__tabbar__?.set(tabBar);
        },
      },
    }
  }
};
