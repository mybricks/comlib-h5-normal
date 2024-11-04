export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["quitGroup"]((val, outputRels) => {

    let chat = wx.env?.["tencentcloudChat"] || null;

    if (!chat) {
      return;
    }

    if (!chat?.isReady()) {
      return;
    }

    chat
      .quitGroup(val.groupID)
      .then((res) => {
        console.warn("quitGroupDone", res.data.groupID);
        outputs["quitGroupDone"](res.data.groupID);
      })
      .catch((err) => {
        console.warn("quitGroupError", err);
        outputs["quitGroupError"](err);
      });

  });
}
