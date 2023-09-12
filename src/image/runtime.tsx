import { useComputed, useObservable } from '@mybricks/rxui';
import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { isNumber } from '@fangzhou/utils';
import css from './runtime.less';

export default function ({ env, data, inputs, outputs, title, style }: RuntimeParams) {
  const model = useObservable({
    loaded: false,
    imageUrl: data.src,
  });
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    inputs['image']?.((url: string) => {
      if (typeof url === 'string') {
        model.imageUrl = url;
      }
    });
  }, []);

  useEffect(() => {
    model.imageUrl = data.src;
  }, [data.src]);

  useEffect(() => {
    outputs?.change?.(model.imageUrl);
  }, [model.imageUrl]);

  const onLoad = useCallback(() => {
    const naturalWidth = ref.current?.naturalWidth;
    const naturalHeight = ref.current?.naturalHeight;
    model.loaded = true;
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
    } else if (style.width === 'auto' && data.naturalWidth < 414) {
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
        src={model.imageUrl}
        onLoad={onLoad}
        alt="加载中..."
      />
    </div>
  );
}
