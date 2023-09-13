import React, { useCallback, useEffect, useRef, useState } from 'react';
import localStyle from './index.less';

interface Props {
  children: React.ReactNode;
  numberOfLines?: number;
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  icons?: string[];
  env: string;
}
export default function TitleWithIcon(props: Props) {
  const { children, numberOfLines, style, iconStyle, icons, env } = props;
  return (
    <span style={style} className={localStyle.text}>
      {icons?.map((item, index) => {
        return (
          <img
            style={{
              ...iconStyle,
              height: 14,
              width: 'auto',
            }}
            src={item}
            key={item}
          />
        );
      })}
      <span style={{ marginLeft: '0px', position: 'relative', top: '-2px' }}>{children}</span>
    </span>
  );
}
