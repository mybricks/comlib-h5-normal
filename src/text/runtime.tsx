import React, { useEffect, useMemo } from 'react';
import css from './runtime.less';
import cx from 'classnames';

export default function ({ env, data, inputs, outputs }) {
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
    'mybricks-text': true,
  });

  const onClick = () => {
    if (!env.runtime) {
      return;
    }
    outputs?.click?.(data.text);
  };

  return (
    <p className={textCx} onClick={onClick}>
      {data.text}
    </p>
  );
}
