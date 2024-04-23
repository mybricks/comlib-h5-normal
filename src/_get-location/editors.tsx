export default {
  ":root": [
    {
      title: '是否开启高精度定位',
      description: '开启后定位更精准，但是会增加定位的时间',
      type: 'Switch',
      value: {
        get({ data }) {
          return data.isHighAccuracy ?? false;
        },
        set({ data }, value: boolean) {
          data.isHighAccuracy = value;
        }
      }
    },
  ],
};