import { safeModifyTptJson } from "../../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "系统底部标签栏，用于多页面切换，支持自定义图标和样式",
    usage: `系统底部标签栏

data声明
useTabBar: boolean = true  # 是否显示底部标签栏
tabBar: array = [  # 标签项数组
  {
    scene: object,  # 关联的场景/页面
    text: string,  # 标签文本
    selectedIconPath: string,  # 选中状态图标地址
    selectedIconStyle: object,  # 选中状态图标样式 { width: "22px", height: "22px" }
    selectedTextStyle: object,  # 选中状态文本样式 { color: "#FD6A00", fontSize: "12px" }
    normalIconPath: string,  # 未选中状态图标地址
    normalIconStyle: object,  # 未选中状态图标样式
    normalTextStyle: object  # 未选中状态文本样式 { color: "#909093", fontSize: "12px" }
  }
]
selectedTabItemIndex: number = 0  # 当前选中的标签项索引
selectedTabItemCatelog: string = "激活样式"  # 当前编辑的样式分类

slots插槽
无

styleAry声明
标签项-激活样式:
  - 图标: 可编辑样式 size
  - 文案: 可编辑样式 font

标签项-默认样式:
  - 图标: 可编辑样式 size
  - 文案: 可编辑样式 font

layout声明
无（系统级组件，固定定位在底部）

事件
onChange: 切换标签时触发

注意事项
- 标签栏至少需要2个标签项才能正常显示
- 当标签项数量小于2时，标签栏将自动隐藏
- 每个标签项需要配置选中和未选中两种状态的图标和样式
- 图标建议使用22px x 22px的尺寸
- 文本样式建议fontSize为12px
- 选中状态建议使用醒目的颜色（如#FD6A00橙色）
- 未选中状态建议使用灰色（如#909093）

最佳实践
- 标签项数量建议2-5个
- 图标风格保持一致（线性或面性）
- 标签文本简短清晰（2-4个汉字）
- 首页通常放在第一个位置
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "system/systemTabbar");
  },
};
