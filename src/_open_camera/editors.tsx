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
  ],
};