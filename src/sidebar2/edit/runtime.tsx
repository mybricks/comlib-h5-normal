import * as React from 'react';
import  SideBar  from './../runtime'
import { useDisabledArea } from './../../utils/hooks';

export default (props) => {

  const DisabledArea = useDisabledArea()

  return (
    <DisabledArea>
      <SideBar {...props} />
    </DisabledArea>
  )
  
}