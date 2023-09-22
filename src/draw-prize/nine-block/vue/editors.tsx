export default {
  '@init'({ style }) {
    style.width = "100%";
    style.height = 'auto';
  },
  '@resize': {
    options: ['width', 'height'],
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规';
    cate0.items = [
      {
        items: [
          {
            title:"抽奖栏标题",
            type:"text",
            value:{
              get({data}){
                return data.title;
              },
              set({data},title:string){
                data.title = title;
              }
            }

          },
          {
            title: "按钮图标",
            type: "imageSelector",
            value: {
              get({ data }) {
                return data.buttonImg;
              },
              set({ data }, buttonImg: string) {
                data.buttonImg = buttonImg;
              },
            },
          },
          {
            title: "抽奖ID",
            type: "text",
            value: {
              get({ data }) {
                return data.prizeId;
              },
              set({ data }, prizeId: string) {
                data.prizeId = prizeId;
              },
            },
          },
          {},
          {
            title: "动作",
            items: [
              {
                title: "抽奖成功后",
                type: "_event",
                options: {
                  outputId: "priceResult",
                },
              },
            ],
          },
        ],
      },
    ];
  },
};
