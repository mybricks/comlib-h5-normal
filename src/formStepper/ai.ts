
export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "数字输入(Stepper)，左侧减图标，中间输入，右侧加图标的数字输入框，用于输入数量等数值场景",
    usage: `数字输入(Stepper)，左侧减图标，中间输入，右侧加图标的数字输入框

schema=mybricks.taro.formContainer/formItem

data声明
label: string = "数字输入"  # 表单项标签
hideLabel: boolean = false  # 是否隐藏标签
name: string = "数字输入"  # 表单项字段名
value: number = 0  # 当前数值
step: number = 1  # 步长，每一次点击增加和减少调整的数值
min: number = 0  # 最小值
max: number = 999  # 最大值

slots插槽
无

styleAry声明
数字: .taroify-stepper__input
  - 可编辑样式: border、background、font、size、margin
  - 注意: font配置中textAlign被禁用

增加按钮样式: .taroify-stepper__increase
  - 可编辑样式: border、background、font、size、margin
  - 注意: font配置中textAlign被禁用

减少按钮样式: .taroify-stepper__decrease
  - 可编辑样式: border、background、font、size、margin
  - 注意: font配置中textAlign被禁用

layout声明
width: 可配置，默认100%
height: 不可配置，默认为auto

事件
onChange: 当值变化时触发

注意事项
- 点击增加按钮时，数值会增加step；点击减少按钮时，数值会减少step
- 数值受min和max限制，不会超出范围
- 中间输入框支持直接输入数字
`,
  },
  modifyTptJson: (component) => {
    try {
      // 暂无特殊处理逻辑
    } catch (error) {
      console.error("[AI] formStepper modifyTptJson error:", error);
    }
  },
};
