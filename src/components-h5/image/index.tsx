import * as React from 'react';
import { ImageProps } from '@tarojs/components'
import classNames from 'classnames'
import css from './index.less'

export default (props: ImageProps) => {
  const { className, style, mode, ...rest } = props;
  
  const cls = classNames(
    css.didi,
    'h5-img',
    {
      'h5-img__widthfix': mode === 'widthFix'
    },
    className
  )
  const imgCls = classNames(
    'h5-img__mode-' +
      (mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')
  )

  return (
    <div className={cls} style={style}>
      <img
       className={imgCls}
       {...rest}
      />
    </div>
  )
}