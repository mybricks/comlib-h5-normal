# 使用文档：CoverImage
> 覆盖在原生组件之上的图片视图。可覆盖的原生组件同cover-view，支持嵌套在cover-view里。

## CoverImageProps

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| src | `string` | 是 | 图标路径，支持临时路径、网络地址、云文件ID。暂不支持base64格式。 |
| referrerPolicy | "origin" or "no-referrer" | 否 | 格式固定为 https://servicewechat.com/{appid}/{version}/page-frame.html，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本； |
| fixedTop | `string` | 否 | 设置与容器顶部的固定距离，效果相当于在 CSS 中设置 position: fixed 和 top 值，该属性优先级高于 fixed-bottom，CSS 设置的 position、top、bottom 值 |
| fixedRight | `string` | 否 | 设置与容器右侧的固定距离，效果相当于在 CSS 中设置 position: fixed 和 right 值，该属性优先级高于 CSS 设置的 position、left、right 值 |
| fixedBottom | `string` | 否 | 设置与容器底部的固定距离，效果相当于在 CSS 中设置 position: fixed 和 bottom 值，该属性优先级高于 CSS 设置的 position、top、bottom 值 |
| fixedLeft | `string` | 否 | 设置与容器左侧的固定距离，效果相当于在 CSS 中设置 position: fixed 和 left 值，该属性优先级高于 fixed-right，CSS 设置的 position、left、right 值 |
| ariaRole | `string` | 否 | 无障碍访问，（角色）标识元素的作用 |
| ariaLabel | `string` | 否 | 无障碍访问，（属性）元素的额外描述 |
| onLoad | `EventFunction` | 否 | 图片加载成功时触发 |
| onError | `EventFunction` | 否 | 图片加载失败时触发 |
| onTap | `EventFunction` | 否 | 点击事件回调。 |