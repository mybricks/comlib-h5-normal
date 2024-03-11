// import { CSSProperties } from "react";

export default {
  "@init"({ style, data }) {
    style.width = "100%";
    style.height = 160;
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

const setSlotLayout = (slot, value) => {
  if (!slot) return;
  if (value.position === "smart") {
    slot.setLayout("smart");
  } else if (value.position === "absolute") {
    slot.setLayout(value.position);
  } else if (value.display === "flex") {
    if (value.flexDirection === "row") {
      slot.setLayout("flex-row");
    } else if (value.flexDirection === "column") {
      slot.setLayout("flex-column");
    }
  }
};
