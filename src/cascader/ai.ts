
export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "级联选择器，用于多层级数据的选择，如省市区选择、分类选择等场景",
    usage: `级联选择器，用于多层级数据的选择

data声明
placeholder: string = "请选择"  # 未选择的提示文案

slots插槽
无

styleAry声明
选项-默认样式: .mybricks-cascader .taroify-cascader__option:not(.taroify-cascader__option--active)
  - 可编辑样式: font、padding、background
  - 注意: font配置中textAlign被禁用

选项-选中样式: .mybricks-cascader .taroify-cascader__option--active
  - 可编辑样式: font、padding、background
  - 注意: font配置中textAlign被禁用

标签项-默认样式: .mybricks-cascader .taroify-tabs__tab:not(.taroify-tabs__tab--active)
  - 可编辑样式: font、size、border、padding、background
  - 注意: font配置中textAlign被禁用

标签项-选中样式: .mybricks-cascader .taroify-tabs__tab--active
  - 可编辑样式: font、size、border、padding、background
  - 注意: font配置中textAlign被禁用

选中条: .mybricks-cascader .taroify-tabs__line
  - 可编辑样式: border、background、size
  - 注意: background不支持背景图片，size支持width配置

layout声明
width: 可配置，默认100%
height: 可配置，默认375

输入项
setOptions: 设置选项数据
setValue: 设置选中值

事件
onSelect: 每当选择选项时触发
onChange: 当选择完毕时触发

注意事项
- 级联选择器的数据需要通过输入项setOptions动态设置
- 选项数据结构为树形结构，每个节点包含text、value、children字段
- 选中值通过输入项setValue设置，值为选中路径的value数组
`,
  },
  modifyTptJson: (component) => {
    try {
      // 暂无特殊处理逻辑
    } catch (error) {
      console.error("[AI] cascader modifyTptJson error:", error);
    }
  },
};
