export default {
  title: "设为首页",
  type: "editorRender",
  options: {
    render: (props) => {
      let value = props.editConfig.value.get();

      const text = value ? "当前页面已设置为首页" : "点击设置为首页";
      const style = {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "26px",
        lineHeight: 1,
        border: "1px solid #d9d9d9",
        borderRadius: "4px",
        backgroundColor: "#FFFFFF",
        fontSize: "12px",
        color: "#434343",
      };

      if (value) {
        style.backgroundColor = "#FA6400";
        style.color = "#ffffff";
        style.borderColor = "#FA6400";
        style.fontWeight = 500;
      }

      return (
        <div style={style} onClick={props.editConfig.value.set}>
          {text}
        </div>
      );
    },
  },
  value: {
    get({ data }) {
      return data.isEntryPagePath;
    },
    set({ data }, value) {
      data.isEntryPagePath = true;
      window.__entryPagePath__.set(data.id);
    },
  },
};
