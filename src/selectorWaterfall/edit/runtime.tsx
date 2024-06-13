import * as React from 'react';
import { SelectorList } from "./../runtime";
import { useDisabledArea } from './useDisabledArea'

export default (props) => {

  const DisabledArea = useDisabledArea()

  return (
    <DisabledArea>
      <SelectorList {...props} />
    </DisabledArea>
  );
  
}