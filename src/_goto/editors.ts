export default {
  ":root": [
    {
      title: "跳转页面",
      type: "text",
      value: {
        get({ data }) {
          return data.path;
        },
        set({ data }, value) {
          data.path = value;
        },
      },
    },
    {
      title: "页面参数",
      type: "text",
      options: {
        placeholder: "如 name=vendor&color=black",
      },
      value: {
        get({ data }) {
          let params = Object.keys(data.params)
            .map((key) => {
              let value = params[key];
              return `${key}=${encodeURIComponent(value)}`;
            })
            .join("&");

          return params;
        },
        set({ data }, value) {
          let params = {};

          if (value) {
            value = value.split("&").map((raw) => {
              let result = {};
              let [key, value] = raw.split("=");
              result[key] = decodeURIComponent(value);
              return result;
            });

            value.forEach((_param) => {
              params = { ...params, ..._param };
            });
          }

          data.params = params;
        },
      },
    },
    {
      title: "跳转方式",
      type: "Select",
      options: [
        { value: "navigateTo", label: "新页面打开" },
        { value: "redirectTo", label: "重定向" },
      ],
      value: {
        get({ data }) {
          return data.action;
        },
        set({ data }, value) {
          data.action = value;
        },
      },
    },
  ],
};
