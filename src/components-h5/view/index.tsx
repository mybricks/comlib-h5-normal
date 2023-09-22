import * as React from 'react';
import './index.less'

export default ({ children, ...rest }: any) => {
  return (
    <div {...rest}>
      {children}
    </div>
  )
}