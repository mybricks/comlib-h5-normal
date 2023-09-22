import React from 'react';
import css from './style.less';


export default ({ title = '暂无内容' }) => {
  return (
    <div className={css.emptyCom}>
      {title}
    </div>
  )
}