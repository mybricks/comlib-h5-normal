import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import css from './style.less';
import cls from 'classnames';

interface PriceProps {
  price: number; // 分为单位
  className?: string;
  deleteLine?: boolean;
  style?: CSSProperties;
  prefixStyle?: CSSProperties;
  fzTag?: string;
  [props: string]: any;
}

export default function ({
  className,
  price,
  deleteLine,
  style,
  prefixStyle,
  numberStyle,
  fzTag,
  ...rest
}: PriceProps) {
  return (
    <div className={`${className} ${css.price}`} style={style} data-fz={fzTag} {...rest}>
      <span className={css.prefix} style={prefixStyle}>
        ￥
      </span>
      <span className={css.number} style={numberStyle}>
        {parseFloat((price / 100).toFixed(10))}
      </span>
      {deleteLine && <div className={css.line} style={{ backgroundColor: style?.color }} />}
    </div>
  );
}

// 金额是字符串
export function StrPrice({
  className,
  price,
  deleteLine,
  style,
  prefixStyle,
  numberStyle,
  fzTag,
  ...rest
}: PriceProps) {
  return (
    <div className={`${className} ${css.price}`} style={style} data-fz={fzTag} {...rest}>
      <span className={css.prefix} style={prefixStyle}>
        ￥
      </span>
      <span className={css.number} style={numberStyle}>
        {price}
      </span>
      {deleteLine && <div className={css.line} style={{ backgroundColor: style?.color }} />}
    </div>
  );
}

export function Price({
  children,
  className,
  style,
}: {
  children?: string | number;
  className?: string;
  style?: CSSProperties;
}) {
  const price = children?.toString();
  const shrinkerRef = useRef(null);
  const [smallFontSize, setSmallFontSize] = useState<Number>();
  useEffect(() => {
    if (shrinkerRef.current) {
      const fontSize = parseInt(window.getComputedStyle(shrinkerRef.current).fontSize);
      if (fontSize < 14) {
        setSmallFontSize(fontSize);
      } else if (14 <= fontSize && fontSize < 30) {
        setSmallFontSize(Math.round(fontSize * 0.7));
      } else if (30 <= fontSize && fontSize < 36) {
        setSmallFontSize(Math.round(fontSize * 0.6));
      } else {
        setSmallFontSize(Math.round(fontSize * 0.5));
      }
    }
  });

  return price ? (
    <span ref={shrinkerRef} className={cls(css.fontShrinkerWrapper, className)} style={style}>
      <span className={css.prefix} style={{ fontSize: `${smallFontSize}px` }}>
        ¥
      </span>
      <span>{price.split('.')[0]}</span>
      {price.split('.')[1] && <span style={{ fontSize: `${smallFontSize}px` }}>.{price.split('.')[1]}</span>}
    </span>
  ) : null;
}
