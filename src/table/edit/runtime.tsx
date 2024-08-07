import * as React from "react";
import Runtime from "./../runtime";
import { useDisabledArea } from "./useDisabledArea";

export default (props) => {
  const DisabledArea = useDisabledArea();

  return (
    <DisabledArea>
      <Runtime {...props} />
    </DisabledArea>
  );
};
