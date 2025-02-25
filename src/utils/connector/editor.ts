import { ConnectorFiledName } from './constants'

export const connectorEditor = <T>(params: {
  set?: (params: any, result: { schema: any }) => void;
  remove?: (params: any) => void;
}) => {

  const { set, remove } = params;

  return {
    "@connector": {
      get: ({ data }) => {
        return data[ConnectorFiledName]?.connector;
      },
      async set(params, connector) {
        const outputSchema = connector.markList[0].outputSchema;
        params.data[ConnectorFiledName] = {
          // globalMock: connector.globalMock
          outputSchema,
          connector: {
            id: connector.id,
            title: connector.title,
            type: connector.type,
            connectorName: connector.connectorName,
            script: connector.script
          }
        }

        set?.(params as T, { schema: outputSchema });
      },
      remove(params) {
        Reflect.deleteProperty(params.data, ConnectorFiledName);
        remove?.(params as T);
      }
    }
  }
}
