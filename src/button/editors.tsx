import { ButtonType } from "./constant";
import css from "./style.less";
import IconSelector from "../editors/iconSelector";

const MAP = {
  getPhoneNumber: {
    title: "手机号快速验证",
    output: [
      {
        id: "getPhoneNumberSuccess",
        title: "获取动态令牌成功（仅支持真机）",
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
        title: "获取动态令牌失败（仅支持真机）",
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
  openSetting: {
    title: "打开设置页面",
    output: [
      {
        id: "openSetting",
        title: "打开设置页面",
        schema: {
          type: "any",
        },
      },
    ],
  },
  getRealtimePhoneNumber: {
    title: "手机号实时验证",
    output: [
      {
        id: "getRealtimePhoneNumberSuccess",
        title: "获取动态令牌成功（仅支持真机）",
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
        title: "获取动态令牌失败（仅支持真机）",
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
  share: {
    title: "触发用户转发",
    output: [
      {
        id: "share",
        title: "用户转发",
        schema: {
          type: "any",
        },
      },
    ],
  },
  contact: {
    title: "打开客服会话",
    output: [
      {
        id: "onContact",
        title: "客服消息回调",
        schema: {
          type: "any",
        },
      },
    ],
  },
  feedback: {
    title: "打开意见反馈页面",
    output: [],
  },
  chooseAvatar: {
    title: "选择头像成功",
    output: [
      {
        id: "chooseAvatarSuccess",
        title: "选择头像成功（仅支持真机）",
        schema: {
          type: "string",
        },
      },
    ],
  },
};

function clearOutput(openType, output) {
  switch (true) {
    case openType === "getPhoneNumber":
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("share");
      output.remove("onContact");
      output.remove("feedback");
      output.remove("openSetting");
      output.remove("onClick");
      output.remove("chooseAvatarSuccess");
      break;

    case openType === "getRealtimePhoneNumber":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("share");
      output.remove("onContact");
      output.remove("feedback");
      output.remove("openSetting");
      output.remove("onClick");
      output.remove("chooseAvatarSuccess");
      break;

    case openType === "share":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("onContact");
      output.remove("feedback");
      output.remove("openSetting");
      output.remove("onClick");
      output.remove("chooseAvatarSuccess");
      break;

    case openType === "contact":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("share");
      output.remove("feedback");
      output.remove("openSetting");
      output.remove("onClick");
      output.remove("chooseAvatarSuccess");
      break;

    case openType === "feedback":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("share");
      output.remove("onContact");
      output.remove("openSetting");
      output.remove("onClick");
      output.remove("chooseAvatarSuccess");
      break;

    case openType === "openSetting":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("share");
      output.remove("onContact");
      output.remove("feedback");
      output.remove("onClick");
      output.remove("chooseAvatarSuccess");
      break;

    case openType === "chooseAvatar":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("share");
      output.remove("onContact");
      output.remove("feedback");
      output.remove("openSetting");
      output.remove("onClick");
      break;

    // onClick
    default:
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("share");
      output.remove("onContact");
      output.remove("feedback");
      output.remove("openSetting");
      output.remove("chooseAvatarSuccess");
      break;
  }
}

function iconEditor(type: string) {
  const kesMap = {
    before: {
      useIcon: "useBeforeIcon",
      useIconImg: "useBeforeIconImg",
      iconUrl: "beforeIconUrl",
      icon: "beforeIcon",
      iconSize: "beforeIconSize",
      iconColor: "beforeIconColor",
      iconSpacing: "beforeIconSpacing",
    },
    after: {
      useIcon: "useAfterIcon",
      useIconImg: "useAfterIconImg",
      iconUrl: "afterIconUrl",
      icon: "afterIcon",
      iconSize: "afterIconSize",
      iconColor: "afterIconColor",
      iconSpacing: "afterIconSpacing",
    },
  };
  const curKey = kesMap[type];
  const typeStr = type === "before" ? "前置" : "后置";
  return [
    {
      title: `${typeStr}图标`,
      description: `是否显示${typeStr}图标`,
      type: "switch",
      value: {
        get({ data }) {
          return data[curKey.useIcon];
        },
        set({ data }, value) {
          data[curKey.useIcon] = value;
        },
      },
    },
    {
      title: "图标自定义",
      description: `开启后可上传自定义${typeStr}图标`,
      type: "switch",
      ifVisible({ data }) {
        return data[curKey.useIcon];
      },
      value: {
        get({ data }) {
          return data[curKey.useIconImg] ?? false;
        },
        set({ data }, value) {
          data[curKey.useIconImg] = value;
        },
      },
    },
    {
      title: "图标地址",
      description: `上传${typeStr}图标的自定义图标图片`,
      type: "imageSelector",
      ifVisible({ data }) {
        return data[curKey.useIcon] && data[curKey.useIconImg];
      },
      value: {
        get({ data }) {
          return data[curKey.iconUrl];
        },
        set({ data }, value) {
          data[curKey.iconUrl] = value;
        },
      },
    },
    {
      title: "图标",
      description: `选择${typeStr}图标`,
      type: "editorRender",
      options: {
        render: (props) => {
          return <IconSelector value={props.editConfig.value} />;
        },
      },
      ifVisible({ data }) {
        return data[curKey.useIcon] && !data[curKey.useIconImg];
      },
      value: {
        get({ data }) {
          return data[curKey.icon] ?? "HM_plus";
        },
        set({ data }, value: string) {
          data[curKey.icon] = value;
        },
      },
    },
    {
      title: "大小",
      description: `${typeStr}图标大小`,
      type: "inputnumber",
      options: [{ min: 1 }],
      ifVisible({ data }) {
        return data[curKey.useIcon] && !data[curKey.useIconImg];
      },
      value: {
        get({ data }) {
          return [data[curKey.iconSize] ?? 16];
        },
        set({ data }, value: string) {
          if (Array.isArray(value)) {
            data[curKey.iconSize] = value?.[0];
          } else {
            data[curKey.iconSize] = value;
          }
        },
      },
    },
    {
      title: "颜色",
      description: `${typeStr}图标颜色`,
      type: "colorpicker",
      ifVisible({ data }) {
        return data[curKey.useIcon] && !data[curKey.useIconImg];
      },
      value: {
        get({ data }) {
          return data[curKey.iconColor] ?? "#fff";
        },
        set({ data }, value: string) {
          data[curKey.iconColor] = value;
        },
      },
    },
    {
      title: "图标与文字间距",
      description: `${typeStr}图标与按钮文字之间的间距`,
      type: "inputnumber",
      options: [{ min: 0 }],
      ifVisible({ data }) {
        return data[curKey.useIcon];
      },
      value: {
        get({ data }) {
          return [data[curKey.iconSpacing] ?? 8];
        },
        set({ data }, value: string) {
          if (Array.isArray(value)) {
            data[curKey.iconSpacing] = value?.[0];
          } else {
            data[curKey.iconSpacing] = value;
          }
        },
      },
    },
  ];
}

export default {
  "@init"({ style, data, output, input }) {
    style.width = 120;
    style.height = 42;
    if (data?.useButtonImg) {
      input.add("buttonImg", "修改按钮图片", { type: "string" });
      // input.remove("buttonText");
    } else {
      input.add("buttonText", "修改按钮文本", { type: "string" });
      // input.remove("buttonImg");
    }
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        items: [
          {
            title: "按钮",
            catelog: "默认",
            options: ["font", "border", "padding", "background", "boxshadow"],
            target: ".mybricks-button",
            defaultOpen: true,
          },
          {
            title: "按钮",
            catelog: "禁用",
            options: ["font", "border", "padding", "background", "boxshadow"],
            target: ".mybricks-button-disable",
            defaultOpen: true,
          },
        ],
      },
    ],
    items: [
      {
        title: "基础属性",
        items: [
          {
            title: "按钮文案",
            description: "按钮上显示的文字",
            type: "text",
            ifVisible({ data }: EditorResult<Data>) {
              return !data.useButtonImg;
            },
            value: {
              get({ data }) {
                return data.text;
              },
              set({ data, outputs }, value: string) {
                data.text = value;
              },
            },
            // binding: {
            //   with: 'data.text',
            //   scheme: {
            //     type: 'string'
            //   }
            // }
          },
          {
            title: "禁用按钮",
            description: "是否禁用按钮点击",
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
        ],
      },
      {
        title: "高级属性",
        items: [
          {
            title: "配置为图片按钮",
            description: "开启后按钮将显示为图片，按钮文案将被忽略",
            type: "switch",
            value: {
              get({ data }) {
                return data.useButtonImg;
              },
              set({ data, input }, value) {
                data.useButtonImg = value;
                if (data.useButtonImg) {
                  input.add("buttonImg", "修改按钮图片", { type: "string" });
                  input.remove("buttonText");
                } else {
                  input.add("buttonText", "修改按钮文本", { type: "string" });
                  input.remove("buttonImg");
                }
              },
            },
          },
          {
            title: "按钮图片",
            description: "图片按钮显示的图片",
            type: "imageSelector",
            ifVisible({ data }: EditorResult<Data>) {
              return data.useButtonImg;
            },
            value: {
              get({ data }) {
                return data.buttonImg;
              },
              set({ data }, value) {
                data.buttonImg = value;
              },
            },
          },
          ...iconEditor("before"),
          ...iconEditor("after"),
        ],
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
              // {
              //   label: "获取用户信息",
              //   value: "getUserInfo",
              // },
              // {
              //   label: "打开APP",
              //   value: "launchApp",
              // },
              {
                label: "打开授权设置页",
                value: "openSetting",
              },
              {
                label: "打开客服会话",
                value: "contact",
              },
              {
                label: "打开“意见反馈”页面",
                value: "feedback",
              },
              {
                label: "获取用户头像",
                value: "chooseAvatar",
              },
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

                  case data.openType === "openSetting":
                    MAP["openSetting"].output.forEach((item) => {
                      output.add(item);
                    });
                    break;

                  case data.openType === "share":
                    MAP["share"].output.forEach((item) => {
                      output.add(item);
                    });
                    break;

                  case data.openType === "chooseAvatar":
                    MAP["chooseAvatar"].output.forEach((item) => {
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
              return data.openType === "openSetting";
            },
            title: "打开授权页时触发",
            type: "_event",
            options: {
              outputId: "openSetting",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "share";
            },
            title: "用户转发时触发",
            type: "_event",
            options: {
              outputId: "share",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getPhoneNumber";
            },
            title: "获取动态令牌成功（仅支持真机）",
            type: "_event",
            options: {
              outputId: "getPhoneNumberSuccess",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getPhoneNumber";
            },
            title: "获取动态令牌失败（仅支持真机）",
            type: "_event",
            options: {
              outputId: "getPhoneNumberFail",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getRealtimePhoneNumber";
            },
            title: "获取动态令牌成功（仅支持真机）",
            type: "_event",
            options: {
              outputId: "getRealtimePhoneNumberSuccess",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "getRealtimePhoneNumber";
            },
            title: "获取动态令牌失败（仅支持真机）",
            type: "_event",
            options: {
              outputId: "getRealtimePhoneNumberFail",
            },
          },
          {
            ifVisible({ data }) {
              return data.openType === "chooseAvatar";
            },
            title: "获取头像成功（仅支持真机）",
            type: "_event",
            options: {
              outputId: "chooseAvatarSuccess",
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
  ".mybricks-button-text": {
    "@dblclick": {
      type: "text",
      value: {
        get({ data }) {
          return data.text;
        },
        set({ data }, val) {
          data.text = val;
        },
      },
    },
  },
};
