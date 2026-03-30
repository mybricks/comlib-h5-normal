export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary: "表格组件，用于展示多行多列的数据集合(当遇到表格时高优先使用)",
    usage: `表格组件
何时使用：当需要展示大量结构化数据时使用此组件。支持自定义列、固定首末列、触底加载等功能。

data声明
columns: {title: string, dataIndex: string, type: 'text' | 'slot', autoWidth?: boolean, width?: string, minWidth?: string, bgColor?: string, uid: string, id: string, _id: string}[] = []
bordered: boolean = false # 是否展示列边框
hiddenTableHeader: boolean = false # 是否隐藏表头
useLeftSticky: boolean = false # 是否固定首列
useRightSticky: boolean = false # 是否固定末列
enableLoadMore: boolean = false # 是否开启触底加载
pagenation: {page: number, pageSize: number} # 触底加载分页配置

slots插槽
动态列id插槽 # 当 columns 中某一列的 type 配置为 'slot' 时，会生成对应列 id 的插槽用于自定义渲染列内容

layout声明
width: 可配置，默认100%
height: 可配置，默认auto

注意事项
- columns每一列的字段都不能为空
    - uid: 列唯一标识，默认随机生成
    - id: 列id，column_加uid生成
    - _id: 跟id保持一致
    - title: 列标题
    - dataIndex: 列数据字段名
    - type: 列类型，默认text
    - autoWidth: 是否自动宽度，默认true
    - width: 列宽度，默认100
    - minWidth: 列最小宽度，默认90
    - bgColor: 列背景颜色，默认#FFFFFF
- 表格列 columns 配置中，dataIndex 必须与真实数据的字段名完全对应；
- 如果表格列autoWidth为false，宽度width必须满足表头标题不换行
- 如果某列的内容需要自定义（如按钮、标签等），请将该列的 type 设置为 'slot'，并在对应的插槽内拖入相应组件；
`,
  },
};
