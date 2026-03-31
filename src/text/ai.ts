import { safeModifyTptJson, handleTextCenterAlign } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "文本组件，用于显示文本内容，支持字体样式、对齐、省略号等功能",
    usage: `文本组件，用于显示文本内容

data声明
content: string = ""  # 文本内容
ellipsis: boolean = false  # 是否开启省略号
maxLines: number = 1  # 最大行数，开启省略号时有效

slots插槽
无

styleAry声明
文本: .mybricks-text
  - 可编辑样式: font、color、textAlign、lineHeight等

layout声明
width: 可配置
height: 不可配置，默认为fit-content

注意事项
- 注意配置fontSize同时要配置lineHeight，否则会无法正常展示
- 尽量不用全黑的字体颜色，而是用柔和一些的颜色比如深灰色
- 对于大部分（特别是动态内容）的文本，需要配置ellipsis + maxLines，防止内容过多换行
- 注意文本和其他组件之间要留有适量的边距（通过layout进行配置）
- 配置了textAlign为center时，width会自动设置为100%以确保居中效果
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      handleTextCenterAlign(comp);
    }, component, "text");
  },
};
