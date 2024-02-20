export default {
  ":root": [
    // {
    //   title: "超时时间",
    //   description: "单位 ms，留空或 0 为不超时",
    //   type: "text",
    //   options: {
    //     type: "number",
    //   },
    //   value: {
    //     get({ data }) {
    //       return data.timeout;
    //     },
    //     set({ data }, val) {
    //       data.timeout = val;
    //     },
    //   },
    // },
    // {},
    {
      title: "调试时模拟效果",
      description: "由于调试时无法调用小程序环境的真实接口，所以调试时基于模拟效果实现，该配置项不影响发布后的实际运行效果。",
      type: "select",
      options: [
        { label: "模拟「成功」输出", value: true },
        { label: "模拟「失败」输出", value: false },
      ],
      value: {
        get({ data }) {
          return data.useMock;
        },
        set({ data }, val) {
          data.useMock = val;
        },
      },
    },
  ],
};
