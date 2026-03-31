import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "表格组件，用于展示多行多列的数据集合，支持自定义列、固定列、触底加载等功能",
    usage: `表格组件，用于展示多行多列的数据集合

data声明
columns: array = []  # 列配置数组
  - title: string  # 列标题
  - dataIndex: string  # 列数据字段名
  - type: "text" | "slot"  # 列类型，默认text
  - autoWidth: boolean  # 是否自动宽度，默认true
  - width: string  # 列宽度，默认100
  - minWidth: string  # 列最小宽度，默认90
  - bgColor: string  # 列背景颜色，默认#FFFFFF
  - uid: string  # 列唯一标识，默认随机生成
  - id: string  # 列id，column_加uid生成
  - _id: string  # 列内部id，跟id保持一致

bordered: boolean = false  # 是否展示列边框
hiddenTableHeader: boolean = false  # 是否隐藏表头
useLeftSticky: boolean = false  # 是否固定首列
useRightSticky: boolean = false  # 是否固定末列
enableLoadMore: boolean = false  # 是否开启触底加载
pagenation: object = { page: 1, pageSize: 10 }  # 触底加载分页配置

slots插槽
动态列id插槽: 当columns中某一列的type配置为'slot'时，会生成对应列id的插槽用于自定义渲染列内容

styleAry声明
无

layout声明
width: 可配置，默认100%
height: 可配置，默认auto

事件
onLoadMore: 触底加载时触发（enableLoadMore为true时）

注意事项
- columns每一列的字段都不能为空，必须包含uid、id、_id、title、dataIndex
- 表格列columns配置中，dataIndex必须与真实数据的字段名完全对应
- 如果表格列autoWidth为false，宽度width必须满足表头标题不换行
- 如果某列的内容需要自定义（如按钮、标签等），请将该列的type设置为'slot'，并在对应的插槽内拖入相应组件
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "table");
  },
};
