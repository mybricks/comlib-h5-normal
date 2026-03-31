import {
  safeModifyTptJson,
  transformTabsSelectors,
} from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "标签页组件，用于切换标签项，文字+下方选中条的tab形态，支持动态插槽",
    usage: `标签页组件，用于切换标签项

data声明
tabs: array = []  # 标签项数组，每个项包含_id和标题信息
activeTab: string = ""  # 当前激活的标签项_id

slots插槽
动态插槽：插槽id = 标签项的_id

styleAry声明
选中条: .taroify-tabs__line
  - 默认样式: backgroundColor: #EE0A24, width: 40px, height: 3px, borderRadius: 3px
  - 可编辑样式: backgroundColor、size、border相关

标签项-默认样式: .taroify-tabs__tab:not(.taroify-tabs__tab--active)
  - 可编辑样式: font、background、padding

标签项-选中样式: .taroify-tabs__tab--active
  - 可编辑样式: font、background、padding

layout声明
width: 可配置，默认100%
height: 可配置，默认fit-content

事件
onChange: 当切换标签时触发

注意事项
- 标签项的宽度默认是fill拉伸铺满，所有tab均分平铺；如果配置fit则是从左到右适应内容平铺
- 标签项（未选中）和标签项（已选中）的borderRadius、padding必须保持高度一致
- 插槽数量需要和tabs数组长度保持一致
- 用于切换逻辑的按钮组、日历月份选择等场景优先使用tab组件
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson((comp) => {
      transformTabsSelectors(comp);
    }, component, "tabs2");
  },
};
