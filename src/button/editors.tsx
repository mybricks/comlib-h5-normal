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
            title: "类型",
            type: "select",
            options: [
              {
                label: "自定义",
                value: "",
              },
              {
                label: "打开客服会话",
                value: "contact",
              },
              {
                label: "触发用户转发",
                value: "share",
              },
              {
                label: "手机号快速验证",
                value: "getPhoneNumber",
              },
              {
                label: "手机号实时验证",
                value: "getRealtimePhoneNumber",
              },
              {
                label: "获取用户信息",
                value: "getUserInfo",
              },
              {
                label: "打开APP",
                value: "launchApp",
              },
              {
                label: "打开授权设置页",
                value: "openSetting",
              },
              {
                label: "打开“意见反馈”页面",
                value: "feedback",
              },
              {
                label: "获取用户头像",
                value: "chooseAvatar",
              },
              {
                label: "用户同意隐私协议按钮",
                value: "agreePrivacyAuthorization",
              },
            ],
            value: {
              get({ data }) {
                return data.openType;
              },
              set({ data }, value) {
                data.openType = value;
              },
            },
          },
          {
            ifVisible({ data }) {
              return !data.openType;
            },
            title: "单击",
            type: "_event",
            options: {
              outputId: "onClick",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getPhoneNumber";
            },
            title: "手机号快速验证成功",
            type: "_event",
            options: {
              outputId: "getPhoneNumberSuccess",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getPhoneNumber";
            },
            title: "手机号快速验证失败",
            type: "_event",
            options: {
              outputId: "getPhoneNumberFail",
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
        target: ".mybricks-beforeIcon",
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
        target: ".mybricks-afterIcon",
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
