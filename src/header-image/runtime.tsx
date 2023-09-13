import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { openPage, back, close } from '../utils/event';
import cls from 'classnames';
import css from './style.less';

const Images = {
  back: 'https://ali2.a.kwimgs.com/kos/nlav11092/download.e33cd3d1168dc20e.png',
  rule: 'https://ali2.a.kwimgs.com/kos/nlav11092/download-1.8caf23066e5e1388.png',
  share: 'https://ali2.a.kwimgs.com/kos/nlav11092/download-2.e099d1a4fa71ed4c.png',
};

function ButtonBlock({ title = '' }) {
  return <div className={css.titleBlock}>{title ? <div className={css.title}>{title}</div> : null}</div>;
}

export default function ({ env, data, inputs, style, outputs }) {
  const [isHalf, setIsHalf] = useState(false); // 半屏页
  const [isSearch, setIsSearch] = useState(false); // 搜索页
  const [opacity, setOpacity] = useState(0); // 顶部栏透明度
  const [isScroll, setIsScroll] = useState(false); // 是否滚动
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const searchParams = new URL(location.href).searchParams;
    setIsHalf(!!searchParams.get('isHalf'));
    setIsSearch(!!searchParams.get('isSearch'));
  }, []);

  // 半屏、搜索页禁用吸顶
  const isCeiling = useMemo(() => {
    return data.isCeiling && !isHalf && !isSearch;
  }, [data.isCeiling, isHalf, isSearch]);

  const onScroll = useCallback(() => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;
    const offset = (100 / 375) * window.innerWidth;
    const rate = 0.5;
    console.log('--滚动--');
    //
    if (scrollTop > 0) {
      setIsScroll(true)
    } else {
      setIsScroll(false)
    }
    if (scrollTop < offset * rate) {
      setOpacity(0);
    } else if (scrollTop > offset) {
      setOpacity(1);
    } else {
      setOpacity(scrollTop / (offset * rate) - 1);
    }
  }, []);

  useEffect(() => {
    if (isCeiling) {
      window.addEventListener('scroll', onScroll, false);
      return () => {
        window.removeEventListener('scroll', onScroll, false);
      };
    }
  }, [isCeiling]);

  const imageUrl = useMemo(() => {
    if (isHalf && data.halfSrc) {
      return data.halfSrc;
    } else if (isSearch && data.tabSrc) {
      return data.tabSrc;
    } else {
      return data.src;
    }
  }, [isHalf, isSearch, data.src, data.halfSrc, data.tabSrc]);

  console.log('imageUrl: ', imageUrl);

  const onLoad = useCallback(() => {
    const naturalWidth = ref.current?.naturalWidth;
    const naturalHeight = ref.current?.naturalHeight;
    if (naturalHeight && naturalWidth) {
      data.height = (naturalHeight * 375) / naturalWidth;
    }
  }, []);

  const onBack = useCallback(() => {
  }, []);

  const onShare = useCallback(() => {
  }, []);

  const onJumpRule = useCallback(() => {
    openPage(data.ruleLink, env.yoda);
  }, []);

  return (
    <div>
      {isCeiling && isScroll ? (
        <div className={css.topBar} style={{ opacity }}>
          <ButtonBlock title={document.title} />
        </div>
      ) : null}
      <div className={css.wrapper}>
        <img onLoad={onLoad} ref={ref} className={css.bg} src={imageUrl}></img>
        {data.animate ? <img className={css.animate} src={data.animate} /> : null}
        {isSearch ? null : (
          <img
            src={data.leftImg}
            className={cls(css.leftBlock, css.icon, isCeiling && isScroll ? css.fixedLeftBlock : '')}
            style={{
              top: isHalf || isSearch ? '30px' : '50px',
            }}
            onClick={onBack}
          />
        )}
        <div
          className={cls(css.rightBlock, isCeiling && isScroll ? css.fixedRightBlock : '')}
          style={{
            top: isHalf || isSearch ? '30px' : '50px',
          }}
        >
          {data.ruleLink ? <img src={Images.rule} className={css.icon} onClick={onJumpRule}></img> : null}
          {data.openShare && !isSearch ? <img src={Images.share} className={css.icon} onClick={onShare}></img> : null}
        </div>
      </div>
    </div>
  );
}
