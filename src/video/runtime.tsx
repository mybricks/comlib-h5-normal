import React, { useCallback, useEffect } from "react";
import { View, Video } from "@tarojs/components";
import css from "./style.less";

export default function ({ env, data, inputs, outputs, title, style }) {
  useEffect(() => {
    inputs["setSrc"]((src) => {
      data.src = src;
    });
  }, []);

  const onPlay = useCallback((e) => {
    outputs["onPlay"](e);
  }, []);

  const onPause = useCallback((e) => {
    outputs["onPause"](e);
  }, []);

  const onEnded = useCallback((e) => {
    outputs["onEnded"](e);
  }, []);

  const onTimeUpdate = useCallback((e) => {
    outputs["onTimeUpdate"](e);
  }, []);

  const onWaiting = useCallback((e) => {
    outputs["onWaiting"](e);
  }, []);

  const onError = useCallback((e) => {
    outputs["onError"](e);
  }, []);

  if (env.edit) {
    return <View className={css.mockVideo}></View>;
  }

  if (process.env.TARO_ENV === 'h5') {
    // console.log("h5的视频兼容")
    return <video
      className={css.video}
      width="100%"
      height="100%"
      controls={data.controls}
      playsInline
      poster={data.poster}
      autoPlay={data.autoplay}
      loop={data.loop}
      muted={data.muted}
      object-fit={data["object-fit"]}
      is-live={data["is-live"]}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onWaiting={onWaiting}
      onError={onError}
      >
      <source src={data.src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  }

  return (
    <Video
      className={css.video}
      src={data.src}
      controls={data.controls}
      poster={data.poster}
      autoplay={data.autoplay}
      loop={data.loop}
      muted={data.muted}
      object-fit={data["object-fit"]}
      is-live={data["is-live"]}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onWaiting={onWaiting}
      onError={onError}
    ></Video>
  );
}
