# Image - 图片

## 类型
```tsx
ComponentType<ImageProps>
```

## 最佳实践
```render
import { Image } from '@tarojs/components';

export default () => {
  return (
    <Image
      src='https://temp.im/300x100'
    />
  )
}
```

## ImageProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| src | `string` |  | 是 | 地址 |
| mode | `'scaleToFill' \| 'aspectFit' \| 'aspectFill' \| 'widthFix' \| 'heightFix' \| 'top' \| 'bottom' \| 'center' \| 'left' \| 'right' \| 'top left' \| 'top right' \| 'bottom left' \| 'bottom right'` | `"scaleToFill"` | 否 | 裁剪、缩放模式 |
| webp | `boolean` | `false` | 否 | 启用webp |
| lazyLoad | `boolean` | `false` | 否 | 懒加载。只针对 page 与 scroll-view 下的 image 有效 |
| showMenuByLongpress | `boolean` | `false` | 否 | 长按图片显示识别小程序码菜单 |
| imgProps | `React.ImgHTMLAttributes<HTMLImageElement>` |  | 否 | 为 img 标签额外增加的属性 |
| nativeProps | `Record<string, unknown>` |  | 否 | 透传 `WebComponents` 上的属性到内部 H5 标签上 |
| fadeIn | `boolean` | `false` | 否 | 渐显 |
| onError | `EventFunction<{errMsg:string}>` |  | 否 | 发生错误 |
| onLoad | `EventFunction<{height:string|number,width:string|number}>` |  | 否 | 加载完成 |