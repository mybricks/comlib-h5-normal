import React, { useCallback, useRef, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import { Textarea } from "brickd-mobile";
import * as Taro from "@tarojs/taro";
import Toolbar from "./runtime/toolbar";
import { isWEAPP } from "../utils/env";

import MessageText from "./runtime/MessageText";
import MessageImage from "./runtime/MessageImage";
import MessageCustom from "./runtime/MessageCustom";

interface Message {
  ID: string;
  type: string;
  payload: object;
  conversationID: string;
  conversationType: string;
  to: string;
  from: string;
  flow: string;
  time: number;
  sequence: number;
  status: string;
  isRevoked: boolean;
  priority: string;
  nick: string;
  avatar: string;
  isPeerRead: boolean;
  nameCard: string;
  atUserList: string[];
  cloudCustomData: string;
  isDeleted: boolean;
  isModified: boolean;
  needReadReceipt: boolean;
  readReceiptInfo: any;
  isBroadcastMessage: boolean;
  isSupportExtension: boolean;
  revoker: string;
  revokerInfo: any;
  revokeReason: string;
  hasRiskContent: boolean;
}

export default function (props) {
  const { data, inputs, outputs, env, extra } = props;
  const [messagesList, setMessagesList] = useState(extra?.messages || []);
  const [toolbarHeight, setToolbarHeight] = useState(-1)
  const [scrollToID, setScrollToID] = useState("uu2")
  const [isCompleted, setIsCompleted] = useState(false)
  const [nextReqMessageID, setNextReqMessageID] = useState("")
  const [conversationID, setConversationID] = useState("")
  const [receiverID, setReceiverID] = useState("")
  const [conversationType, setConversationType] = useState("")

  //判断是否是真机运行态
  const isRelEnv = () => {
    if (env.runtime.debug || env.edit) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    console.log("开始轮询")
    if (process.env.TARO_ENV !== "weapp") {
      console.log("不是小程序，不轮询")
      return
    }
    const interval = setInterval(() => {
      const list = wx.env.messageReceivedList
      // console.log("轮询的列表",list,"当前conversationID",conversationID)
      //遍历List
      list.forEach((conversation) => {
        if (conversation.conversationID == conversationID) {
          //接受到当前会话的消息，需要及时更新到界面上
          console.log("轮询-获取到当前会话的消息更新：", conversation)
          setMessagesList((res) => {
            return [
              ...res,
              conversation
            ]
          })
          scrollToBottom()
        }
      })
      wx.env["messageReceivedList"] = []
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [conversationID]);

  useEffect(() => {
    console.log("轮询-messagesList更新：", messagesList)
  }, [messagesList])

  useEffect(() => {
    //初始化对话列表
    inputs['initChatList']((val, outputRels) => {
      const { messageList, isCompleted = true, nextReqMessageID = "", conversationID, receiverID, conversationType } = val
      setMessagesList(JSON.parse(JSON.stringify(messageList)))
      setIsCompleted(isCompleted)
      setNextReqMessageID(nextReqMessageID)
      setConversationID(conversationID)
      setConversationType(conversationType)
      setReceiverID(receiverID)
      outputRels['initChatListDone'](val)
    })
    //只在首次输入聊天列表数据时，自动滚动到最底部
    scrollToBottom()
  }, []);

  const scrollToBottom = () => {
    setScrollToID("")
    setTimeout(() => {
      setScrollToID("lastMessage")
    }, 300)
  }

  useEffect(() => {
    //拉取上一页对话列表
    inputs['setNextMessage']((val) => {
      const { messageList, isCompleted = true, nextReqMessageID = "", conversationID } = val
      setIsCompleted(isCompleted)
      setNextReqMessageID(nextReqMessageID)
      setConversationID(conversationID)
      console.log("chat上一页消息", JSON.parse(JSON.stringify(messageList)))
      if (JSON.parse(JSON.stringify(messageList)).length === 0) return
      setMessagesList((res) => {
        return [
          ...JSON.parse(JSON.stringify(messageList)),
          ...res
        ]
      })
    })
  }, [])

  const chatRoomCx = useMemo(() => {
    return cx(css.chatRoom, {
      [css.edit]: !!env.edit,
    });
  }, [env.edit]);

  useEffect(() => {
    if(!isRelEnv()) return
    
    const query = Taro.createSelectorQuery();
    query
      .select(`#chat_toolbar`)
      .boundingClientRect()
      .exec((res) => {
        if (res && res[0]) {
          const rect = res[0];
          setToolbarHeight(rect.height);
        }
      });
  }, [])

  const onSend = useCallback((e) => {
    outputs["sendMessage"]({
      text: e,
      receiverID: receiverID,
      conversationType: conversationType
    })

    setMessagesList((res) => {
      return [
        ...res,
        {
          payload: {
            text: e
          },
          conversationID: conversationID,
          conversationType: conversationType,
          nick: "我发出的",
          avatar: "",
          type: "TIMTextElem",
          flow: "out"
        }
      ]
    })

    scrollToBottom()
    console.log("点击了onSend", data.value);
  }, [data.value, receiverID, conversationType]);

  const loadMoreMessages = useCallback(() => {
    if (isCompleted) return
    outputs["getNextMessage"]({
      isCompleted,
      nextReqMessageID,
      conversationID
    })
    console.log("loadMoreMessages isCompleted", isCompleted, "nextReqMessageID", nextReqMessageID);
  }, [isCompleted, nextReqMessageID, conversationID]);

  const timestampToDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <View className={chatRoomCx}>
      {/* messages before */}
      <ScrollView
        className={css.messages}
        // style={{height:scrollHeight + "px"}}
        scrollY
        reverse={true}
        scrollIntoView={scrollToID}
        onScrollToUpper={loadMoreMessages}
        upperThreshold={50} // 距离顶部多远时触发加载更多
      >
        {messagesList.map((message, index) => (
          <View
            id={`message-${message.ID}`}
            className={cx(css.message, {
              [css.me]: message.flow === "out",
            })}
            key={message.ID}
          >
            {/* 消息内容渲染 */}
            <Image
              className={css.avatar}
              mode={"scaleToFill"}
              src={message.avatar || `https://comm.tencentcs.com/im/static-files/demo_sample_customer_avatar.png`}
            />
            <View className={css.entry}>
              <View className={cx(css.nickname, { [css.nickname_me]: message.flow === "out" })}>
                {message.nick} {timestampToDateTime(message.time)}
              </View>
              <View className={css.content}>
                {message.type == "TIMTextElem" ? message.payload.text : <Image style={{ width: "150px", height: "150px" }} src={message.payload.image} />}
              </View>
            </View>
            {/* 消息内容渲染 */}
          </View>
        ))}
        <View id="lastMessage" style={{ height: toolbarHeight + "px" }}></View>
      </ScrollView>
      {/* messages after */}

      {/* toolbar */}
      <Toolbar
        {...props}
        className={css.toolbar}
        onSend={onSend}
      />
    </View>
  );
}
