function callCon({ env, data, inputs, outputs, onError }, params = {}) {
  if (data.connector) {
    try {
      env
        .callConnector(data.connector, params, data.connectorConfig)
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
  if (env.runtime) {
    // //
    // inputs["setGlobalHeaders"]((e) => {
    //   if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
    //     Taro.setStorageSync("_MYBRICKS_GLOBAL_HEADERS_", obj);
    //   }
    //   return;
    // });

    // //
    // inputs["setGlobalParams"]((e) => {
    //   if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
    //     Taro.setStorageSync("_MYBRICKS_GLOBAL_PARAMS_", obj);
    //   }
    //   return;
    // });

    // //
    // inputs["setGlobalBody"]((e) => {
    //   if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
    //     Taro.setStorageSync("_MYBRICKS_GLOBAL_BODY_", obj);
    //   }
    //   return;
    // });

    if (data.immediate) {
      callCon({ env, data, outputs });
    } else {
      inputs["call"]((params) => {
        callCon({ env, data, outputs, onError }, params);
      });
    }
  }
}
