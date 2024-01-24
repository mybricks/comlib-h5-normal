// import { CSSProperties } from "react";

export default {
  "@init"({ style, data, slot }) {
    style.width = "100%";
    style.height = 160;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root"({ data, output, style, slots }, cate0, cate1, cate2) {
    cate0.title = "布局";
    cate0.items = [
      // {
      //   title: "布局",
      //   type: "layout",
      //   options: {
      //     position: false
      //   },
      //   value: {
      //     get({ data }) {
      //       return data.layout ?? { flexDirection: 'column' };
      //     },
      //     set({ data, slots }, ly) {
      //       data.layout = ly;

      //       const contSlot = slots.get('content')
      //       if (contSlot) {
      //         setSlotLayoutByCss(contSlot, ly)
      //       }
      //     },
      //   },
      // },
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
  }
};


// /**
//  * 通过layoutEditor返回的CSSProperties设置slot的layout的
//  * @param slot
//  * @param cssStyles
//  */
// function setSlotLayoutByCss(slot: any, cssStyles: CSSProperties) {
//   switch (true) {
//     case cssStyles.position === "absolute": {
//       slot.setLayout("absolute");
//       slot.setTitle("列（自由排列）");
//       break;
//     }
//     case cssStyles.position !== "absolute" && cssStyles.display === "flex": {
//       if (cssStyles.flexDirection === "row") {
//         slot.setLayout("flex-row");
//         slot.setTitle("列（横向排列）");
//       }
//       if (cssStyles.flexDirection === "column") {
//         slot.setLayout("flex-column");
//         slot.setTitle("列（竖向排列）");
//       }
//       break;
//     }
//   }
// }