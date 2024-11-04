export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["getGroupApplicationList"]((val, outputRels) => {

    let chat = wx.env?.["tencentcloudChat"] || null;

    if (!chat) {
      return;
    }

    if (!chat?.isReady()) {
      return;
    }

    chat
      .getGroupApplicationList()
      .then((res) => {
        console.log("getGroupApplicationListDone", res.data.applicationList);
        outputs["getGroupApplicationListDone"](res.data.applicationList);
      })
      .catch((err) => {
        console.log("getGroupApplicationListError", err);
        outputs["getGroupApplicationListError"](err);
      });

  });
}
