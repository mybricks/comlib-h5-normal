import React, { useCallback, useEffect, useState , useRef, useMemo } from 'react';
import { isNumber } from './../utils/core';
import css from './runtime.less';

export default function ({ env, data, inputs, outputs, title, style }: RuntimeParams) {
  const [loaded,setLoaded] = useState(false);
  const [imageUrl,setImageUrl] = useState(data.src);
  const ref = useRef<HTMLImageElement>(null);


  console.log('imageUrl', imageUrl)

  useEffect(() => {
    inputs['image']?.((url: string) => {

      console.log('input imageUrl', url)
      if (typeof url === 'string') {
        setImageUrl(url);
      }
    });
  }, []);

  useEffect(() => {
    setImageUrl(data.src);
  }, [data.src]);

  useEffect(() => {
    outputs?.change?.(imageUrl);
  }, [imageUrl]);

  const onLoad = useCallback(() => {
    const naturalWidth = ref.current?.naturalWidth;
    const naturalHeight = ref.current?.naturalHeight;
    setLoaded(true);
    if (naturalWidth && naturalHeight) {
      data.naturalWidth = naturalWidth;
      data.naturalHeight = naturalHeight;
    }
  }, []);

  const onClick: () => void = useCallback(() => {
    if (env.runtime) {
      outputs['click'](true);
    }
  }, [env.runtime, title]);

  const [width, height] = useMemo(() => {
    if (isNumber(style.width) && isNumber(style.height)) {
      if (data.naturalWidth / data.naturalHeight > style.width / style.height) {
        return [style.width + 'px', (style.width / data.naturalWidth) * data.naturalHeight + 'px'];
      } else {
        return [(style.height / data.naturalHeight) * data.naturalWidth + 'px', style.height + 'px'];
      }
    } else if (isNumber(style.width)) {
      return [style.width + 'px', (style.width / data.naturalWidth) * data.naturalHeight + 'px'];
    } else if (isNumber(style.height)) {
      return [(style.height / data.naturalHeight) * data.naturalWidth + 'px', style.height + 'px'];
    } else if (style.width === 'auto' && data.naturalWidth < 375) {
      return [data.naturalWidth + 'px', data.nauralHeight + 'px'];
    } else {
      return ['100%', 'auto'];
    }
  }, [style.width, style.height, data.naturalWidth, data.naturalHeight]);

  return (
    <div className={css.imgWrapper} style={{ ...data.imgStyle }} onClick={onClick}>
      <img
        className={css.img}
        style={{ width, height }}
        ref={ref}
        src={imageUrl}
        onLoad={onLoad}
        alt="加载中..."
      />
    </div>
  );
}
