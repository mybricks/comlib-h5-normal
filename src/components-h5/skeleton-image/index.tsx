import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import css from "./index.less";
import { ImageProps } from "@tarojs/components";
import Image from './../image'
import View from './../view'

interface SkeletonImageProps extends ImageProps {
  skeleton?: boolean 
}

export default function ({ skeleton = false, onLoad, onClick, onError, className, src, mode, ...props }: SkeletonImageProps) {
  const [loading, setLoading] = useState(!!skeleton)

  useEffect(() => {
    if (src && skeleton) {
      setLoading(true)
    }
  }, [src, skeleton])

  const _onLoad = useCallback((e) => {
    setLoading(false)
    onLoad?.(e);
  }, [onLoad]);

  const _onClick = useCallback((e) => {
    onClick?.(e);
  }, [onClick]);

  const _onError = useCallback((e) => {
    setLoading(false)
    onError?.(e)
  }, [onError]);

  return (
    <View className={css.com}>
      <View className={loading ? `${css.place}` : `${css.place} ${css.none}`}></View>
      <Image
        {...props}
        className={className}
        src={src}
        mode={mode}
        onClick={_onClick}
        onLoad={_onLoad}
        onError={_onError}
      />
    </View>
  );
}
