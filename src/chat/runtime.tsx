import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import { Textarea } from "brickd-mobile";
import * as Taro from "@tarojs/taro";
import Toolbar from "./runtime/toolbar";

import MessageText from "./runtime/MessageText";
import MessageImage from "./runtime/MessageImage";
import MessageCustom from "./runtime/MessageCustom";

export default function (props) {
  const { data, inputs, outputs, env, extra } = props;

  const [loginUserId, setLoginUserId] = useState(extra?.loginUserId || "");
  const [messages, setMessages] = useState(extra?.messages || []);

  const chatRoomCx = useMemo(() => {
    return cx(css.chatRoom, {
      [css.edit]: !!env.edit,
    });
  }, [env.edit]);

  const $messages = useMemo(() => {
    return messages.map((item, index) => {
      let messageCx = cx(css.message, {
        [css.assistant]: item.role === "assistant",
        [css.user]: item.role === "user",
      });

      let contentCx = cx(css.content, {
        [css.text]: item.contentType === "text",
        [css.image]: item.contentType === "image",
      });

      return (
        <View className={messageCx} key={index}>
          <Image className={css.avatar} src={item.avatar} />
          <View className={contentCx}>
            {item.contentType === "text" && (
              <Text className={css.text}>{item.content}</Text>
            )}
            {item.contentType === "image" && (
              <Image className={css.image} src={item.content} />
            )}
          </View>
        </View>
      );
    });
  }, [messages]);

  useEffect(() => {
    Taro.nextTick(() => {});
    // console.log("messages", messages);
  }, [$messages]);

  const onSend = useCallback(() => {
    // setMessages([
    //   ...messages,
    //   {
    //     avatar:
    //       "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
    //     role: "user",
    //     contentType: "text",
    //     content: data.value,
    //   },
    // ]);
  }, [data.value, messages]);

  return (
    <View className={chatRoomCx}>
      {/* messages before */}
      <ScrollView
        className={css.messages}
        scrollY
        reverse={true}
        // scrollIntoView={latestMessageId}
        // onScrollToUpper={loadMoreMessages}
        upperThreshold={50} // 距离顶部多远时触发加载更多
      >
        {messages.map((message, index) => (
          <View
            id={`message-${message.id}`}
            className={cx(css.message, message.text, {
              [css.me]: message.role === "user",
            })}
            key={message.messageId}
          >
            {/* 消息内容渲染 */}
            <Image
              className={css.avatar}
              mode={"scaleToFill"}
              src="https://comm.tencentcs.com/im/static-files/demo_sample_customer_avatar.png"
            />
            <View className={css.entry}>
              <View className={css.nickname}>
                {message.userProfile.nickname}
              </View>
              <View className={css.content}>
                {message.message.payload.text}
              </View>
            </View>
            {/* 消息内容渲染 */}
          </View>
        ))}

        {/* 
        <View className="toolbar">
          <Textarea className="input" />
        </View> 
        */}
      </ScrollView>
      {/* messages after */}

      {/* toolbar */}
      <Toolbar {...props} className={css.toolbar} onSend={onSend} />
    </View>
  );
}
