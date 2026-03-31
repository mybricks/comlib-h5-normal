import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "二维码组件，用于展示二维码或条形码",
    usage: `二维码组件

data声明
text: string = "hello MyBricks"  # 二维码/条形码内容
mode: "qrcode" | "barcode" = "qrcode"  # 二维码类型，目前仅支持qrcode

slots插槽
无

styleAry声明
无

layout声明
width: 可配置，默认100
height: 可配置，默认为fit-content

事件
无

注意事项
- 二维码内容text可以是任意字符串，如URL、文本等
- 二维码尺寸由layout的width和height决定
- 当前版本仅支持二维码(qrcode)，条形码(barcode)功能暂未开放
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "qrcode");
  },
};
