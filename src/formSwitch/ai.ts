import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "开关组件，常见的圆形移动端开关",
    usage: `开关组件

schema=mybricks.taro.formContainer/formItem

data声明
label: string = ""  # 表单项标签
name: string = ""  # 表单项字段名
checked: boolean = false  # 是否选中
disabled: boolean = false  # 是否禁用
color: string = "#1989FA"  # 开关选中时的颜色

slots插槽
无

styleAry声明
开关选中: .taroify-switch--checked
  - 可编辑样式: backgroundColor

layout声明
width: 不可配置，建议使用fit-content
height: 不可配置，默认为fit-content

事件
onChange: 当开关状态变化时触发

元素组成
- 一个常见的圆形移动端开关，宽度为48，高度为24

注意事项
- 开关的颜色通过styleAry中的.taroify-switch--checked选择器配置backgroundColor
- 开关尺寸固定，不适合调整大小
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      if (comp?.data?.color) {
        if (!comp.style) {
          comp.style = {};
        }

        if (!comp.style?.styleAry) {
          comp.style.styleAry = [
            {
              selector: ".taroify-switch--checked",
              css: { backgroundColor: comp.data.color },
            },
          ];
        }
        delete comp.data.color;
      }
    }, component, "formSwitch");
  },
};
