export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":slot": {},
  ":root": {
    style: [
      {
        title: "卡片尺寸",
        options: ["size", "border", "background"],
        target: ".mybricks-square",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "图片上传";
      cate0.items = [
        {
          title: "基础属性",
          items: [
            {
              title: "最大上传数量",
              description: "最多可以上传的图片数量",
              type: "text",
              options: {
                plugins: ["number"],
              },
              value: {
                get({ data }) {
                  return data.maxCount;
                },
                set({ data }, value) {
                  data.maxCount = value;
                },
              },
            },
            {
              title: "提示内容",
              description: "上传图片下方显示的提示文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.placeholderText;
                },
                set({ data }, value) {
                  data.placeholderText = value;
                },
              },
            },
            {
              title: "上传name(h5生效)",
              description: "上传图片时，后端接收的参数名",
              type: "text",
              value: {
                get({ data }) {
                  return data.uploadName;
                },
                set({ data }, value) {
                  data.uploadName = value;
                },
              },
            },
            {
              title: "上传filename(h5生效)",
              description: "上传图片时，后端接收的文件名参数名",
              type: "text",
              value: {
                get({ data }) {
                  return data.uploadFileName;
                },
                set({ data }, value) {
                  data.uploadFileName = value;
                },
              },
            },
          ],
        },
        {
          title: "高级属性",
          items: [
            {
              title: "示例图",
              description: "上传图片右侧显示的示例图",
              type: "imageSelector",
              options: {
                fileSizeLimit: 2,
              },
              value: {
                get({ data }) {
                  return data.placeholder;
                },
                set({ data }, value) {
                  data.placeholder = value;
                },
              },
            },
            {
              title: "支持获取微信头像",
              description: "是否支持用户选择微信头像",
              type: "Switch",
              value: {
                get({ data }) {
                  return data.chooseAvatar;
                },
                set({ data }, value) {
                  data.chooseAvatar = value;
                },
              },
            },
            {
              title: "开启占位插槽",
              description: "是否开启占位插槽, 用于自定义上传按钮",
              type: "Switch",
              value: {
                get({ data }) {
                  return data.iconSlot;
                },
                set({ data }, value) {
                  data.iconSlot = value;
                },
              },
            },
            {
              title: "格式化为字符串",
              description: "仅在最大上传数量为1时有效",
              type: "switch",
              value: {
                get({ data }) {
                  return data.useValueString;
                },
                set({ data }, value) {
                  data.useValueString = value;
                },
              },
            },
            {
              title: "是否压缩图片(h5生效)",
              description: "是否压缩上传的图片",
              type: "switch",
              value: {
                get({ data }) {
                  return data.compressImage;
                },
                set({ data }, value: boolean) {
                  data.compressImage = value;
                },
              },
            },
            {
              title: "压缩质量",
              type: "Inputnumber",
              description:
                "图片压缩质量, 数值越小, 图片质量越差, 但文件体积更小",
              options: [{ min: 0.1, max: 1 }],
              ifVisible({ data }: EditorResult<Data>) {
                return !!data.compressImage;
              },
              value: {
                get({ data }: EditorResult<Data>) {
                  return [data.compressQuality || 0.7];
                },
                set({ data }: EditorResult<Data>, value: number[]) {
                  data.compressQuality = value[0];
                },
              },
            },
          ],
        },
        {
          title: "事件",
          items: [
            {
              title: "值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
          ],
        },
      ];
    },
  },
};
