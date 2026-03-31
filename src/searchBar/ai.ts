import {
  safeModifyTptJson,
  transformSearchBarSelectors,
} from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "搜索框组件，搜索框内部左侧支持展示/隐藏图标，内部右侧支持展示/隐藏搜索按钮",
    usage: `搜索框组件

schema=mybricks.taro.formContainer/formItem

data声明
placeholderText: string = "请输入关键词"  # 提示文字，该提示内容会在值为空时显示
label: string = ""  # 搜索框左侧文本
disabled: boolean = false  # 是否禁用输入框
showSearchButton: boolean = false  # 是否展示搜索按钮
searchButtonText: string = "搜索"  # 搜索按钮显示的文案
iconDistance: number = 4  # 图标与文字间的距离
autoFocus: boolean = false  # 是否自动聚焦
clearable: boolean = false  # 是否展示清除图标，当输入框有内容时可点击图标清除所有文字
isCustom: boolean = false  # 是否使用自定义图标，开启后可以上传自定义图标
src: string = ""  # 上传自定义图标的图片地址
contentSize: [number, number] = [14, 14]  # 自定义图标的尺寸 [高度, 宽度]

slots插槽
无

styleAry声明
搜索框样式: .mybricks-searchBar
  - 可编辑样式: font、background、border

内容文本: .mybricks-searchBar .mybricks-searchBar-input .taroify-input
  - 可编辑样式: font

提示内容文本: .mybricks-searchBar .mybricks-searchBar-input .taroify-input__placeholder
  - 可编辑样式: font

搜索按钮: .mybricks-searchBar .mybricks-searchButton
  - 可编辑样式: border、background、size、font、margin

layout声明
width: 可配置，默认375
height: 可配置，默认34

事件
onClick: 单击（仅在disabled为true时触发）
onChange: 输入框内容变化时
onClear: 点击清除按钮时
onSearch: 当触发搜索时

注意事项
- 当disabled为true时，输入框被禁用，此时单击事件onClick可触发
- 当disabled为false时，输入框可编辑，此时支持onChange、onClear、onSearch事件
- 自定义图标需要开启isCustom后才能配置
- 搜索按钮需要开启showSearchButton后才会显示
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      transformSearchBarSelectors(comp);
    }, component, "searchBar");
  },
};
