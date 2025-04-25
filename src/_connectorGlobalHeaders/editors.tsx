export default {
  "@init": ({ style, data, setDesc }) => {
    setDesc("将覆盖已设置的内容");
  },
  ":root": [
    {
      title: "通过连线配置",
      type: "switch",
      value: {
        get({ data }) {
          return data.dynamic ?? true;
        },
        set({ data }, val) {
          data.dynamic = val
        },
      },
    },
    {
      title: "说明",
      type: "editorRender",
      ifVisible({ data }) {
        return data.dynamic == true || data.dynamic == void 0;
      },
      options: {
        render: (props) => {
          return (
            <div style={{ opacity: 0.7 }}>
              输入格式为任意对象，
              <br />如 <strong>{"{key1: value1, key2: value2}"}</strong>
            </div>
          );
        },
      },
    },
    {
      title: "请求头数据",
      type: "map",
      ifVisible({ data }) {
        return data.dynamic == false
      },
      value: {
        get({ data }, val) {
          console.log("get",data.header)
          return Object.prototype.toString.call(data.header) === '[object Object]' ? data.header : {};
        },
        set({ data }, val) {
          console.log("set",data.header)
          data.header = val;
        }
      }
    }
  ],
};
