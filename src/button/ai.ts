import { AllHarmonyIconsKey } from "../components/dynamic-icon/harmony-icons/icons";
import { safeModifyTptJson, initStyleAry } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "按钮组件，支持文本、图片两种模式，支持前后置图标，支持多种微信开放能力（手机号获取、分享、客服等）",
    usage: `按钮组件

data声明
text: string = "按钮"  # 按钮文案（仅在useButtonImg为false时有效）
disabled: boolean = false  # 是否禁用按钮点击
useButtonImg: boolean = false  # 是否配置为图片按钮
buttonImg: string = ""  # 按钮图片地址（仅在useButtonImg为true时有效）

# 前置图标配置
useBeforeIcon: boolean = false  # 是否显示前置图标
useBeforeIconImg: boolean = false  # 是否使用自定义前置图标
beforeIconUrl: string = ""  # 前置自定义图标图片地址
beforeIcon: string = "HM_plus"  # 前置内置图标名称
beforeIconSize: number = 16  # 前置图标大小
beforeIconColor: string = "#ffffff"  # 前置图标颜色
beforeIconSpacing: number = 8  # 前置图标与文字间距

# 后置图标配置
useAfterIcon: boolean = false  # 是否显示后置图标
useAfterIconImg: boolean = false  # 是否使用自定义后置图标
afterIconUrl: string = ""  # 后置自定义图标图片地址
afterIcon: string = "HM_plus"  # 后置内置图标名称
afterIconSize: number = 16  # 后置图标大小
afterIconColor: string = "#ffffff"  # 后置图标颜色
afterIconSpacing: number = 8  # 后置图标与文字间距

# 样式配置
style: object = { background: "#ea732e", color: "#ffffff", "border-radius": "0px", "border-width": "0px" }  # 按钮基础样式

# 开放能力配置
openType: "" | "share" | "getPhoneNumber" | "getRealtimePhoneNumber" | "openSetting" | "contact" | "feedback" | "chooseAvatar" = ""  # 按钮开放能力类型

slots插槽
无

styleAry声明
按钮-默认样式: .mybricks-button
  - 可编辑样式: font、border、padding、background、boxshadow
  - 默认开启

按钮-禁用样式: .mybricks-button-disable
  - 可编辑样式: font、border、padding、background、boxshadow
  - 默认开启

前置图标: .mybricks-beforeIcon
  - 可编辑样式: size、margin

后置图标: .mybricks-afterIcon
  - 可编辑样式: size、margin

layout声明
width: 可配置，默认120
height: 可配置，默认42

输入项
buttonText: 修改按钮文本（仅在useButtonImg为false时）
buttonImg: 修改按钮图片（仅在useButtonImg为true时）

事件
onClick: 单击（仅在openType为空时）

# 微信开放能力相关事件
share: 用户转发时触发（openType为share时）
getPhoneNumberSuccess: 获取动态令牌成功（openType为getPhoneNumber时，仅支持真机）
getPhoneNumberFail: 获取动态令牌失败（openType为getPhoneNumber时，仅支持真机）
getRealtimePhoneNumberSuccess: 获取动态令牌成功（openType为getRealtimePhoneNumber时，仅支持真机）
getRealtimePhoneNumberFail: 获取动态令牌失败（openType为getRealtimePhoneNumber时，仅支持真机）
openSetting: 打开授权页时触发（openType为openSetting时）
chooseAvatarSuccess: 获取头像成功（openType为chooseAvatar时，仅支持真机）

注意事项
- 按钮文案和按钮图片互斥，useButtonImg为true时text无效
- 图标可以使用内置图标或上传自定义图片，互斥
- 开放能力仅在微信小程序环境下有效
- 内置图标仅在useBeforeIcon/useAfterIcon为true且useBeforeIconImg/useAfterIconImg为false时有效

<允许使用的图标>
以下图标，可作为 beforeIcon 以及 afterIcon 的值使用：
${AllHarmonyIconsKey.join("\n")}
</允许使用的图标>
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      let hasConfigStyle = false;

      comp.style?.styleAry?.forEach?.((style: any) => {
        if (style.selector === ".mybricks-button") {
          hasConfigStyle = true;
          if (
            style.css?.padding === undefined &&
            style.css?.paddingLeft === undefined &&
            style.css?.paddingRight === undefined
          ) {
            style.css.paddingLeft = 0;
            style.css.paddingRight = 0;
          }
        }
      });

      if (!hasConfigStyle) {
        initStyleAry(comp, {
          selector: ".mybricks-button",
          css: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        });
      }
    }, component, "button");
  },
};
