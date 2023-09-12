import React, { useEffect, useMemo } from 'react';
import css from './runtime.less';
import cx from 'classnames';
import { useCardFeild } from '../utils/cardUtils';

export default function ({ env, data, inputs, outputs }) {
  useCardFeild(data, inputs, 'text');
  useEffect(() => {
    inputs.update?.((val: string) => {
      data.text = val;
    });
  }, []);

  useEffect(() => {
    outputs?.change?.(data.text);
  }, [data.text]);

  const textCx = cx({
    [css.text]: true,
    [css['ellipsis-line']]: !!data.ellipsis,
  });

  const onClick = () => {
    if (!env.runtime) {
      return;
    }
    outputs?.onClick?.(data.text);
  };

  return (
    <p className={textCx} style={{ ...data.style }} onClick={onClick}>
      {data.text}
    </p>
  );
}
