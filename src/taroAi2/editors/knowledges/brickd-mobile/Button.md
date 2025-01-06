# Button - 按钮。

## 介绍
一个按钮组件，同时支持通过`openType`属性支持小程序各种原生能力的调用

## 代码演示

### 基础使用
要点：
- 组件默认的样式是无边框、高度42、字体大小14、背景色#f8f8f8，如果需要请通过类型覆盖样式

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { Button } from 'brickd-mobile';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  return (
    <Button className={css.button}>基础按钮</Button>
  )
}, {
  type: "main"
  title: "基础按钮",
})
```

```less
.button {
  background: #fa6400; // 背景色调整
  color: #ffffff; // 字体颜色调整成反色
}
```

### 获取用户信息
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import css from 'style.less';
import { useState } from 'react';
import { Button } from 'brickd-mobile';

export default comDef(({ data, env, inputs, outputs, slots }) => {
  return (
    <Button
      openType="getUserInfo"
      onGetUserInfo={(e) => console.log(e)}
    >获取用户信息</Button>
  )
}, {
  type: "main"
  title: "组件",
})
```

## ButtonProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| size | `'default' \| 'mini'` | `default` | 否 | 尺寸、大小 |
| type | `'primary' \| 'default' \| 'warn'` | `default` | 否 | 类型、风格 |
| plain | `boolean` | `false` | 否 | 镂空，背景色透明 |
| disabled | `boolean` | `false` | 否 | 禁用 |
| loading | `boolean` | `false` | 否 | 名称前是否带 loading 加载图标 |
| formType | `keyof FormType` |  | 否 | 用于 `<form/>` 组件，点击分别会触发 `<form/>` 组件的 submit/reset 事件 |
| openType | `OpenType` |  | 否 | 微信开放能力 |
| hoverClass | `string` | `button-hover` | 否 | 指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果 |
| hoverStopPropagation | `boolean` | `false` | 否 | 指定是否阻止本节点的祖先节点出现点击态 |
| hoverStartTime | `number` | `20` | 否 | 按住后多久出现点击态，单位毫秒 |
| hoverStayTime | `number` | `70` | 否 | 手指松开后点击态保留时间，单位毫秒 |
| lang | `keyof Lang` |  | 否 | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。<br /><br />生效时机: `open-type="getUserInfo"` |
| sessionFrom | `string` |  | 否 | 会话来源<br /><br />生效时机：`open-type="contact"` |
| sendMessageTitle | `string` | `当前标题` | 否 | 会话内消息卡片标题<br /><br />生效时机：`open-type="contact"` |
| sendMessagePath | `string` | `当前标题` | 否 | 会话内消息卡片点击跳转小程序路径<br /><br />生效时机：`open-type="contact"` |
| sendMessageImg | `string` | `截图` | 否 | 会话内消息卡片图片<br /><br />生效时机：`open-type="contact"` |
| appParameter | `string` |  | 否 | 打开 APP 时，向 APP 传递的参数<br /><br />生效时机：`open-type="launchApp"` |
| showMessageCard | `boolean` | `false` | 否 | 显示会话内消息卡片<br /><br />生效时机：`open-type="contact"` |
| onGetUserInfo | `EventFunction<onGetUserInfoEventDetail>` |  | 否 | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与 Taro.getUserInfo 返回的一致<br /><br />生效时机: `open-type="getUserInfo"` |
| onContact | `EventFunction<onContactEventDetail>` |  | 否 | 客服消息回调<br /><br />生效时机：`open-type="contact"` |
| onGetPhoneNumber | `EventFunction<onGetPhoneNumberEventDetail>` |  | 否 | 获取用户手机号回调<br /><br />生效时机：`open-type="getPhoneNumber"` |
| onGetRealTimePhoneNumber | `EventFunction<onGetRealTimePhoneNumberEventDetail>` |  | 否 | 手机号实时验证回调，`open-type="getRealtimePhoneNumber"` 时有效 |
| onError | `EventFunction` |  | 否 | 当使用开放能力时，发生错误的回调<br /><br />生效时机：`open-type="launchApp"` |
| onOpenSetting | `EventFunction<onOpenSettingEventDetail>` |  | 否 | 在打开授权设置页后回调<br /><br />生效时机：`open-type="openSetting"` |
| onLaunchApp | `EventFunction` |  | 否 | 打开 APP 成功的回调<br /><br />生效时机：`open-type="launchApp"` |
| onChooseAvatar | `EventFunction` |  | 否 | 获取用户头像回调<br /><br />生效时机：`open-type="chooseAvatar"` |
| onAgreePrivacyAuthorization | `EventFunction` |  | 否 | 用户同意隐私协议事件回调，`open-type="agreePrivacyAuthorization"`时有效 |

