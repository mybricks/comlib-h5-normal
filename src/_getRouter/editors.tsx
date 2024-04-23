import css from "./style.less"
export default {
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "调试时输出",
        type: "code",
        description: "在调试时使用mock的路由信息。该配置不影响发布后的实际运行效果。",
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
        title:"说明",
        type:"editorRender",
        options: {
          render:(props) => {
            return (
              <div className={css.text}>
                <div>可以获取打开页面时的path、query、scene参数</div>
                <br />
                <div>
                  如需在调试时使用mock路径信息，请在上方的「调试时输出」中填入mock路由参数，参考结构：
                </div>
                <br />
                <img
                  className={css.img}
                  src="https://assets.mybricks.world/U7EOGS3l7gxW9TEKT1Le5rHQxBEsBkEi-1713784484481.png"
                  alt=""
                />
              </div>
            );

        }
        }
      }
    ];

  }
};