import { ButtonType } from "./constant";
import css from "./style.less";

const MAP = {
  getPhoneNumber: {
    title: "手机号快速验证",
    output: [
      {
        id: "getPhoneNumberSuccess",
        title: "获取动态令牌成功",
        schema: {
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            errMsg: {
              type: "string",
            },
          },
        },
      },
      {
        id: "getPhoneNumberFail",
        title: "获取动态令牌失败",
        schema: {
          type: "object",
          properties: {
            errno: {
              type: "number",
            },
            errMsg: {
              type: "string",
            },
          },
        },
      },
    ],
  },
  getRealtimePhoneNumber: {
    title: "手机号实时验证",
    output: [
      {
        id: "getRealtimePhoneNumberSuccess",
        title: "获取动态令牌成功",
        schema: {
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            errMsg: {
              type: "string",
            },
          },
        },
      },
      {
        id: "getRealtimePhoneNumberFail",
        title: "获取动态令牌失败",
        schema: {
          type: "object",
          properties: {
            errno: {
              type: "number",
            },
            errMsg: {
              type: "string",
            },
          },
        },
      },
    ],
  },
};

function clearOutput(openType, output) {
  switch (true) {
    case openType === "getPhoneNumber":
      output.remove("onClick");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      break;

    case openType === "getRealtimePhoneNumber":
      output.remove("onClick");
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      break;

    // onClick
    default:
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
  }
}

export default {
  "@init"({ style, data, output }) {
    style.width = 120;
    style.height = 42;
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
        defaultOpen: true,
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
        title: "禁用按钮",
        type: "switch",
        value: {
          get({ data }) {
            return data.disabled;
          },
          set({ data }, value) {
            data.disabled = value;
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
              // {
              //   label: "打开客服会话",
              //   value: "contact",
              // },
              // {
              //   label: "触发用户转发",
              //   value: "share",
              // },
              {
                label: "手机号快速验证",
                value: "getPhoneNumber",
              },
              {
                label: "手机号实时验证",
                value: "getRealtimePhoneNumber",
              },
              // {
              //   label: "获取用户信息",
              //   value: "getUserInfo",
              // },
              // {
              //   label: "打开APP",
              //   value: "launchApp",
              // },
              // {
              //   label: "打开授权设置页",
              //   value: "openSetting",
              // },
              // {
              //   label: "打开“意见反馈”页面",
              //   value: "feedback",
              // },
              // {
              //   label: "获取用户头像",
              //   value: "chooseAvatar",
              // },
              // {
              //   label: "用户同意隐私协议按钮",
              //   value: "agreePrivacyAuthorization",
              // },
            ],
            value: {
              get({ data, outputs }) {
                return data.openType;
              },
              set({ data, output }, value) {
                data.openType = value;

                // 清空 output
                clearOutput(value, output);

                switch (true) {
                  case data.openType === "getPhoneNumber":
                    MAP["getPhoneNumber"].output.forEach((item) => {
                      output.add(item);
                    });
                    break;

                  case data.openType === "getRealtimePhoneNumber":
                    MAP["getRealtimePhoneNumber"].output.forEach((item) => {
                      output.add(item);
                    });
                    break;
                  default:
                    output.add({
                      id: "onClick",
                      title: "单击",
                      schema: {
                        type: "string",
                      },
                    });
                    break;
                }
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
            title: "获取动态令牌成功",
            type: "_event",
            options: {
              outputId: "getPhoneNumberSuccess",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getPhoneNumber";
            },
            title: "获取动态令牌失败",
            type: "_event",
            options: {
              outputId: "getPhoneNumberFail",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getRealtimePhoneNumber";
            },
            title: "获取动态令牌成功",
            type: "_event",
            options: {
              outputId: "getRealtimePhoneNumberSuccess",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getRealtimePhoneNumber";
            },
            title: "获取动态令牌失败",
            type: "_event",
            options: {
              outputId: "getRealtimePhoneNumberFail",
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
