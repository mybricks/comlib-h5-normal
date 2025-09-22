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
      cate0.title = "常规";
      cate0.items = [
        {
          title: "最大上传数量",
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
          title: "示例图",
          type: "imageSelector",
          options: {
            fileSizeLimit: 2
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
          title: "上传name(h5生效)",
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

      cate2.title = "高级";
      cate2.items = [
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
          type:"switch",
          value: {
            get({ data }) {
              return data.compressImage;
            },
            set({ data }, value: boolean) {
              data.compressImage = value;
            }
          },
        },
        {
          title: '压缩质量',
          type: 'Inputnumber',
          description: '图片压缩质量, 数值越小, 图片质量越差, 但文件体积更小',
          options: [{min: 0.1, max: 1 }],
          ifVisible({ data }: EditorResult<Data>) {
            return !!data.compressImage;
          },
          value: {
            get({ data }: EditorResult<Data>) {
              return [data.compressQuality || 0.7];
            },
            set({ data }: EditorResult<Data>, value: number[]) {
              data.compressQuality = value[0];
            }
          }
        },
        // {
        //   title: "升级",
        //   type: "button",
        //   value: {
        //     set({ data, inputs, outputs }) {
        //       inputs.add({
        //         id: "setPlaceholder",
        //         title: "设置提示内容",
        //         desc: "设置图片上传下方的文本提示内容",
        //         schema: {
        //           type: "string"
        //         }
        //       });
        //     }
        //   }
        // }
      ];
    },
  },
};
