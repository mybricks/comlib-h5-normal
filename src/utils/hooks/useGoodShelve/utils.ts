import { useCallback, useMemo } from "react";
import { ICommodity } from "./constant";
import { parseModuleAndActionFromTitle } from "../../track";

export const useCommodityLogger = (
  data: ICommodity,
  comTitle: string,
  pos: number,
  ext: Object = {}
) => {
  const { actionName, moduleName } = parseModuleAndActionFromTitle(comTitle);

  const exposeAndClickParam = useMemo(() => {
    return JSON.stringify([
      {
        triggerTime: "SHOW",
        action: "OP_ACTIVITY_COMMODITY_CARD",
        params: {
          commodity_id: data.itemId,
          action_name: actionName,
          module_name: moduleName,
          pos,
          server_exp_tag: data.serverExpTag,
          ...ext,
        },
      },
      {
        triggerTime: "CLICK",
        action: "OP_ACTIVITY_COMMODITY_CARD",
        params: {
          commodity_id: data.itemId,
          action_name: actionName,
          module_name: moduleName,
          pos,
          server_exp_tag: data.serverExpTag,
          ...ext,
        },
      },
    ]);
  }, [data, pos]);

  const cartExposeAndClickParam = useMemo(() => {
    return JSON.stringify([
      {
        triggerTime: "SHOW",
        action: "OP_ACTIVITY_CART",
        params: {
          commodity_id: data.itemId,
          action_name: actionName,
          module_name: moduleName,
          pos,
          server_exp_tag: data.serverExpTag,
        },
      },
      {
        triggerTime: "CLICK",
        action: "OP_ACTIVITY_CART",
        params: {
          commodity_id: data.itemId,
          action_name: actionName,
          module_name: moduleName,
          pos,
          server_exp_tag: data.serverExpTag,
        },
      },
    ]);
  }, [data, pos]);

  // 没有数据的时候不能上报、特殊逻辑
  if (!data?.itemId) {
    return {
      exposeAndClickParam: JSON.stringify([]),
      cartExposeAndClickParam: JSON.stringify([]),
    };
  }

  return { exposeAndClickParam, cartExposeAndClickParam };
};
