import * as React from 'react';
import  Runtime  from './../runtime'
import { useDisabledArea } from './../../utils/hooks';

export default (props) => {

  const DisabledArea = useDisabledArea()

  return (
    <DisabledArea>
      <Runtime {...props} />
    </DisabledArea>
  )
  
}