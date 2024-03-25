import MybricksNavigationEditor from "./editor/mybricks-navigation";
import MybricksTabBarEditor from "./editor/mybricks-tabBar";
import css from "./editors.less";
import SkeletonEditor from "./editor/skeleton";

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

export default {
  "@init": ({ style, data, env }) => {
    style.width = "100%";
    data.id = env.canvas.id;
  },
  ":slot": {},
  ":root": {
    style: [],
    items: ({ env, data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
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
          title: "顶部导航栏",
          items: MybricksNavigationEditor[".mybricks-navigation"].items,
        },
        {
          title: "页面背景色",
          type: "colorpicker",
          value: {
            get({ data }) {
              return data.background;
            },
            set({ data }, value) {
              data.background = value;
            },
          },
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
        {},
        {
          title: "底部标签栏",
          items: MybricksTabBarEditor[".mybricks-tabBar"].items,
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
          title: "下拉刷新",
          items: [
            {
              title: "开启",
              type: "switch",
              value: {
                get({ data }) {
                  return data.enabledPulldown;
                },
                set({ data }, value) {
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
          ],
        },
        {
          title:"禁用页面滚动",
          type:"switch",
          value:{
            get({data}){
              return data.disableScroll
            },
            set({data},value){
              data.disableScroll = value
            }
          }

        },
        {
          title: "页面展示",
          items: [
            {
              title: "当页面重新显示时",
              description: "请注意，当页面第一次显示时，不会触发该事件。仅当页面被打开后，重新显示/切入前台时触发。",
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
          ],
        },
        {
          title: "分享",
          items: [
            {
              title: "开启",
              type: "switch",
              value: {
                get({ data }) {
                  return data.enabledShareMessage ?? false;
                },
                set({ data }, value) {
                  data.enabledShareMessage = value;
                },
              },
            },
          ],
        },
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

      (cate2.title = "高级"),
        (cate2.items = [
          {
            title: "偷偷的upgrade",
            type: "button",
            // ifVisible({ data }: EditorResult<any>) {
            //   return !!new URL(location.href).searchParams.get('update');
            // },
            value: {
              set: ({ input, output }) => {
                if (!output.get("pageDidShow")) {
                  output.add("pageDidShow", "当页面重新显示时", { type: "object" });
                }

                if (!output.get("pageDidHide")) {
                  output.add("pageDidHide", "当页面隐藏时", { type: "object" });
                }
              },
            },
          },
        ]);
    },
  },
  // ...MybricksNavigationEditor,
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
};
