export default {
  "@init"({ style }) {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        ifVisible({ data }) {
          return !data.asHotarea;
        },
        options: ["font", "padding", "border", "background", "boxShadow"],
        target: ".button",
      },
    ],
    items: [
      {
        // 使用 ifVisible 来控制是否显示该配置项
        ifVisible({ data }) {
          return !data.asHotarea;
        },
        title: "文字标题",
        type: "text",
        value: {
          get({ data }) {
            return data.text;
          },
          set({ data }, value: string) {
            data.text = value;
          },
        },
      },
      {
        title: "作为热区",
        description: "如果开启，当宽度或者高度为自适应时，将会被重置为 50px",
        type: "switch",
        value: {
          get({ data }) {
            return data.asHotarea;
          },
          set({ data, style }, value: boolean) {
            //作为热区时，宽高不支持自适应
            if (value) {
              if (style.height === "auto" || style.height === "100%") {
                style.flex = "unset";
                style.height = 50;
              }

              if (style.width === "auto" || style.width === "100%") {
                style.width = 50;
              }
            }

            data.asHotarea = value;
          },
        },
      },
      {}, //空对象可以用来分割配置项
      {
        title: "单击",
        type: "_Event",
        options: {
          outputId: "click",
        },
      },
      {
        title: "双击",
        type: "_Event",
        options: {
          outputId: "dblClick",
        },
      },
    ],
  },
};
