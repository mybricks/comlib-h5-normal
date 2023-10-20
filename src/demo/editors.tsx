export default {
  ":root": {
    items: [
      {
        title: "demo",
        type: "CODE",
        options: {
          comments: `ddd`,
          theme: "light",
          suggestions: {
            context: [
              {
                label: "weblog",
                value: `weblog.collect("SHOW", {})`,
                kind: 1,
                detail: "埋点上报",
              },
              {
                label: "ajax",
                value: `ajax('/aaa', {})`,
                kind: 1,
                detail: "发送请求",
              },
            ],
          },
          minimap: {
            enabled: false,
          },
          eslint: {
            parseOptions: {
              ecmaVersion: "2020",
              sourceType: "module",
            },
          },
        },
        value: {
          get({ data }) {
            return data.mysetting;
          },
          set({ data }, value) {
            console.log(value);
            data.mysetting = value;
          },
        },
      },
    ],
  },
};
