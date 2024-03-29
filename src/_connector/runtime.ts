function callCon({ env, data, inputs, outputs, onError }, params = {}) {

  if (data.connector || data.dynamicConfig) {
    try {
      let finnalConnector = data.connector;

      if (data.dynamicConfig) {
        finnalConnector = data.dynamicConfig;
      }

      env
        .callConnector(finnalConnector, params, data.connectorConfig)
        .then((val) => {
          outputs["then"](val);
        })
        .catch((err) => {
          outputs["catch"](err);
        });
    } catch (ex) {
      console.error(ex);

      outputs["catch"](`执行错误 ${ex.message || ex}`);
      //onError(ex.message)
    }
  } else {
    outputs["catch"](`没有选择接口`);
  }
}

export default function ({ env, data, inputs, outputs, onError }) {
  if (!env.runtime) {
    return;
  }

  if (data.immediate) {
    callCon({ env, data, outputs });
  } else {
    inputs["call"]((params) => {
      callCon({ env, data, outputs, onError }, params);
    });
  }
}
