
export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "地图组件，用于展示地图，支持比例尺、指南针、缩放、拖动、实时路况等功能",
    usage: `地图组件，用于展示地图

data声明
scale: number = 16  # 地图缩放级别，范围3-20
minScale: number = 3  # 最小缩放级别
maxScale: number = 20  # 最大缩放级别
showScale: boolean = false  # 是否展示比例尺
showCompass: boolean = false  # 是否展示指南针
enableZoom: boolean = true  # 是否支持缩放，开启后用户可以通过缩放地图来改变地图的缩放级别
enableScroll: boolean = true  # 是否支持拖动，开启后用户可以通过拖动地图来改变地图的中心位置
enableRotate: boolean = false  # 是否支持旋转
enableTraffic: boolean = false  # 是否展示实时路况

slots插槽
无

styleAry声明
地图容器: .mybricks-map
  - 可编辑样式: border、background

layout声明
width: 可配置，默认100%
height: 可配置，默认300

注意事项
- 地图组件需要配置合法的地图key才能正常显示
- 缩放级别scale范围是3-20，数值越大显示越详细
- 实时路况功能enableTraffic依赖于地图服务商的支持
- 当前版本覆盖物配置功能暂未开放
`,
  },
  modifyTptJson: (component) => {
    try {
      // 暂无特殊处理逻辑
    } catch (error) {
      console.error("[AI] map modifyTptJson error:", error);
    }
  },
};
