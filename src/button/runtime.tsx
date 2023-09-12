import React, { useCallback, useEffect, useRef, useState } from 'react';
import css from './runtime.less';
import { parseModuleAndActionFromTitle } from '../utils/track';

export default function ({ env, data, logger, slots, inputs, outputs, title }: RuntimeParams) {
  const [subText, setSubText] = useState('');

  const ele = useRef(null);

  const { moduleName, actionName } = parseModuleAndActionFromTitle(title);
  const clickParam = JSON.stringify([
    {
      triggerTime: 'CLICK',
      action: 'OP_ACTIVITY_BUTTON',
      params: {
        action_name: actionName,
        module_name: moduleName,
      },
    },
  ]);

  const onClick = useCallback((ev) => {
    if (env.runtime) {
      ev.stopPropagation();
      outputs['click'](true);
    }
  }, []);

  useEffect(() => {
    inputs['btnText']((val: string) => {
      if (typeof val === 'object') {
        data.text = val[0];
        setSubText(val[1]);
      } else {
        data.text = val;
      }
    });
    inputs['btnStyle']((val: any) => {
      if (!val || typeof val !== 'object') return;
      data.style = {
        ...data.style,
        ...val,
      };
    });
  }, []);

  return (
    <div
      className={`${css.button} ${data.asMapArea && env.edit ? css.asMapArea : 'mybricks-button'}`}
      ref={ele}
      onClick={onClick}
      data-weblogger={clickParam}
    >
      {!data.asMapArea ? data.text : null}

      {subText ? (
        <div
          style={{
            color: data.style.color || '#222222',
            fontSize: (parseInt(data.style.fontSize) / 5) * 4 + 'px',
          }}
        >
          {subText}
        </div>
      ) : null}
    </div>
  );
}
