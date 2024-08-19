import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
  CSSProperties,
} from "react";
import css from "./index.less";
import { View, Image, ImageProps } from "@tarojs/components";
import { autoCdnCut } from "./../../utils/image";

interface SkeletonImageProps extends ImageProps {
  skeleton?: boolean;
  skeletonStyle?: CSSProperties;
  cdnCut?: "auto" | "";
  cdnCutOption?: {
    width?: number | string;
    height?: number | string;
  };
}

export default function ({
  skeleton = false,
  skeletonStyle,
  onLoad,
  onClick,
  onError,
  className,
  src,
  mode,
  cdnCut = "",
  cdnCutOption = {},
  ...props
}: SkeletonImageProps) {
  const [loading, setLoading] = useState(!!skeleton);

  useEffect(() => {
    if (src && skeleton) {
      setLoading(true);
    }
  }, [src, skeleton]);

  const _onLoad = useCallback(
    (e) => {
      setLoading(false);
      onLoad?.(e);
    },
    [onLoad]
  );

  const _onClick = useCallback(
    (e) => {
      onClick?.(e);
    },
    [onClick]
  );

  const _onError = useCallback(
    (e) => {
      setLoading(false);
      onError?.(e);
    },
    [onError]
  );

  const _src = useMemo(() => {
    if (cdnCut === "auto") {
      const cutUrl = autoCdnCut(
        {
          url: src,
          width: cdnCutOption?.width,
          height: cdnCutOption?.height,
        },
        {
          quality: 90,
        }
      );
      return cutUrl;
    }
    return src;
  }, [src, cdnCut, cdnCutOption?.height, cdnCutOption?.height]);

  return (
    <View className={css.com}>
      <View
        className={loading ? `${css.place}` : `${css.place} ${css.none}`}
        style={skeletonStyle}
      ></View>
      {_src && (
        <Image
          // 开启懒加载，官方解释是 在即将进入一定范围（上下三屏）时才开始加载
          lazyLoad
          className={className}
          src={_src}
          mode={mode}
          onClick={_onClick}
          onLoad={_onLoad}
          onError={_onError}
          nativeProps={{
            loading: "lazy",
            decoding: "async",
          }}
          {...props}
        />
      )}
    </View>
  );
}
