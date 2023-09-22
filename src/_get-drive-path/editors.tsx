export default {
  ":root": (_, cate0, cate1) => {
    cate0.title = '配置',
    cate0.items = [
      {
        title: "调整地图视区",
        description: "将地图根据规划的路线进行缩放适配",
        type: "switch",
        value: {
          get({ data }) {
            return data.autofit;
          },
          set({ data }, value: boolean) {
            data.autofit = value;
          },
        },
      },
      {},
      {
        title: "路线宽度",
        type: "text",
        value: {
          get({ data }) {
            return data.width;
          },
          set({ data }, value: string) {
            data.width = value;
          },
        },
      },
      {
        title: "路线颜色",
        type: "colorpicker",
        value: {
          get({ data }) {
            return data.color;
          },
          set({ data }, value: string) {
            data.color = value;
          },
        },
      },
      {
        title: "是否带箭头的虚线",
        type: "switch",
        value: {
          get({ data }) {
            return data.arrowLine;
          },
          set({ data }, value: boolean) {
            data.arrowLine = value;
          },
        },
      },
      {
        title: "是否虚线",
        type: "switch",
        value: {
          get({ data }) {
            return data.dottedLine;
          },
          set({ data }, value: boolean) {
            data.dottedLine = value;
          },
        },
      },
      {},
      {
        title: "边框宽度",
        type: "text",
        value: {
          get({ data }) {
            return data.borderWidth;
          },
          set({ data }, value: string) {
            data.borderWidth = value;
          },
        },
      },
      {
        title: "边框颜色",
        type: "colorpicker",
        value: {
          get({ data }) {
            return data.borderColor;
          },
          set({ data }, value: string) {
            data.borderColor = value;
          },
        },
      },
      {},
      {
        title: "起点图标",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.start?.icon;
          },
          set({ data }, src: string) {
            data.start.icon = src;
          },
        },
      },
      {
        title: '起点图标大小',
        type: 'inputnumber',
        options: [
          { title: '宽', width: 100 },
          { title: '高', width: 100 }
        ],
        value: {
          get({ data }: any) {
            return [data.start.width, data.start.height];
          },
          set({ data }: any, value: [number, number]) {
            [data.start.width, data.start.height] = value;
          }
        }
      },
      {},
      {
        title: "终点图标",
        type: "imageSelector",
        value: {
          get({ data }) {
            return data.end?.icon;
          },
          set({ data }, src: string) {
            data.end.icon = src;
          },
        },
      },
      {
        title: '终点图标大小',
        type: 'inputnumber',
        options: [
          { title: '宽', width: 100 },
          { title: '高', width: 100 }
        ],
        value: {
          get({ data }: any) {
            return [data.end.width, data.end.height];
          },
          set({ data }: any, value: [number, number]) {
            [data.end.width, data.end.height] = value;
          }
        }
      },
    ]

  }
};