### FormType

form-type 的合法值

| 参数 | 说明 |
| --- | --- |
| submit | 提交表单 |
| reset | 重置表单 |

### OpenType

open-type 的合法值

### openTypeKeys

open-type 的合法值

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| weapp | { contact: any; share: any; getPhoneNumber: any; getRealtimePhoneNumber: any; getUserInfo: any; launchApp: any; openSetting: any; feedback: any; chooseAvatar: any; agreePrivacyAuthorization: any; "getPhoneNumberoragreePrivacyAuthorization": any; "getRealtimePhoneNumberoragreePrivacyAuthorization": any; "getUserInfoorag... |  |
| alipay | `{ share: any; getAuthorize: any; contactShare: any; lifestyle: any; }` | 支付宝小程序专属的 open-type 合法值<br />[参考地址](https://opendocs.alipay.com/mini/component/button) |
| qq | `{ share: any; getUserInfo: any; launchApp: any; openSetting: any; feedback: any; openGroupProfile: any; addFriend: any; addColorSign: any; openPublicProfile: any; addGroupApp: any; shareMessageToFriend: any; }` | QQ 小程序专属的 open-type 合法值<br />[参考地址](https://q.qq.com/wiki/develop/miniprogram/component/form/button.html) |
| tt | `{ share: any; getPhoneNumber: any; im: any; platformIm: any; navigateToVideoView: any; openAwemeUserProfile: any; openWebcastRoom: any; addCalendarEvent: any; addShortcut: any; joinGroup: any; privateMessage: any; authorizePrivateMessage: any; }` | TT 小程序专属的 open-type 合法值<br />[参考地址](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/list/button/#open-type-%E7%9A%84%E5%90%88%E6%B3%95%E5%80%BC) |

### Lang

lang 的合法值

| 参数 | 说明 |
| --- | --- |
| en | 英文 |
| zh_CN | 简体中文 |
| zh_TW | 繁体中文 |

### onGetUserInfoEventDetail

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| userInfo | `{ nickName: string; avatarUrl: string; avatar: string; gender: keyof Gender; province: string; city: string; country: string; }` | 是 |  |
| rawData | `string` | 是 | 不包括敏感信息的原始数据 `JSON` 字符串，用于计算签名 |
| signature | `string` | 是 | 使用 `sha1(rawData + sessionkey)` 得到字符串，用于校验用户信息 |
| encryptedData | `string` | 是 | 包括敏感数据在内的完整用户信息的加密数据 |
| iv | `string` | 是 | 加密算法的初始向量 |
| errMsg | `string` | 是 |  |
| cloudID | `string` | 否 | 敏感数据对应的云 ID，开通[云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)的小程序才会返回，可通过云调用直接获取开放数据，详细见[云调用直接获取开放数据](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#method-cloud) |

### Gender

性别的合法值

| 参数 | 说明 |
| --- | --- |
| 0 | 未知 |
| 1 | 男 |
| 2 | 女 |

### onContactEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| errMsg | `string` |  |
| path | `string` | 小程序消息指定的路径 |
| query | `Record<string, any>` | 小程序消息指定的查询参数 |

### onGetPhoneNumberEventDetail

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| errMsg | `string` | 是 |  |
| encryptedData | `string` | 是 | 包括敏感数据在内的完整用户信息的加密数据 |
| iv | `string` | 是 | 加密算法的初始向量 |
| code | `string` | 否 | 动态令牌。可通过动态令牌换取用户手机号。<br />[参考地址](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%BC%95) |
| sign | `string` | 是 | 签名信息，如果在开放平台后台配置了加签方式后有此字段 |

### onGetRealTimePhoneNumberEventDetail

| 参数 | 类型 |
| --- | --- |
| code | `string` |

### onOpenSettingEventDetail

| 参数 | 类型 |
| --- | --- |
| errMsg | `string` |
| authSetting | `Record<string, boolean>` |