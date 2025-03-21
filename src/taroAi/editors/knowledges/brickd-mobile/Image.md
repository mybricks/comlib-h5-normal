# Image 图片

## 代码演示

### 基础用法

基础用法与原生 `img` 标签一致，可以设置 `src`、`alt` 等原生属性。<br>
通过 `width` 和 `height` 设置图片大小，若未指定，会从style中读取`width`,`height`属性。 <br>
width和height若为number, 会经过 `pxTransform` 转换
除了通过width、height配置图片大小，也需要同时通过 `style` 设置。

```tsx
<Image width={200} height={200} src="https://img.yzcdn.cn/vant/cat.jpeg" />
```

### 填充模式

通过 `mode` 属性可以设置图片填充模式，可选值见下方表格。

```tsx
<Image
  width={200}
  height={200}
  mode="scaleToFill"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 图片懒加载

设置 `lazyLoad` 属性来开启图片懒加载。

```tsx
<Image
  lazyLoad
  width={200}
  height={200}
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 加载中，加载失败提示

通过 `placeholder` 设置加载中提示，通过 `fallback`设置加载失败提示

```tsx
<Image width={200} height={200} placeholder="加载中..." />
<Image width={200} height={200} src="error" fallback="加载失败" />
```

## API

### Props

| 参数          | 说明                                  | 类型                        | 默认值             |
|-------------|-------------------------------------|-----------------------------|-----------------|
| src         | 图片链接                                | string                    | -               |
| mode        | 图片填充模式                              | string                    | `scaleToFill`    |
| alt         | 替代文本                                | string                    | -               |
| width       | 宽度                                    | string\|number            | -               |
| height      | 长度                                    | string\|number            | -               |
| shape       | 图片形状 `square` `rounded` `circle`    | string                    | -               |
| lazyLoad    | 是否开启图片懒加载                           | boolean                   | `false`         |
| placeholder | 加载中提示                              | ReactNode                 | -               |
| fallback    | 加载失败提示                              | ReactNode                 | -               |


### Modes

| 名称          | 含义                                                                 |
|-------------|--------------------------------------------------------------------|
| scaleToFill | 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素                             |
| aspectFit   | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。                    |
| aspectFill  | 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
| widthFix    | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变                                         |
| heightFix   | 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变                                         |
| top         | 裁剪模式，不缩放图片，只显示图片的顶部区域                                              |
| bottom      | 裁剪模式，不缩放图片，只显示图片的底部区域                                              |
| center      | 裁剪模式，不缩放图片，只显示图片的中间区域                                              |
| left        | 裁剪模式，不缩放图片，只显示图片的左边区域                                              |
| right       | 裁剪模式，不缩放图片，只显示图片的右边区域                                              |
| topLeft     | 裁剪模式，不缩放图片，只显示图片的左上边区域                                             |
| topRight    | 裁剪模式，不缩放图片，只显示图片的右上边区域                                             |
| bottomLeft  | 裁剪模式，不缩放图片，只显示图片的左下边区域                                             |
| bottomRight | 裁剪模式，不缩放图片，只显示图片的右下边区域                                             |

### Events

| 事件名     | 说明        | 回调参数                |
|---------|-----------|---------------------|
| onClick | 点击图片时触发   | _event: MouseEvent_ |
| onLoad  | 图片加载完毕时触发 | -                   |
| onError | 图片加载失败时触发 | -                   |
