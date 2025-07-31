import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
  CSSProperties,
} from 'react'
import css from './index.less'
import { View, Image, ImageProps } from '@tarojs/components'
import { autoCdnCut, IMAGE_MODE } from './../../utils/image'

const HtmlImage: React.FC<{
  src: string
  mode?: IMAGE_MODE | string
  className?: string
  onClick?: (e: React.MouseEvent) => void
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
  style?: CSSProperties
}> = ({ src, mode, className, onClick, onLoad, onError, style }) => {
  const imageStyle = useMemo(() => {
    const baseStyle: CSSProperties = {
      ...style,
      maxWidth: '100%',
    }

    switch (mode) {
      case IMAGE_MODE.ASPECTFILL:
        return {
          ...baseStyle,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }
      case IMAGE_MODE.OBJECTFIT:
        return {
          ...baseStyle,
          width: '100%',
          height: '100%',
          objectFit: 'none',
        }
      case IMAGE_MODE.ASPECTFIT:
        return {
          ...baseStyle,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }
      case IMAGE_MODE.SCALETOFILL:
        return {
          ...baseStyle,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
        }
      case IMAGE_MODE.WIDTHFIX:
        return {
          ...baseStyle,
          width: '100%',
          height: 'auto',
        }
      default:
        return baseStyle
    }
  }, [mode, style])

  return (
    <img
      className={className}
      src={src}
      style={imageStyle}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
    />
  )
}


interface SkeletonImageProps extends ImageProps {
  useHtml?: boolean
  skeleton?: boolean
  skeletonStyle?: CSSProperties
  cdnCut?: 'auto' | ''
  cdnCutOption?: {
    width?: number | string
    height?: number | string
  }
}

export default function ({
  useHtml = false,
  skeleton = false,
  skeletonStyle,
  onLoad,
  onClick,
  onError,
  className,
  src,
  mode,
  cdnCut = '',
  cdnCutOption = {},
  ...props
}: SkeletonImageProps) {
  const [loading, setLoading] = useState(!!skeleton)

  useEffect(() => {
    if (src && skeleton) {
      setLoading(true)
    }
  }, [src, skeleton])

  const _onLoad = useCallback(
    (e) => {
      setLoading(false)
      onLoad?.(e)
    },
    [onLoad]
  )

  const _onClick = useCallback(
    (e) => {
      onClick?.(e)
    },
    [onClick]
  )

  const _onError = useCallback(
    (e) => {
      setLoading(false)
      onError?.(e)
    },
    [onError]
  )

  const _src = useMemo(() => {
    if (cdnCut === 'auto') {
      const cutUrl = autoCdnCut(
        {
          url: src,
          width: cdnCutOption?.width,
          height: cdnCutOption?.height,
        },
        {
          quality: 90,
        }
      )
      return cutUrl
    }
    return src
  }, [src, cdnCut, cdnCutOption?.height, cdnCutOption?.height])

  return (
    <View className={css.com}>
      <View
        className={loading ? `${css.place}` : `${css.place} ${css.none}`}
        style={skeletonStyle}
      ></View>
      {_src &&
        (useHtml ? (
          <HtmlImage
            className={className}
            src={_src}
            mode={mode}
            onClick={_onClick}
            onLoad={_onLoad}
            onError={_onError}
          />
        ) : (
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
        ))}
    </View>
  )
}
