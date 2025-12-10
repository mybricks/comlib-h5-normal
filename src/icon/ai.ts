import { AllTaroifyIconsKey } from "../components/dynamic-icon/icons";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary: "图标，内置丰富的图标类型",
    usage: `data声明
icon: string = "SettingOutlined"
fontColor: string = "#000000"
fontSize: number = 24

styleAry声明
图标: .mybricks-icon
- 默认样式: 无
- 可编辑样式: border、padding、background、boxshadow、margin相关

<允许使用的图标>
${AllTaroifyIconsKey.join("\n")}
</允许使用的图标>`,
  },
};
