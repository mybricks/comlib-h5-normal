export default {
  description: `输入框`,
  data: {
    placeholder: '请输入内容',
    disabled: false
  },
  editors: {
    // ':root': {
    //   title: '输入框',
    //   items: [
    //     {
    //       title: '样式',
    //       type: 'style',
    //       options: ["padding", "border", "background", "font"],
    //     }
    //   ]
    // },
    '.taroify-input': {
      title: '输入框',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ["padding", "border", "background", "font"],
        },
        {
          title: "提示内容",
          description: "该提示内容会在值为空时显示",
          type: "text",
          value: {
            get({ data }) {
              return data.placeholder;
            },
            set({ data }, value) {
              data.placeholder = value;
            },
          },
        },
      ]
    },
    '.taroify-native-input': {
      title: '输入区域',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ["padding"],
        }
      ]
    }
  },
  docs: require("./Input.md").default,
};
