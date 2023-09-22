import * as Taro from "@tarojs/taro";

export default function ({ env, inputs, outputs, data }) {
  if (!env.runtime) {
    return;
  }

  const { tmplId } = data;

  // tmplId 为模板 ID，必填
  if (!tmplId) {
    outputs["onFail"]({
      tmplId: data.tmplId,
      errMsg: "模板ID不能为空",
    });
    return;
  }

  if (env.runtime?.debug) {
    outputs["onSuccess"]({
      errMsg: "requestSubscribeMessage:ok",
      [tmplId]: "accept",
    });
    return;
  }

  // 通过 Taro.requestSubscribeMessage 接口订阅消息
  Taro.requestSubscribeMessage({
    tmplIds: [tmplId],
    success: (res) => {
      if (res.errMsg === "requestSubscribeMessage:ok") {
        outputs["onSuccess"](res);
      } else {
        outputs["onFail"](res);
      }
    },
    fail: (err) => {
      outputs["onFail"](err);
    },
  });
}
