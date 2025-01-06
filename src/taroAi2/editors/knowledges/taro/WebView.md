# WebView - web-view 组件是一个可以用来承载网页的容器，会自动铺满整个小程序页面。个人类型与海外类型的小程序暂不支持使用。

## 类型
```tsx
ComponentType<WebViewProps>
```

## 最佳实践
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useCallback } from 'react';
import { WebView } from '@tarojs/components';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  return (
    <WebView src='https://mp.weixin.qq.com/' onMessage={() => {}} />
  )
}, {
  type: "main"
  title: "组件",
});
```

## WebViewProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| src | `string` |  | 是 | webview 指向网页的链接。可打开关联的公众号的文章，其它网页需登录小程序管理后台配置业务域名。 |
| onMessage | `EventFunction<onMessageEventDetail>` |  | 否 | 网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。e.detail = { data } |
| onLoad | `EventFunction<{src:string}>` |  | 否 | 网页加载成功触发 |
| onError | `EventFunction<{src:string}>` |  | 否 | 网页加载失败触发 |

### onMessageEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| data | `any[]` | 消息数据，是多次 postMessage 的参数组成的数组 |