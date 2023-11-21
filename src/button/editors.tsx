import { ButtonType } from "./constant";
import css from "./style.less";

export default {
  "@init"({ style, data }) {
    style.width = 70;
    style.height = 35;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "按钮",
        options: ["font", "border", "padding", "background"],
        target: ".mybricks-button",
      },
    ],
    items: [
      {
        title: "按钮文案",
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
        title: "展示前置图标",
        type: "switch",
        value: {
          get({ data }) {
            return data.useBeforeIcon;
          },
          set({ data }, value) {
            data.useBeforeIcon = value;
          },
        },
      },
      {
        title: "展示后置图标",
        type: "switch",
        value: {
          get({ data }) {
            return data.useAfterIcon;
          },
          set({ data }, value) {
            data.useAfterIcon = value;
          },
        },
      },
      {
        title: "事件",
        items: [
          {
            title: "单击",
            type: "_event",
            options: {
              outputId: "onClick",
            },
          },
        ],
      },
    ],
  },
  ".mybricks-beforeIcon": {
    style: [
      {
        title: "前置图标",
        options: ["size", "margin"],
        target: ".mybricks-beforeIcon"
      },
    ],
    items: [
      {
        title: "图片",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.beforeIconUrl;
          },
          set({ data }, value) {
            data.beforeIconUrl = value;
          },
        },
      },
    ],
  },
  ".mybricks-afterIcon": {
    style: [
      {
        title: "后置图标",
        options: ["size", "margin"],
        target: ".mybricks-afterIcon"
      },
    ],
    items: [
      {
        title: "图片",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.afterIconUrl;
          },
          set({ data }, value) {
            data.afterIconUrl = value;
          },
        },
      },
    ],
  },

};
