import css from "./style.less";
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
        description: "请填写您的私钥",
        value: {
          get({ data }) {
            return data.apiclient_key_pem;
          },
          set({ data, setDesc }, value: string) {
            data.apiclient_key_pem = value;
          },
        },
      },
      {
        title: "说明",
        type: "editorRender",
        options: {
          render: (props) => {
            return (
              <div className={css.text}>
                私钥获取方式:
                <a
                  href="https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay3_1.shtml#part-1"
                  target="_blank"
                >
                  微信开发文档
                </a>
              </div>
            );
          },
        },
      },
    ];
  },
};
