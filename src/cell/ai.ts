
export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "单元格组件，用于展示列表项，支持左侧图标、标题、描述、右侧内容和箭头，支持左滑操作",
    usage: `单元格组件，用于展示列表项

data声明
size: "large" | "medium" | "small" = "large"  # 单元格尺寸
align: "center" | "top" | "bottom" = "center"  # 内容垂直对齐方式
useThumb: boolean = false  # 是否展示图标
thumb: string = ""  # 图标图片地址
title: string = "单元格"  # 单元格标题
brief: string = "描述信息"  # 单元格的描述，用于显示补充信息
useChildren: boolean = false  # 开启内容插槽，开启后可在单元格右侧内容区域中添加自定义内容
slotStyle: object = {}  # 内容插槽布局样式
content: string = "内容"  # 单元格右侧的内容，用于显示主要信息（仅在useChildren为false时有效）
useArrowIcon: boolean = true  # 是否显示右箭头
arrowIconColor: string = "#969799"  # 右箭头颜色
useSwipeLeft: boolean = false  # 是否支持左滑，开启后可左滑单元格显示操作按钮
leftSwipeText: string = "删除"  # 左滑主按钮文案
leftSwipeStyle: object = { width: 50 }  # 左滑主按钮样式
useSwipeLeftSecondary: boolean = false  # 是否开启左滑副按钮
leftSwipeTextSecondary: string = ""  # 左滑副按钮文案
leftSwipeStyleSecondary: object = { width: 50 }  # 左滑副按钮样式

slots插槽
content: 内容插槽，仅在useChildren为true时有效

styleAry声明
单元格样式: .mybricks-cell
  - 可编辑样式: border、background、padding

图标: .mybricks-thumb
  - 可编辑样式: size、border

标题: .mybricks-title
  - 可编辑样式: font、margin

描述: .mybricks-brief
  - 可编辑样式: font

内容: .mybricks-content
  - 可编辑样式: font、margin

layout声明
width: 可配置，默认375
height: 可配置，默认为auto

事件
onClick: 单击单元格时触发
onClickLeftAction: 单击左滑主按钮时触发（仅在useSwipeLeft为true时）
onClickLeftActionSecondary: 单击左滑副按钮时触发（仅在useSwipeLeftSecondary为true时）

注意事项
- 当useChildren为true时，content属性无效，需要在content插槽中添加自定义内容
- 左滑功能需要开启useSwipeLeft后才能使用
- 右箭头颜色仅在useArrowIcon为true且useChildren为true时可配置
- 主按钮和副按钮的样式支持background、font、size、border配置
`,
  },
  modifyTptJson: (component) => {
    try {
      // 暂无特殊处理逻辑
    } catch (error) {
      console.error("[AI] cell modifyTptJson error:", error);
    }
  },
};
