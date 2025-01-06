## 类型

```tsx
ComponentType<ChannelVideoProps>
```

## 最佳实践
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { ChannelVideo } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {

  return (
    <View>
        <ChannelVideo></ChannelVideo>
    </View>
  )
}, {
  type: "main"
  title: "组件",
});
```

## ChannelVideoProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| feedId | `string` |  | 是 | 仅视频号视频与小程序同主体时生效。若内嵌非同主体视频，请使用 feed-token。 |
| finderUserName | `string` |  | 是 | 视频号 id，以“sph”开头的id，可在视频号助手获取。视频号必须与当前小程序相同主体。 |
| loop | `boolean` | `false` | 否 | 是否循环播放 |
| muted | `boolean` | `false` | 否 | 是否静音播放 |
| objectFit | "fill" or "contain" or "cover" | `"contain"` | 否 | 当视频大小与 video 容器大小不一致时，视频的表现形式 |
| autoplay | `boolean` | `false` | 否 | 是否自动播放 |
| feedToken | `string` |  | 否 | 仅内嵌小程序非同主体视频号视频时使用，获取方式参考[本指引](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/channels-activity.html#feed-token)。 |
| onError | `CommonEventFunction` |  | 否 | 视频播放出错时触发 |