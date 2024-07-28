export default function ({ env, data, inputs, outputs, _inputsCallable }) {
  if (!env.runtime) {
    return;
  }

  inputs["goto"]((val) => {
    let sceneId = getSceneIdFromPath(val);

    if (!sceneId || !env.canvas.pages[sceneId]) {
      console.error("sceneId 不存在");
      return;
    }

    // 从 val 中解析出参数
    let params = getParamsFromPath(val);

    env.canvas._open(sceneId, params, data.action);
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
      } catch (e) {}

      try {
        value = JSON.parse(value);
      } catch (e) {}

      params[key] = value;
    });

    return params;
  }
}
