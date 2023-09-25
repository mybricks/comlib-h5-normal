export default {
  "@init"({ style, data, output }) {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": [
    {
      title: "领取按钮图标",
      type: "imageSelector",
      description: "尺寸为32x32",
      value: {
        get({ data }) {
          return data.buttonImg;
        },
        set({ data }, val: string) {
          data.buttonImg = val;
        },
      },
    },
    {
        title:"顶部介绍图标",
        type:"imageSelector",
        description:"尺寸为32x32",
        value:{
          get({data}){
            return data.topImg;
          },
          set({data},val:string){
            data.topImg = val;
          }
        }
    },
  ],
};
