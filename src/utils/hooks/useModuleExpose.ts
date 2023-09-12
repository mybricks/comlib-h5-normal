import { useMemo, useState } from "react";
import { parseModuleAndActionFromTitle } from "../track";

export const useModuleExpose = (
  moduleName: string,
  show: boolean,
  weblog: any
) => {
  const [exposed, setExposed] = useState(false);
  if (!show || exposed) {
    return;
  }
  setExposed(true);

  weblog?.collect("SHOW", {
    action: "OP_ACTIVITY_MODULE",
    params: {
      action_name: moduleName,
    },
  });
};
