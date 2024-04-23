import css from "./style.less"
export default {
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "调试时输出",
        description:
          "在调试时使用mock的schema信息。该配置不影响发布后的实际运行效果。",
        type: "code",
        value: {
          get({ data }) {
            return data.mock;
          },

          set({ data }, val) {
            data.mock = val;
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
                <div>获取Scheme需要传入以下参数</div>
                <li>path(小程序页面路径，不可携带 query)</li>
                <li>query(进入小程序时的 query)</li>
                <li>
                  env_version(正式版-release「默认」，体验版-trial，开发版-develop)
                </li>
              </div>
            );
          },
        },
      },
    ];
  

  }
};