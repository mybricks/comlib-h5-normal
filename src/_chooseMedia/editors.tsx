import { imageSchema, videoSchema } from "./const";
export default {
  ":root": [
    {
      title: "文件类型",
      type: "select",
      options: [
        { label: "图片", value: "image" },
        { label: "视频", value: "video" },
      ],
      value: {
        get({ data }) {
          return data.mediaType[0];
        },
        set({ data, outputs }, value) {
          data.mediaType = [value];

          switch (value) {
            case "image": {
              outputs.get("onSuccess").setSchema(imageSchema);
              break;
            }
            case "video": {
              outputs.get("onSuccess").setSchema(videoSchema);
              break;
            }
          }
        },
      },
    },
    {
      title: "最多可选文件个数",
      description: "最多可以选择的文件个数（支持的范围：1~20）",
      type: "inputnumber",
      options: [{ min: 1, max: 20 }],
      value: {
        get({ data }) {
          return [data.count];
        },
        set({ data }, value) {
          data.count = value[0];
        },
      },
    },
    {
      title: "文件来源",
      description: "图片和视频选择的来源",
      type: "select",
      options: {
        mode: "tags",
        multiple: true,
        options: [
          { label: "相册", value: "album" },
          { label: "拍照", value: "camera" },
        ],
      },
      value: {
        get({ data }) {
          return data.sourceType;
        },
        set({ data }, value) {
          data.sourceType = value;
        },
      },
    },
    {
      title: "是否支持压缩所选文件",
      description: "是否压缩所选文件，仅小程序支持",
      type: "select",
      options: {
        mode: "tags",
        multiple: true,
        options: [
          { label: "原始", value: "original" },
          { label: "压缩", value: "compressed" },
        ],
      },
      value: {
        get({ data }) {
          return data.sizeType;
        },
        set({ data }, value) {
          data.sizeType = value;
        },
      },
    },
  ],
};
