const getFocusItem = (props) => {
  const { data, focusArea } = props;
  if (!focusArea) return {};
  const { index } = focusArea;
  return data.contents[index];
};

export default {
  "@init": ({ style, data }) => {
    style.width = 375;
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":slot": {},

  ":root": {
    items: [
      {
        title: "标题",
        type: "text",
        value: {
          get({ data }) {
            return data.title;
          },
          set({ data, focusArea, slot }, value) {
            data.title = value;
          },
        },
      },
      {
        title: "默认状态",
        type: "radio",
        options: [
          { label: "展开", value: true },
          { label: "收起", value: false },
        ],
        value: {
          get({ data }) {
            return data.defaultValue;
          },
          set({ data }, value) {
            data.defaultValue = value;
          },
        },
      },
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
    ],
  },
  ".taroify-cell__title": {
    "@dblclick": {
      type: "text",
      value: {
        get({ data }) {
          return data.title;
        },
        set({ data }, value) {
          data.title = value;
        },
      },
    },
  },
};
