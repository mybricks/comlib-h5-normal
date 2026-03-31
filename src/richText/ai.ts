
export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "富文本组件，用于展示富文本内容，支持HTML标签和样式",
    usage: `富文本组件，用于展示富文本内容

data声明
useDynamic: boolean = false  # 仅使用动态渲染，开启后页面默认不会渲染静态的「内容」，数据必须经过输入项「设置内容」来设置
content: string = "<p style=\\"font-size: 16px; line-hight:24px;\\">这是一段<span style=\\"font-weight:500; color: red;\\">富文本</span>内容</p>"  # 富文本内容，支持HTML标签

slots插槽
无

styleAry声明
富文本容器: .taro_html
  - 可编辑样式: border、padding、background

layout声明
width: 可配置，默认300
height: 可配置，默认为auto

输入项
setContent: 设置内容（仅在useDynamic为true时需要使用）

注意事项
- 富文本内容支持常见的HTML标签和行内样式
- 当useDynamic为true时，组件不会渲染静态content，需要通过输入项动态设置
- 富文本内容会被encodeURIComponent编码存储
`,
  },
  modifyTptJson: (component) => {
    try {
      // 暂无特殊处理逻辑
    } catch (error) {
      console.error("[AI] richText modifyTptJson error:", error);
    }
  },
};
