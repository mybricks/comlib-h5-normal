export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["call"]((val, outputRels) => {

    const conversationType = val.type
    const receiverID = conversationType === 'C2C' ? val.userProfile.userID : val.groupProfile.groupID

    let chat = wx.env?.["tencentcloudChat"] || null;
    console.log("wx", wx);

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

        outputs["messageList"]({ 
          messageList, 
          nextReqMessageID, 
          isCompleted,
          conversationID:val.conversationID,
          receiverID,
          conversationType
        });
      })
      .catch((err) => {
        console.log("getMessageList", err);
      });
  });
}
