import { useRef, useEffect, useMemo } from "react";
import { ConnectorFiledName } from './constants'

export const useConnector = ({ env, data }, callback) => {
  const stateRef = useRef({
    init: false,
    stop: false,
  });

  const connector = data[ConnectorFiledName]

  useEffect(() => {
    if (connector && !stateRef.current.stop) {
      callback(new Promise((resolve, reject) => {
        env.callConnector(
          connector.connector,
          {},
          { 
            outputSchema: connector.outputSchema,
            isMultipleOutputs: false,
          },
        ).then((res) => {
          if (!stateRef.current.stop) {
            resolve(res);
          }
        }).catch((err) => {
          if (!stateRef.current.stop) {
            reject(err);
          }
        })
      }), stateRef.current);
    }
  }, [connector])

  return stateRef.current;
}