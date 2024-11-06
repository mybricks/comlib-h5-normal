import {transformLess} from "../transform";
import {getComponentFromJSX, updateRender, updateStyle} from "../utils";

export default {
  ':root': {
    active: true,
    role: 'comDev',//定义AI的角色
    getSystemPrompts() {
      return `
    对于小程序、h5需求，首选基于 taro 进行开发.
    如果 taro 组件库中的组件不能满足需求，可以基于react、html进行 普通h5 开发。
    
    以下是对部分组件的补充说明：
    
    ## Button 按钮
    ### 何时使用
    标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
    `
    },
    getComDocs() {
      debugger

      return `
 尽量采用 taro 组件库进行开发，
    以下是对于这个组件库的补充说明：
    
    以下是一些组件的补充说明（markdown格式）：
    
    ### ButoonAPI
    | 参数                           | 类型                                              | 默认值            | 必填 | 说明                                                                                                                                                      |
|--------------------------------|---------------------------------------------------|-------------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| size                           | keyof Size                                        | default           | 否   | 按钮的大小                                                                                                                                                 |
| type                           | keyof Type                                        | default           | 否   | 按钮的样式类型                                                                                                                                             |
| plain                          | boolean                                           | false             | 否   | 按钮是否镂空，背景色透明                                                                                                                                   |
| disabled                       | boolean                                           | false             | 否   | 是否禁用                                                                                                                                                   |
| loading                        | boolean                                           | false             | 否   | 名称前是否带 loading 图标                                                                                                                                  |
| formType                       | keyof FormType                                    |                   | 否   |                                                                                    |
| openType                       | OpenType                                          |                   | 否   | 微信开放能力                                                                                                                                               |
| hoverClass                     | string                                            | button-hover      | 否   | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果                                                                                               |
| hoverStyle                     | StyleProp<ViewStyle>                              | none              | 否   | 由于 RN 不支持 hoverClass，故 RN 端的 Button 组件实现了 hoverStyle属性，写法和 style 类似，只不过 hoverStyle 的样式是指定按下去的样式。                    |
| hoverStopPropagation           | boolean                                           | false             | 否   | 指定是否阻止本节点的祖先节点出现点击态                                                                                                                     |
| hoverStartTime                 | number                                            | 20                | 否   | 按住后多久出现点击态，单位毫秒                                                                                                                             |
| hoverStayTime                  | number                                            | 70                | 否   | 手指松开后点击态保留时间，单位毫秒                                                                                                                         |
| lang                           | keyof Lang                                        |                   | 否   | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。<br>生效时机: open-type="getUserInfo"                                                     |
| sessionFrom                    | string                                            |                   | 否   | 会话来源<br>生效时机：open-type="contact"                                                                                                                 |
| sendMessageTitle               | string                                            | 当前标题          | 否   | 会话内消息卡片标题<br>生效时机：open-type="contact"                                                                                                       |
| sendMessagePath                | string                                            | 当前标题          | 否   | 会话内消息卡片点击跳转小程序路径<br>生效时机：open-type="contact"                                                                                         |
| sendMessageImg                 | string                                            | 截图              | 否   | 会话内消息卡片图片<br>生效时机：open-type="contact"                                                                                                       |
| appParameter                   | string                                            |                   | 否   | 打开 APP 时，向 APP 传递的参数<br>生效时机：open-type="launchApp"                                                                                         |
| scope                          | "userInfo" or "phoneNumber"                       |                   | 否   | 支付宝小程序 scope<br>生效时机：open-type="getAuthorize"                                                                                                  |
| showMessageCard                | boolean                                           | false             | 否   | 显示会话内消息卡片<br>生效时机：open-type="contact"                                                                                                       |
| publicId                       | string                                            |                   | 否   | 生活号 id，必须是当前小程序同主体且已关联的生活号，open-type="lifestyle" 时有效。                                                                          |
| templateId                     | string or string[]                                |                   | 否   | 发送订阅类模板消息所用的模板库标题 ID ，可通过 getTemplateLibraryList 获取<br>当参数类型为 Array 时，可传递 1~3 个模板库标题 ID                           |
| subscribeId                    | string                                            |                   | 否   | 发送订阅类模板消息时所使用的唯一标识符，内容由开发者自定义，用来标识订阅场景<br>注意：同一用户在同一 subscribe-id 下的多次授权不累积下发权限，只能下发一条。若要订阅多条，需要不同 subscribe-id |
| groupId                        | string                                            |                   | 否   | 群聊 id                                                                                                                                                   |
| guildId                        | string                                            |                   | 否   | 打开频道页面时，传递的频道号                                                                                                                               |
| shareType                      | string                                            | 27                | 否   | 分享类型集合，请参考下面share-type有效值说明。share-type后续将不再维护，请更新为share-mode                                                                 |
| shareMode                      | string[]                                          | ['qq', 'qzone']   | 否   | 分享类型集合，请参考下面share-mode有效值说明                                                                                                               |
| ariaLabel                      | string                                            |                   | 否   | 无障碍访问，（属性）元素的额外描述                                                                                                                         |
| openId                         | string                                            |                   | 否   | 添加好友时，对方的 openid                                                                                                                                  |
| shareMessageFriendInfo         | string                                            |                   | 否   | 发送对象的 FriendInfo                                                                                                                                      |
| shareMessageTitle              | string                                            |                   | 否   | 转发标题，不传则默认使用当前小程序的昵称。 FriendInfo                                                                                                       |
| shareMessageImg                | string                                            |                   | 否   | 转发显示图片的链接，可以是网络图片路径（仅 QQ CDN 域名路径）或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4FriendInfo             |
| dataAwemeId                    | string                                            |                   | 否   | 跳转抖音号个人页，只支持小程序绑定的品牌号、员工号、合作号                                                                                                 |
| dataIsHalfPage                 | boolean                                           |                   | 否   | 是否开启半屏模式                                                                                                                                           |
| onGetUserInfo                  | CommonEventFunction<onGetUserInfoEventDetail>     |                   | 否   | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与 Taro.getUserInfo 返回的一致<br>生效时机: open-type="getUserInfo"                              |
| onGetAuthorize                 | CommonEventFunction                               |                   | 否   | 支付宝获取会员基础信息授权回调<br>生效时机：open-type="getAuthorize"                                                                                       |
| onContact                      | CommonEventFunction<onContactEventDetail>         |                   | 否   | 客服消息回调<br>生效时机：open-type="contact"                                                                                                             |
| onGetPhoneNumber               | CommonEventFunction<onGetPhoneNumberEventDetail>  |                   | 否   | 获取用户手机号回调<br>生效时机：open-type="getPhoneNumber"                                                                                                 |
| onGetRealTimePhoneNumber       | CommonEventFunction<onGetRealTimePhoneNumberEventDetail> |             | 否   | 手机号实时验证回调，open-type="getRealtimePhoneNumber" 时有效                                                                                              |
| onError                        | CommonEventFunction                               |                   | 否   | 当使用开放能力时，发生错误的回调<br>生效时机：open-type="launchApp"                                                                                        |
| onOpenSetting                  | CommonEventFunction<onOpenSettingEventDetail>     |                   | 否   | 在打开授权设置页后回调<br>生效时机：open-type="openSetting"                                                                                                |
| onLaunchApp                    | CommonEventFunction                               |                   | 否   | 打开 APP 成功的回调<br>生效时机：open-type="launchApp"                                                                                                     |
| onChooseAvatar                 | CommonEventFunction                               |                   | 否   | 获取用户头像回调<br>生效时机：open-type="chooseAvatar"                                                                                                     |
| onAgreePrivacyAuthorization    | CommonEventFunction                               |                   | 否   | 用户同意隐私协议事件回调，open-type="agreePrivacyAuthorization"时有效                                                                                      |
| onTap                          | CommonEventFunction                               |                   | 否   | 点击。<br>说明： 每点击一次会触发一次事件，建议自行使用代码防止重复点击,可以使用 js 防抖和节流实现。                                                     |
| onFollowLifestyle              | CommonEventFunction<{ followStatus: true or 1 or 2 or 3; }> |           | 否   | 当 open-type 为 lifestyle 时有效。<br>当点击按钮时触发。<br>event.detail = { followStatus }，followStatus 合法值有 1、2、3，其中 1 表示已关注。2 表示用户不允许关注。3 表示发生未知错误；<br>已知问题：基础库 1.0，当用户在点击按钮前已关注生活号，event.detail.followStatus 的值为 true。 |
| onChooseAddress                | CommonEventFunction                               |                   | 否   | 用户点击该按钮时，调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址，从返回参数的 detail 中获取，和 swan.chooseAddress 一样的。和 open-type 搭配使用，使用时机：open-type="chooseAddress" |
| onChooseInvoiceTitle           | CommonEventFunction                               |                   | 否   | 用户点击该按钮时，选择用户的发票抬头，和 swan.chooseInvoiceTitle 一样的。和 open-type 搭配使用，使用时机：open-type="chooseInvoiceTitle"                   |
| onLogin                        | CommonEventFunction                               |                   | 否   | 登录回调，和 open-type 搭配使用，使用时机：open-type="login"。可以通过返回参数的 detail 判断是否登录成功，当 errMsg 为'login:ok'时即为成功。如想获取登录凭证请使用 swan.getLoginCode |
| onSubscribe                    | CommonEventFunction                               |                   | 否   | 订阅消息授权回调，和 open-type 搭配使用，使用时机：open-type="subscribe"                                                                                   |
| onAddFriend                    | CommonEventFunction                               |                   | 否   | 添加好友的回调                                                                                                                                             |
| onAddGroupApp                  | CommonEventFunction                               |                   | 否   | 添加群应用的回调。errCode 错误码：41004（当前用户非管理员或群主，无权操作），41005（超过可添加群应用的群数量）                                            |
| onOpenAwemeUserProfile         | CommonEventFunction                               |                   | 否   | 监听跳转抖音号个人页的回调<br>生效时机：open-type="openAwemeUserProfile"                                                                                   |
| onJoinGroup                    | CommonEventFunction<{ errMsg: string; errNo: number; }> |            | 否   | 加群后触发                                                                                                                                                 |

  
      `
    },
    preview(response: { id, render, style }, edtCtx, libs: { mybricksSdk }) {
      return new Promise((resolve, reject) => {
        if (response) {
          const rtn = (com, css) => {
            resolve({
              com,
              css
            })
          }

          Promise.all([
            new Promise((resolve, reject) => {
              getComponentFromJSX(response.render, libs).then(com => {
                resolve(com)
              })
            }),
            new Promise((resolve, reject) => {
              transformLess(response.style).then(css => {
                const myContent = css.replaceAll('__id__', response.id)//替换模版
                resolve(myContent)
              })
            })
          ]).then(([com, css]) => {
            rtn(com, css)
          }).catch(e => {
            reject(e)
          })
        }
      })
    },
    execute({id, data, inputs, outputs, slots},
            response: { render, style }, {refresh} = {}) {
      return new Promise((resolve, reject) => {
        if (response.render) {
          updateRender({data}, response.render)
        }

        if (response.style) {
          updateStyle({id, data}, response.style)
        }

        resolve()
      })
    }
  }
}