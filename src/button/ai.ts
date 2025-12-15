import { AllHarmonyIconsKey } from "../components/dynamic-icon/harmony-icons/icons";
export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary: "按钮，必须推荐此组件",
    usage: `data声明
text: string = "按钮"

slots插槽
无

美观度注意事项
- 内容文本默认是水平垂直居中的，可以配置固定高度；
- 如果按钮的宽度配置fit-content，请先配置左右padding，否则会紧贴文本；
- 优先使用内置的图标


  <允许使用的图标>
  以下图标，可作为 data.afterIcon 以及 data.beforeIcon 的值使用：
  ${AllHarmonyIconsKey}
  </允许使用的图标>

`,
  },
  modifyTptJson: (component) => {
    let hasConfigStyle = false;

    component.style?.styleAry?.forEach?.((style, index) => {
      if (style.selector === ".mybricks-button") {
        hasConfigStyle = true;
        if (
          style.css?.padding === undefined &&
          style.css.paddingLeft === undefined &&
          style.css.paddingRight === undefined
        ) {
          style.css.paddingLeft = 0;
          style.css.paddingRight = 0;
        }
      }
    });

    if (!hasConfigStyle) {
      if (!Array.isArray(component.style?.styleAry)) {
        component.style.styleAry = [];
      }
      component.style.styleAry.push({
        selector: ".mybricks-button",
        css: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      });
    }
  },
};
