import setSlotLayout from "../utils/setSlotLayout";

export default {
  "@init"({ style, data }) {
    style.width = "100%";
    style.height = 90;
    style.postion = "fixed";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":slot": {},
  ":root"({ data, output, style, slots }, cate0, cate1, cate2) {
    cate0.title = "布局";
    cate0.items = [
      {
        title: "布局",
        type: "layout",
        value: {
          get({ data }) {
            return data.layout;
          },
          set({ data, slots }, value) {
            data.layout = value;

            const slotInstance = slots.get("content");
            setSlotLayout(slotInstance, value);
          },
        },
      },
      {
        title: "临时高度控制",
        type: "select",
        options: [
          { label: "无导航栏", value: "none" },
          { label: "默认", value: "normal" },
          { label: "自定义", value: "custom" },
        ],
        value: {
          get({ data }) {
            return data.navigationStyle;
          },
          set({ data }, value) {
            data.navigationStyle = value;
          },
        },
      },
      {
        title: "单击",
        type: "_Event",
        options: {
          outputId: "click",
        },
      },
    ];
    cate1.title = "样式";
    cate1.items = [
      {
        title: "样式",
        type: "styleNew",
        options: {
          defaultOpen: true,
          plugins: ["background", "border", "padding", "boxshadow"],
        },
        value: {
          get({ data }) {
            return (
              // 兜底编辑器 bug
              data.style ?? {
                paddingTop: "0px",
                paddingLeft: "0px",
                paddingBottom: "0px",
                paddingRight: "0px",
              }
            );
          },
          set({ data }, value) {
            data.style = JSON.parse(JSON.stringify(value));
          },
        },
      },
    ];
  },
};