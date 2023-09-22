import { uuid } from "../utils";

export default {
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "基础";
    cate0.items = [
      {
        title: "提示标题",
        type: "text",
        value: {
          get({ data }) {
            return data.title;
          },
          set({ data, setDesc }, value: string) {
            data.title = value;
          },
        },
      },
      {
        title: "提示内容",
        type: "text",
        value: {
          get({ data }) {
            return data.content;
          },
          set({ data, setDesc }, value: string) {
            data.content = value;
          },
        },
      },
      {
        title: "是否显示取消按钮",
        type: "Switch",
        value: {
          get({ data }) {
            return data.showCancel;
          },
          set({ data }, value: boolean) {
            data.showCancel = value;
          },
        },
      },
      {
        ifVisible: ({ data }) => {
          return data.showCancel;
        },
        title: "取消按钮的文字",
        type: "text",
        value: {
          get({ data }) {
            return data.cancelText;
          },
          set({ data }, value: string) {
            data.cancelText = value;
          },
        },
      },
      {
        ifVisible: ({ data }) => {
          return data.showCancel;
        },
        title: "取消按钮的文字颜色",
        type: "colorpicker",
        value: {
          get({ data }) {
            return data.cancelColor;
          },
          set({ data }, value: string) {
            data.cancelColor = value;
          },
        },
      },
      {
        title: "确认按钮的文字",
        type: "text",
        value: {
          get({ data }) {
            return data.confirmText;
          },
          set({ data }, value: string) {
            data.confirmText = value;
          },
        },
      },
      {
        title: "确认按钮的文字颜色",
        type: "colorpicker",
        value: {
          get({ data }) {
            return data.confirmColor;
          },
          set({ data }, value: string) {
            data.confirmColor = value;
          },
        },
      },
    ];
    cate1.title = "动作";
    cate1.items = [
      {
        title: "确认",
        type: "_event",
        options: {
          outputId: "onConfirm",
        },
      },
      {
        title: "取消",
        type: "_event",
        options: {
          outputId: "onCancel",
        },
      },
    ];
  },
};
