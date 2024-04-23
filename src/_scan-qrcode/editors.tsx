export default {
  ":root": [
    {
      title: '是否只允许从相机扫码',
      type: 'Switch',
      description:'是否只能从相机扫码，不允许从相册选择图片',
      value: {
        get({ data }) {
          return data.onlyFromCamera;
        },
        set({ data }, value: boolean) {
          data.onlyFromCamera = value;
        }
      }
    },
  ],
};