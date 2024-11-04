export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["joinGroup"]((val, outputRels) => {

    let chat = wx.env?.["tencentcloudChat"] || null;

    if (!chat) {
      return;
    }

    if (!chat?.isReady()) {
      return;
    }

    chat
      .joinGroup(val)
      .then((res) => {
        console.warn("joinGroupDone", res);
        outputs["joinGroupDone"](res);
      })
      .catch((err) => {
        console.warn("joinGroupError", err);
        outputs["joinGroupError"](err);
      });

  });
}
