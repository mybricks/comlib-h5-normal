import * as React from 'react';
import { ContainerList } from './../runtime'
import { useDisabledArea } from './../../utils/hooks';

export default (props) => {

  const DisabledArea = useDisabledArea()

  return (
    <DisabledArea>
      <ContainerList {...props} />
    </DisabledArea>
  )
  
}