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
      .getConversationList()
      .then((res) => {
        const conversationList = res.data.conversationList; // 全量的会话列表，用该列表覆盖原有的会话列表
        const isSyncCompleted = res.data.isSyncCompleted; // 从云端同步会话列表是否完成

        outputs["conversationList"]({ conversationList, isSyncCompleted });
      })
      .catch((err) => {
        console.log("getConversationList", err);
      });
  });
}
