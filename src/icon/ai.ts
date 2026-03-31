import { AllHarmonyIconsKey } from "../components/dynamic-icon/harmony-icons/icons";
import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "图标组件，内置丰富的图标类型，也可作为图标样式的按钮使用",
    usage: `图标组件，内置丰富的图标类型

data声明
icon: string = "HM_plus"  # 图标名称
fontColor: string = "#000000"  # 图标颜色
fontSize: number = 24  # 图标大小

slots插槽
无

styleAry声明
图标: .mybricks-icon
  - 可编辑样式: padding、backgroundColor、border

layout声明
width: 可配置，默认24
height: 可配置，默认24

注意事项
- 通过layout的固定宽高可以实现类似按钮和图片的效果
- 如果配置背景，建议宽高和大小配置有区别，否则图标会占满背景
- 图标组件任何时候优先推荐使用，当明确发现导航入口、图标时，使用此组件而不是图片

<允许使用的图标>
${AllHarmonyIconsKey.join("\n")}
</允许使用的图标>
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      if (comp?.data?.fontColor) {
        comp.data.fontColor = [comp.data.fontColor];
      }
      if (
        !comp.data?.icon ||
        !AllHarmonyIconsKey.includes(comp?.data?.icon)
      ) {
        if (!comp?.data) {
          comp.data = {};
        }
        comp.data.icon = "HM_plus";
      }
    }, component, "icon");
  },
};
