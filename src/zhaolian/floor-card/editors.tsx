export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  // "@resize": {
  //   options: ["width", "height"],
  // },
  ":root": {
    items: [
      {
        title: "楼层标题",
        type: "text",
        value: {
          get({ data }) {
            return data.title;
          },
          set({ data }, val) {
            data.title = val;
          },
        },
      },
      {
        title: "图标",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.icon;
          },
          set({ data }, val) {
            data.icon = val;
          },
        },
      },{
        title:"图标跳转地址",
        type:"text",
        value: {
          get({ data }) {
            return data.iconJumpUrl;
          },
          set({ data }, val) {
            data.iconJumpUrl = val;
          },
        }
      }
    ],
  },
};
