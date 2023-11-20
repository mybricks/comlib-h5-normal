export default {
  "@init"({ data, isAutoRun }) {
    if (isAutoRun()) {
      data.runImmediate = true;
    }
  },
  ":root"({}, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "appid",
        type: "text",
        description: "请填写您的 appid",
        value: {
          get({ data }) {
            return data.appid;
          },
          set({ data, setDesc }, value: string) {
            data.appid = value;
          },
        },
      },
      {
        title: "apiclient_key_pem",
        type: "textarea",
        description: "请填写您的证书序列号",
        value: {
          get({ data }) {
            return data.apiclient_key_pem;
          },
          set({ data, setDesc }, value: string) {
            data.apiclient_key_pem = value;
          },
        },
      },
    ];
  },
};
