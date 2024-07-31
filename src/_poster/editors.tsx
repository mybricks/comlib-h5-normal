export default {
  ":root": [
    {
      title: "画布尺寸",
      description: "单位为像素，为了保证图片质量，建议将画布尺寸设置为最终输出图片的尺寸2-3倍。",
      type: "inputnumber",
      options: [
        { title: "宽", width: 100 },
        { title: "高", width: 100 },
      ],
      value: {
        get({ data }: any) {
          return [data.canvasWidth, data.canvasHeight];
        },
        set({ data }: any, value: [number, number]) {
          [data.canvasWidth, data.canvasHeight] = value;
        },
      },
    },
  ],
};
