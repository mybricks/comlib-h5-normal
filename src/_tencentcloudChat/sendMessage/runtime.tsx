import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["call"]((val, outputRels) => {
    let globalKey = `tencentcloudChat`;
    let chat = app?.globalData?.[globalKey] || null;

    if (!chat) {
      return;
    }

    if (!chat?.isReady()) {
      return;
    }

    let message;
    switch (val.type.toLowerCase()) {
      case "text":
        message = chat.createTextMessage({
          to: val.to,
          payload: {
            text: val.text,
          },
        });
        break;

      case "image":
        Taro.chooseMedia({
          mediaType: ["image"],
          sourceType: ["album", "camera"],
          count: 1,
          success(res) {
            message = chat.createImageMessage({
              to: val.to,
              payload: {
                file: res,
              },
              onProgress: (progress) => {
                console.log("progress", progress);
              },
            });
          },
        });
        break;
    }

    chat
      .sendMessage(message)
      .then((res) => {
        console.log("sendMessage", res);
        outputs["onSuccess"](res);
      })
      .catch((err) => {
        console.log("sendMessage", val);
        outputs["onFail"](err);
      });
  });
}
