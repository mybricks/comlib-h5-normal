import * as React from 'react';
import  TimeLine  from "./../runtime";
import { useDisabledArea } from './useDisabledArea'

export default (props) => {

  const DisabledArea = useDisabledArea()

  return (
    <DisabledArea>
      <TimeLine {...props} />
    </DisabledArea>
  )
  
}