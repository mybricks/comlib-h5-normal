export default {
  ":root": [
    {
      ifVisible({ data }) {
        return !data.useDynamicKey;
      },
      title: "本地缓存中指定的 key",
      type: "text",
      value: {
        get({ data }) {
          return data.key;
        },
        set({ data }, value) {
          data.key = value;
        },
      },
    },
    {
      title: "使用动态 key",
      type: "switch",
      value: {
        get({ data }) {
          return data.useDynamicKey;
        },
        set({ data }, value) {
          data.useDynamicKey = value;
        },
      },
    },
    {},
    {
      title: "说明",
      type: "editorRender",
      options: {
        render: (props) => {
          return (
            <div style={{ opacity: 0.7 }}>
              当不存在对应的缓存时，读取结果将返回 null
            </div>
          );
        },
      },
    },
  ],
};
