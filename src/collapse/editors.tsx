const getFocusItem = (props) => {
  const { data, focusArea } = props;
  if (!focusArea) return {};
  const { index } = focusArea;
  return data.contents[index];
};

export default {
  "@resize": {
    options: ["width"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [];
    cate1.title = "样式";
    cate1.items = [
      {
        title: "样式",
        type: "style",
        options: {
          defaultOpen: true,
          plugins: ["border", "font", "bgcolor", "bgimage"],
          fontProps: {
            fontFamily: false,
          },
        },
        value: {
          get: ({ data }: EditorResult<any>) => {
            return data.style;
          },
          set: ({ data }: EditorResult<any>, value) => {
            data.style = value;
          },
        },
      },
    ];

    cate2.title = "高级";
    cate2.items = [];
  },
  ".taroify-collapse-item__title": {
    title: "常规",
    items: (props, cate0) => {
      if (!props.focusArea) return;
      const focusItem = getFocusItem(props);

      (cate0.title = "常规"),
        (cate0.items = [
          {
            title: "标题",
            type: "text",
            value: {
              get({ data, focusArea }) {
                return focusItem?.title;
              },
              set({ data, focusArea, slot }, value) {
                if (!focusArea) return;
                focusItem.title = value;
                slot.setTitle(`cont_${focusItem.id}`, value);
              },
            },
          },
        ]);
    },
  },

  ".taroify-cell__title": {
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          const { data, focusArea } = props
          if (!props.focusArea) return;
          const focusItem = getFocusItem(props);
          return focusItem?.title;
        },
        set(props, value) {
          const { data, focusArea, slot } =props
          if (!focusArea) return;
          const focusItem = getFocusItem(props);
          focusItem.title = value;
          slot.setTitle(`cont_${focusItem.id}`, value);
        },
      },
    },
  },
};
