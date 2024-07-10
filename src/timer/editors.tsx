export default {
  '@init'({ style }) {
    style.width = "auto";
    style.height = 'auto';
  },
  '@resize': {
    options: ['width', 'height'],
  },
  ':root': {
    style: [
      {
        title: "计时器文字",
        options: ["font", "border", "background", "margin"],
        target: ".mybricks_timer",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = '常规';
      cate0.items = [
        {
          items: [
            // {
            //   title:"临时-颜色",
            //   type: 'colorpicker',
            //   value: {
            //     get({ data }) {
            //       return data.color;
            //     },
            //     set({ data}, value: string) {
            //       data.color = value;
            //     },
            //   },
            // },
            // {
            //   title:"临时-大小",
            //   type: 'textinput',
            //   value: {
            //     get({ data }) {
            //       return data.size;
            //     },
            //     set({ data}, value: string) {
            //       data.size = value;
            //     },
            //   },
            // },
            {
              title:"时钟类型",
              type: 'select',
              options: [
                { label:'当前时间',value:'realtime'},
                { label: '倒计时', value: 'countdown' },
                { label: '计时器', value: 'timer' },
              ],
              value: {
                get({ data }) {
                  return data.clockType;
                },
                set({ data }, value: string) {
                  data.clockType = value;
                },
              },
            },
            {
              title:"倒计时",
              type:"textinput",
              ifVisible: ({ data }) => {
                return data.clockType === 'countdown';
              },
              value: {
                get({ data }) {
                  return data.countdown;
                },
                set({ data }, value: string) {
                  data.countdown = value;
                },
              },
            },
            {
              title: "事件",
              items: [
                {
                  title:"当前时间",
                  type: "_event",
                  options: {
                    outputId: "currentTime",
                  },
                },
                {
                  title: "倒计时结束触发",
                  ifVisible: ({ data }) => {
                    return data.clockType === 'countdown';
                  },
                  type: "_event",
                  options: {
                    outputId: "finishCountDown",
                  },
                }
              ],
            },
            
          ],
        },
      ];
    }

  },
};
