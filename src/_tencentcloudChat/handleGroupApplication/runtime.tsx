export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["handleGroupApplication"]((val, outputRels) => {

    let chat = wx.env?.["tencentcloudChat"] || null;

    if (!chat) {
      return;
    }

    if (!chat?.isReady()) {
      return;
    }

    chat
      .handleGroupApplication(val)
      .then((res) => {
        console.log("handleGroupApplicationDone", res);
        outputs["handleGroupApplicationDone"](res);
      })
      .catch((err) => {
        console.log("handleGroupApplicationError", err);
        outputs["handleGroupApplicationError"](err);
      });

  });
}
