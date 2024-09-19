export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["call"]((val, outputRels) => {
    let chat = env.global?.["tencentcloudChat"] || null;

    if (!chat) {
      return;
    }

    if (!chat?.isReady()) {
      return;
    }

    chat
      .getMessageList(val)
      .then((res) => {
        const messageList = res.data.messageList; // 消息列表。
        const nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        const isCompleted = res.data.isCompleted; // 表示是否已经拉完所有消息。isCompleted 为 true 时，nextReqMessageID 为 ""。

        outputs["messageList"]({ messageList, nextReqMessageID, isCompleted });
      })
      .catch((err) => {
        console.log("getMessageList", err);
      });
  });
}
