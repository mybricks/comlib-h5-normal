export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["logOut"]((val, outputRels) => {

    let chat = wx.env?.["tencentcloudChat"] || null;

    if (!chat) {
      return;
    }

    if (!chat?.isReady()) {
      return;
    }

    chat
      .logout()
      .then((res) => {
        console.warn("logOutDone", res);
        outputs["logOutDone"](res);
        //退出登录成功后，把本地存储的消息也清掉
        if (wx.env["messageReceivedList"].length === 0) {
        } else {
          //如果List数组里面已经有对象了，要追加进去
          wx.env["messageReceivedList"] = []
        }
      })
      .catch((err) => {
        console.warn("logOutError", err);
        outputs["logOutError"](err);
      });

  });
}
