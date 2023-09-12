const defualtStyle = {
  color: '#fff',
  minHeight: '300px',
};

export default {
  title: '加载状态',
  items: [
    {
      title: '动画颜色',
      type: 'colorpicker',
      catelog: '加载中',
      value: {
        get({ data }) {
          if (!data.loadingStyle) {
            data.loadingStyle = { ...defualtStyle };
          }
          return data.loadingStyle?.color;
        },
        set({ data }, value: string) {
          data.loadingStyle.color = value;
        },
      },
    },
    {
      title: '默认高度(px)',
      type: 'text',
      catelog: '默认',
      value: {
        get({ data }) {
          if (!data.loadingStyle) {
            data.loadingStyle = { ...defualtStyle };
          }
          return parseInt(data.loadingStyle.minHeight);
        },
        set({ data }, value) {
          data.loadingStyle.minHeight = value + 'px';
        },
      },
    },
  ],
};
