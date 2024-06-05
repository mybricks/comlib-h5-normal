export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = 85;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "宫格间距",
        type: "InputNumber",
        options: [{ min: 0 }],
        value: {
          get({ data }) {
            return [data.gutter];
          },
          set({ data }, value) {
            data.gutter = value[0];
          },
        },
      },
      {
        title: "宫格样式配置",
        options: ["font", "border", "background", "margin"],
        target: ".mybricks-input-item",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "验证码位数",
          type: "InputNumber",
          options: [{ min: 1, max: 8 }],
          description: "输入的位数限制 1~8",
          value: {
            get({ data }) {
              return [data.length];
            },
            set({ data }, value) {
              data.length = value[0];
            },
          },
        },
        {
          title: "验证码倒数秒数",
          type: "InputNumber",
          options: [{ min: 1 }],
          value: {
            get({ data }) {
              return [data.countdown];
            },
            set({ data }, value) {
              data.countdown = value[0];
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "当值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
            {
              title: "填满输入框时",
              type: "_event",
              options: {
                outputId: "onComplete",
              },
            },
            {
              title: "发送验证码",
              type: "_event",
              options: {
                outputId: "onSendSMS",
              },
            },
          ],
        },
      ];
    },
  },
};
