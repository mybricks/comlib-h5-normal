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
      }
    ],
  },
};

function clearOutput(getPhoneNumberMethod, output) {
  switch (true) {
    case getPhoneNumberMethod === "getPhoneNumber":
      output.remove("getRealtimePhoneNumberSuccess");
      output.remove("getRealtimePhoneNumberFail");
      output.remove("onChange");
      break;

    case getPhoneNumberMethod === "getRealtimePhoneNumber":
      output.remove("getPhoneNumberSuccess");
      output.remove("getPhoneNumberFail");
      output.remove("onChange");
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
        title: "授权按钮",
        options: ["font", "border", "size", "padding", "background"],
        target: ".mybricks-getphonenumber-button",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "手机号获取方式",
          type: "radio",
          description: "实时验证仅微信小程序端支持",
          options: [
            { label: "实时验证", value: "getRealtimePhoneNumber" },
            { label: "快速验证", value: "getPhoneNumber" },
            { label: "手动输入", value: "customInput" },
          ],
          value: {
            set({ data, output }, value) {
              data.getPhoneNumberMethods = value;
              clearOutput(value, output);
              switch (value) {
                case "getRealtimePhoneNumber":
                  data.placeholder = "请授权手机号";
                  data.buttonText = "点击授权";
                  MAP["getRealtimePhoneNumber"].output.forEach((item) => {
                    output.add(item);
                  });
                  break;
                case "getPhoneNumber":
                  data.placeholder = "请授权手机号";
                  data.buttonText = "点击授权";
                  MAP["getPhoneNumber"].output.forEach((item) => {
                    output.add(item);
                  });
                  break;
                case "customInput":
                  data.placeholder = "请输入手机号";
                  MAP["customInput"].output.forEach((item) => {
                    output.add(item);
                  }); 
                  break;
              }
            },
            get({ data }) {
              return data.getPhoneNumberMethods;
            },
          },
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
        {
          title: "按钮文案",
          type: "text",
          ifVisible({ data }) {
            return data.getPhoneNumberMethods !== "customInput";
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
          title: "事件",
          items: [
            {
              ifVisible({ data }) {
                return data.getPhoneNumberMethods === "getPhoneNumber";
              },
              title: "获取动态令牌成功",
              type: "_event",
              options: {
                outputId: "getPhoneNumberSuccess",
              },
            },
            {
              ifVisible({ data }) {
                return data.getPhoneNumberMethods === "getPhoneNumber";
              },
              title: "获取动态令牌失败",
              type: "_event",
              options: {
                outputId: "getPhoneNumberFail",
              },
            },
            {
              ifVisible({ data }) {
                return data.getPhoneNumberMethods === "getRealtimePhoneNumber";
              },
              title: "获取动态令牌成功",
              type: "_event",
              options: {
                outputId: "getRealtimePhoneNumberSuccess",
              },
            },
            {
              ifVisible({ data }) {
                return data.getPhoneNumberMethods === "getRealtimePhoneNumber";
              },
              title: "获取动态令牌失败",
              type: "_event",
              options: {
                outputId: "getRealtimePhoneNumberFail",
              },
            },
            {
              ifVisible({ data }) {
                return data.getPhoneNumberMethods === "customInput";
              },
              title: "当输入的手机号变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
            {
              ifVisible({ data }) {
                return data.getPhoneNumberMethods === "customInput";
              },
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
