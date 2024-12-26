import React, { useCallback, useEffect, useMemo } from "react";
import css from "./runtime.less";
import { ChannelVideo, View } from "@tarojs/components";
import cx from "classnames";



export default function (props) {
  const { data, inputs, outputs, env, extra } = props;

  //判断是否是真机运行态
  const isRelEnv = () => {
    if (env.runtime.debug || env.edit) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    inputs["channelVideo"]((val) => {
      data.channelVideo = val;
    });

  }, [])

  const channelVideoError = useCallback((e) => {
    console.log("channelVideoError", e)
    outputs["onError"](e)
  }, [])

  return (
    <View className={cx([css.container,"mybricks-container"])}>
      {isRelEnv() ? <ChannelVideo
        feedId={data.channelVideo?.feedId}
        finderUserName={data.channelVideo?.finderUserName}
        loop={data.channelVideo?.loop}
        muted={data.channelVideo?.muted}
        objectFit={data.channelVideo?.objectFit}
        autoplay={data.channelVideo?.autoplay}
        feedToken={data.channelVideo?.feedToken}
        onError={channelVideoError}
        className={cx([css.channelVideo])}
      >
      </ChannelVideo> : <View className={css.holder}>视频号组件仅支持真机预览</View>}

    </View>
  )
}
