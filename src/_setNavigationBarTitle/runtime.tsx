import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {
  if (!env.runtime) {
    return;
  }
  //识别出当前是不是在h5
  const isH5 = process.env.TARO_ENV === "h5";

  inputs["setTitle"]((value) => {
    if (value && typeof value !== "string") return
    if (isH5) {
      let iframe = document.createElement("iframe")
      console.log("h5修改标题", value)
      document.title = value;
      iframe.src = "/favicon.ico"
      document.body.appendChild(iframe)
      console.log("增加iframe")
      //刷新后移除iframe
      setTimeout(function () {
        console.log("删除iframe")
        document.body.removeChild(iframe)
      }, 0);
      console.log("修改后的标题", document.title)
    } else {
      Taro.setNavigationBarTitle({
        title: value,
      });
    }

  });
}
