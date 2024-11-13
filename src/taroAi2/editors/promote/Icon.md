# 使用文档：Icon
> 图标。组件属性的长度单位默认为 px

## IconProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| type | `keyof TIconType` |  | 是 | icon 的类型 |
| size | `string` | `23` | 否 | icon 的大小，单位px |
| color | `string` |  | 否 | icon 的颜色，同 css 的 color |
| ariaLabel | `string` |  | 否 | 无障碍访问，（属性）元素的额外描述 |

### TIconType

icon 的类型

| 参数 | 说明 |
| --- | --- |
| success | 成功图标 |
| success_no_circle | 成功图标（不带外圈） |
| info | 信息图标 |
| warn | 警告图标 |
| waiting | 等待图标 |
| cancel | 取消图标 |
| download | 下载图标 |
| search | 搜索图标 |
| clear | 清除图标 |
| circle | 圆环图标(多选控件图标未选择)「微信文档未标注属性」 |
| info_circle | 带圆环的信息图标「微信文档未标注属性」 |
