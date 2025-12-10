export default {
  ignore: false,
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '基础布局组件，可以用做布局组件和背景样式容器，必须使用',
    usage: `基础布局组件，可以用做布局组件和背景样式容器，必须使用。

slots插槽
content 内容

layout声明
width: 可配置，默认100%
height: 可配置，默认160

<配置流程>
  1. 确认配置布局编辑器为flex布局，必须配置；
  2. 由于宽度、高度都和布局相关，需要根据确认的布局，完成宽高的配置；
  3. 根据需求完成其它layout和样式配置；
</配置流程>
`
  }
}