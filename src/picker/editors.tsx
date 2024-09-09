export default {
  "@init"({ style }) {
    style.width = "100%";
    style.height = "auto";
  },
  ":root": {
    style: [
      {
        title: "顶部栏标题",
        options: ["font"],
        target: ".mybricks-title",
      },
      {
        title: "确认按钮",
        options: ["font"],
        target: ".mybricks-confirm",
      },
      {
        title: "取消按钮",
        options: ["font"],
        target: ".mybricks-cancel",
      },
      {
        title: "激活项指示器",
        options: ["background", "border"],
        target: ".mybricks-centerIndicator",
      },
    ],
    items({ inputs }, cate0, cate1, cate2) {
      // 临时升级
      if (!inputs.get("setTitle")) {
        inputs.add({
          id: "setTitle",
          title: "设置标题",
          schema: {
            type: "string",
          },
        });
      }

      cate0.title = "常规";
      cate0.items = [
        {
          title: "选项",
          type: "array",
          options: {
            getTitle: (item, index) => {
              return `选项：${item.label}`;
            },
            onAdd(_id) {
              return {
                label: `选项`,
                value: `选项${_id}`,
              };
            },
            items: [
              {
                title: "选项名",
                type: "text",
                value: "label",
              },
              {
                title: "选项值",
                type: "text",
                value: "value",
              },
            ],
          },
          value: {
            get({ data }) {
              return data.options;
            },
            set({ data }, value) {
              data.options = value;
            },
          },
        },
        {
          title: "选项默认渲染方式",
          type: "radio",
          description:
            "当选择使用动态数据时，默认不渲染选项，需要通过「设置选项」输入项动态设置",
          options: [
            { label: "使用静态数据", value: "static" },
            { label: "使用动态数据", value: "dynamic" },
          ],
          value: {
            get({ data }) {
              return data.defaultRenderMode || "static";
            },
            set({ data }, value) {
              data.defaultRenderMode = value;
            },
          },
        },
        {},
        {
          title: "顶部栏标题",
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
        {
          title: "确认按钮文字",
          type: "text",
          value: {
            get({ data }) {
              return data.confirmText;
            },
            set({ data }, value) {
              data.confirmText = value;
            },
          },
        },
        {
          title: "取消按钮文字",
          type: "text",
          value: {
            get({ data }) {
              return data.cancelText;
            },
            set({ data }, value) {
              data.cancelText = value;
            },
          },
        },
        {},
        {
          title: "事件",
          items: [
            {
              title: "选中项变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
            {
              title: "点击确认按钮",
              type: "_event",
              options: {
                outputId: "onConfirm",
              },
            },
            {
              title: "点击取消按钮",
              type: "_event",
              options: {
                outputId: "onCancel",
              },
            },
          ],
        },
      ];
    },
  },
};
