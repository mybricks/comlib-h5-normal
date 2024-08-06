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
  customInput: {
    title: "手动输入",
    output: [
      {
        id: "onChange",
        title: "当值变化",
        schema: {
          type: "string",
        },
      },
      {
        id: "onCodeSend",
        title: "获取验证码",
        schema: {
          type: "number",
        },
      },
    ],
  },
};

function clearOutput(getPhoneNumberMethod, output) {
  switch (true) {
    case getPhoneNumberMethod === "getPhoneNumber":
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("onChange");
      output.remove("onCodeSend");
      break;

    case getPhoneNumberMethod === "getRealtimePhoneNumber":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("onChange");
      output.remove("onCodeSend");
      break;

    case getPhoneNumberMethod === "customInput":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
  }
}

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "输入框",
        options: ["font", "border", "size", "padding", "background"],
        target: ".taroify-input",
      },
      {
        title: "验证码按钮",
        options: [
          "font",
          "border",
          "size",
          "padding",
          "margin",
          "background",
          "boxshadow",
        ],
        target: ".mybricks-getsms-button",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
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
        {
          title: "按钮文案",
          type: "text",
          ifVisible({ data }) {
            return !data.customInput;
          },
          value: {
            get({ data }) {
              return data.buttonText;
            },
            set({ data }, value) {
              return (data.buttonText = value);
            },
          },
        },
        {
          title: "重新获取文案",
          type: "text",
          ifVisible({ data }) {
            return !data.customInput;
          },
          value: {
            get({ data }) {
              return data.buttonTextRetry;
            },
            set({ data }, value) {
              return (data.buttonTextRetry = value);
            },
          },
        },
        {
          title: "验证码倒计时",
          type: "InputNumber",
          options: [{ min: 30 }],
          description: "单位：秒（最小值 30秒）",
          value: {
            get({ data }) {
              return [data.smsCountdown];
            },
            set({ data }, value) {
              data.smsCountdown = value[0];
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "点击获取验证码",
              type: "_event",
              options: {
                outputId: "onCodeSend",
              },
            },
            {
              title: "当值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            }, 
            {
              title: "当失去焦点",
              type: "_event",
              options: {
                outputId: "onBlur",
              },
            }
          ],
        },
      ];
    },
  },
};
