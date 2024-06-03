export default {
  ":root": [
    {
      title: "最大选取照片数",
      description: "一次可以同时选取的照片数（支持的范围：1~9）",
      type: "text",
      options: {
        type: "number",
      },
      value: {
        get({ data }: EditorResult<Data>) {
          return data.photoCount;
        },
        set({ data }: EditorResult<Data>, value: string) {
          console.log("value", parseInt(`${value}`, 10));
          data.photoCount = parseInt(`${value}`, 10) || 1;
        },
      },
    },
    {
      title: "照片选取方式",
      type: "select",
      options: [
        { value: "both", label: "相机和相册" },
        { value: "camera", label: "仅限打开相机" },
        { value: "album", label: "仅限打开相册" },
      ],
      value: {
        get({ data }) {
          return data.selectMethod;
        },
        set({ data }, value) {
          data.selectMethod = value;
          if(value === 'both') {
            data.selectMethodConfig = ['album', 'camera']
            return
          }
          if(value === 'camera') {
            data.selectMethodConfig = ['camera']
            return
          }
          if(value === 'album') {
            data.selectMethodConfig = ['album']
            return
          }
        },
      },
    },
  ],
};