import React, { useCallback, useEffect, useLayoutEffect , useState } from "react";
import { View, Video } from "@tarojs/components";
import css from "./style.less";
import { isH5 } from "../utils/env";

export default function ({ env, data, inputs, outputs, title, style }) {
  const [videoSrc,setVideoSrc] = useState(data.src)

  useLayoutEffect(() => {
    inputs["setSrc"]((src) => {
      setVideoSrc(src)
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

  console.log("isH5()",isH5())

  if (isH5()) {
    // console.log("h5的视频兼容")
    return <video
      x5-video-player-type="h5"
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
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  }

  return (
    <Video
      className={css.video}
      src={videoSrc}
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
