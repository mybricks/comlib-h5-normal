
export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "基础容器组件，用于布局和组织内容，支持背景、边框、阴影等样式配置，支持点击事件",
    usage: `基础容器组件，用于布局和组织内容

主要作用：
1. 作为页面的根容器或分组容器
2. 组织相关组件，提供统一的样式（背景、边框、圆角、阴影）
3. 控制内部内容的布局方式

何时使用：
- 需要为多个组件提供统一的背景、边框、圆角等样式时
- 需要作为分组容器组织相关组件时
- 需要点击交互的容器区域时

何时不应该使用：
- 单纯为了调整单个组件的位置（应使用组件自身的margin）
- 嵌套层级过深（建议最多3层）

data声明
layout: object = { position: "smart" }  # 布局配置
  # position: "smart" | "flex"  # 布局方式，强烈推荐使用"flex"
  # 当position为flex时，可配置：
  #   - flexDirection: "row" | "column"  # 主轴方向
  #   - justifyContent: "flex-start" | "center" | "flex-end" | "space-between" | "space-around"  # 主轴对齐
  #   - alignItems: "flex-start" | "center" | "flex-end" | "stretch"  # 交叉轴对齐
  #   - flexWrap: "nowrap" | "wrap"  # 是否换行

slots插槽
content: 内容插槽，用于放置子组件

styleAry声明
容器: > .mybricks-container
  - 可编辑样式: padding、border、background、overflow、boxShadow

layout声明
width: 可配置，默认100%
height: 可配置，默认160

事件
onClick: 单击容器时触发

布局配置最佳实践
⚠️ 强烈推荐使用 flex 布局，避免使用 smart 布局

1. 【推荐】flex 布局 - 标准 CSS Flexbox 布局
   - 优点：行为可预测，符合开发直觉，与标准 CSS 一致
   - 适用场景：绝大多数布局场景
   - 配置示例：
     {
       position: "flex",
       flexDirection: "row",      // 水平排列
       justifyContent: "center",  // 水平居中
       alignItems: "center"       // 垂直居中
     }

2. 【不推荐】smart 布局 - 智能绝对定位布局
   - 缺点：行为不可预测，可能存在定位异常，不符合常规开发习惯
   - 仅在没有其他选择时才考虑使用

常见 flex 布局场景
- 水平居中：justifyContent: "center", alignItems: "center"
- 垂直排列：flexDirection: "column"
- 两端对齐：justifyContent: "space-between"
- 平均分布：justifyContent: "space-around"
- 自动换行：flexWrap: "wrap"

注意事项
- 确认当前布局信息，必须配置
- 容器支持标准 CSS 的 overflow 配置，常用于实现滚动或裁剪溢出内容
- 容器本身无默认背景色，需要手动配置
- 容器的点击事件在内部组件也有点击事件时可能冲突，注意事件冒泡
- 
`,
  },
  asLayout: true,
  modifyTptJson: (component) => {
    try {
      // 暂无特殊处理逻辑
    } catch (error) {
      console.error("[AI] containerBasic modifyTptJson error:", error);
    }
  },
};
