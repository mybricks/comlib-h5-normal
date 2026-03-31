import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "轮播组件，下方带指示器的轮播容器，支持图片轮播和自定义内容轮播",
    usage: `轮播组件

data声明
items: array = []  # 轮播项数组，每个项包含_id、图片地址等
autoplay: boolean = false  # 是否自动播放
interval: number = 5000  # 自动播放间隔时间，单位为毫秒
duration: number = 500  # 滑动动画时长，单位为毫秒
circular: boolean = false  # 是否采用衔接滑动
vertical: boolean = false  # 是否为纵向滚动

slots插槽
slot_{_id}: 轮播插槽内容，跟着当前item的_id走，仅在自定义内容时存在

styleAry声明
无

layout声明
width: 可配置
height: 可配置

事件
onChange: 当切换轮播项时触发

注意事项
- 轮播类型，如果是图片，配置链接即可，如果是自定义内容，需要配置轮播项，并且向插槽内添加子组件来渲染
- 对于轮播图必须给定高度、自定义内容轮播组件则建议fit-content
- 对于展示轮播内容，要作为一个产品经理进行深度思考（比如：有些自定义轮播是一个轮播项里面可以放多个子项目的）
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "swiper");
  },
};
