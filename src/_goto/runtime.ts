import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, _inputsCallable }) {
  if (!env.runtime) {
    return;
  }

  inputs["goto"]((val) => {
    let sceneId = getSceneIdFromPath(val);

    // 从 val 中解析出参数
    let params = getParamsFromPath(val);
    console.log("env", env, "sceneId", sceneId, "params", params, "data.action", data.action)
    if (env.runtime.debug) {
      env.canvas.open(sceneId, params, data.action);
    }else{
      if(data.action === "redirectTo"){
        Taro.redirectTo({
          url: val,
        })
      }else if(data.action === "navigateTo"){
        Taro.navigateTo({
          url: val,
        })
      }else if(data.action === "reLaunch"){
        Taro.reLaunch({
          url: val,
        })
      }
    }
  });

  function getSceneIdFromPath(path) {
    // path 可能的格式为 /pages/U_aabb/index?sceneId=123
    // sceneId 为 pages 后面的这段 U_aabb

    if (!path) {
      return;
    }

    let parts = path.split("/");
    let sceneId = parts[2];
    return sceneId;
  }

  function getParamsFromPath(path) {
    let parts = path.split("?");
    if (parts.length < 2) {
      return {};
    }

    let paramsStr = parts[1] || "";
    let params = {};
    paramsStr.split("&").forEach((item) => {
      let [key, value] = item.split("=");

      // value 可能经过 encodeURIComponent 编码，需要解码
      try {
        value = decodeURIComponent(value);
      } catch (e) { }

      try {
        value = JSON.parse(value);
      } catch (e) { }

      params[key] = value;
    });

    return params;
  }
}
