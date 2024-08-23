import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import { Textarea } from "brickd-mobile";
import * as Taro from "@tarojs/taro";

export default function ({ data, inputs, outputs, env, extra }) {
  const [messages, setMessages] = useState([
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "assistant",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "user",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "assistant",
      contentType: "image",
      content:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "user",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "user",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "assistant",
      contentType: "image",
      content:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "user",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "user",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "assistant",
      contentType: "image",
      content:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "user",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "user",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "assistant",
      contentType: "image",
      content:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
    },
    {
      avatar:
        "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      role: "user",
      contentType: "text",
      content: "啊开发接口的飞机啊看大煞风景大法",
    },
  ]);

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
        // scrollIntoView={latestMessageId}
        // onScrollToUpper={loadMoreMessages}
        upperThreshold={50} // 距离顶部多远时触发加载更多
      >
        {messages
          .slice()
          .reverse()
          .map((message, index) => (
            <View id={`message-${message.id}`} className="message" key={index}>
              {/* 消息内容渲染 */}
            </View>
          ))}
        <View className="toolbar">
          <Textarea className="input" />
        </View>
      </ScrollView>
      {/* messages after */}

      {/* toolbar */}
      {/* toolbar */}
      {/* toolbar */}
      <View className={css.toolbar}>
        <View className={css.inner}>
          <Textarea
            className={css.input}
            cursorSpacing={0}
            autoHeight
            value={data.value}
            placeholder={data.placeholder}
            cursor={data.value.length}
          />
          <View className={css.send} onClick={onSend}>
            发送
          </View>
        </View>
      </View>
    </View>
  );
}
