function callCon({ env, data, inputs, outputs, onError }, params = {}) {
  if (data.connector || data.dynamicConfig) {
    try {
      let finnalConnector = {
        ...(data.connector || {}),
        outputSchema: data.outputSchema,
      };

      if (data.dynamicConfig) {
        finnalConnector = data.dynamicConfig;
      }

      if (data.timeout) {
        finnalConnector.timeout = data.timeout;
      }

      env
        .callConnector(finnalConnector, params, {
          ...(data.connectorConfig || {}),
          outputSchema: finnalConnector?.outputSchema,
          isMultipleOutputs: true,
        })
        .then((val) => {
          outputs[val?.__OUTPUT_ID__ ?? "then"](
            val?.__ORIGIN_RESPONSE__ ?? val
          );
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

function isPlainObject(value) {
  if (typeof value !== "object" || value === null) return false;

  let proto = Object.getPrototypeOf(value);
  if (proto === null) return true; // 没有原型的对象也视为普通对象

  // 检查对象是否是由Object构造函数创建的
  return proto === Object.prototype;
}

export default function ({ env, data, inputs, outputs, onError }) {
  if (!env.runtime) {
    return;
  }

  if (data.immediate) {
    callCon({ env, data, outputs });
  } else {
    inputs["call"]((params) => {
      // 如果 params 不是 对象，则转换为空对象
      if (!isPlainObject(params)) {
        params = {};
      }

      callCon({ env, data, outputs, onError }, params);
    });
  }
}
