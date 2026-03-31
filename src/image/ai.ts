import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "图片组件，用于展示图片，支持多种填充模式",
    usage: `图片组件，用于展示图片

data声明
src: string = ""  # 图片地址
mode: "scaleToFill" | "aspectFill" | "aspectFit" | "widthFix" | "heightFix" = "scaleToFill"  # 图片填充模式

slots插槽
无

layout声明
width: 可配置
height: 可配置，默认为fit-content

注意事项
- 对于图片组件，尽量保证图片的宽高，如果相对父元素，需要保证父元素的宽高
- 图片也可以配置背景色，在图片没加载出来的时候有兜底效果
- 一般选择scaleToFill模式，拉伸图片到铺满

关于图片链接：
- 如果是Logo，使用https://placehold.co?text=Logo来配置一个带文本和颜色的图标
- 如果是图片，使用https://ai.mybricks.world/image-search?term=dog&w=100&h=200
  - term代表搜索词
  - w和h可以配置图片宽高
- 注意参数：
  - 对于https://placehold.co的text参数的值，必须为英文字符，不允许为中文字符，如果是中文可以用拼音首字母
  - 对于https://placehold.co的颜色，背景颜色和文字颜色要区分开
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "image");
  },
};
