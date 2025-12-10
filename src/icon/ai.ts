import { AllTaroifyIconsKey } from "../components/dynamic-icon/icons";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary: `图标，内置丰富的图标类型，也可作为图标样式的按钮使用
何时使用：任何时候优先推荐此组件，当明确发现导航入口、图标时，使用此组件。
`,
    usage: `图标，内置丰富的图标类型，也可作为图标样式的按钮使用
何时使用：任何时候优先推荐此组件，当明确发现导航入口、图标时，使用此组件，而不是图片。
  data声明
  icon: string = "camera"
  fontColor: string = "#000000"
  fontSize: number = 24
  fontWeight: number = 400

  styleAry声明
  图标: .mybricks-icon 
  - 默认样式: 无
  - 可配置样式: padding、backgroundColor、border

  layout声明
  width: 可配置，默认24
  height: 可配置，默认为24

  通过layout的固定宽高可以实现类似按钮和图片的效果
  
  注意：如果配置背景，建议宽高和大小配置有区别，否则图标会占满背景。

  <允许使用的图标>
  ${AllTaroifyIconsKey.join("\n")}
  </允许使用的图标>`,
  },
  modifyTptJson: (component) => {
    if (component?.data?.fontColor) {
      component.data.fontColor = [component.data.fontColor];
    }
    if (
      !component.data?.icon ||
      !AllTaroifyIconsKey.includes(component?.data?.icon)
    ) {
      if (!component?.data) {
        component.data = {};
      }
      component.data.icon = "picture";
    }
  },
};
