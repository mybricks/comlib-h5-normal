import * as React from 'react';
import classNames from 'classnames'
import css from './index.less'

export default ({ children, className, selectable = false,  ...rest }) => {
  const cls = classNames(
    css.didi,
    'h5-text',
    'text',
    {
      'h5-text__selectable': selectable
    },
    className
  )
  return (
    <span className={cls}  {...rest} >{children}</span>
  )
}