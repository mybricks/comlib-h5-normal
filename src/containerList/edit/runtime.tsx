import * as React from 'react';
import { ContainerList } from './../runtime'
import { useDisabledArea } from './useDisabledArea'

export default (props) => {

  const DisabledArea = useDisabledArea()

  console.warn(props);

  return (
    <DisabledArea>
      <ContainerList {...props} />
    </DisabledArea>
  )
  
}