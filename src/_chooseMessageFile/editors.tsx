export default {
  '@init': ({ data, setDesc }) => {
  },
  ":root": [
    {
      title: "选择的文件类型",
      type: 'select',
      options: [
        { label: '所有文件中选择', value: 'all' },
        { label: '视频文件', value: 'video' },
        { label: '图片文件', value: 'image' },
        { label: '除图片和视频其它文件', value: 'file' },
      ],
      value: {
        get({ data }) {
          return data.SelectType;
        },
        set({ data, setDesc }, value: string) {
          data.SelectType = value;
        }
      }
    },
    {
      title: "选择的文件数量",
      type: "inputnumber",
      description: "每一次最多可以选择的文件数",
      options: [{max: 100,min:1}],
      value: {
        get({ data }: any) {
          return [data.SelectCount];
        },
        set({ data }: any, value: [number, number]) {
          [data.SelectCount] = value;
        },
      },
    }
  ],
};