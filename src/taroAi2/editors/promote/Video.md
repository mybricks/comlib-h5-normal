# Video - 视频。

## 类型
```tsx
ComponentType<VideoProps>
```

## 最佳实践
```render
import { View, Video } from '@tarojs/components';
import css from 'index.less';

export default () => {
  return (
    <View className={css['components-page']}>
      <Video
        id='video'
        src='https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
        poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
        initialTime={0}
        controls={true}
        autoplay={false}
        loop={false}
        muted={false}
      />
    </View>
  )
}
```

## VideoProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| src | `string` |  | 是 | 要播放视频的资源地址 |
| duration | `number` |  | 否 | 指定视频时长 |
| controls | `boolean` | `true` | 否 | 是否显示默认播放控件（播放/暂停按钮、播放进度、时间） |
| danmuList | `any[]` |  | 否 | 弹幕列表 |
| danmuBtn | `boolean` | `false` | 否 | 是否显示弹幕按钮，只在初始化时有效，不能动态变更 |
| enableDanmu | `boolean` | `false` | 否 | 是否展示弹幕，只在初始化时有效，不能动态变更 |
| autoplay | `boolean` | `false` | 否 | 是否自动播放 |
| loop | `boolean` | `false` | 否 | 是否循环播放 |
| muted | `boolean` | `false` | 否 | 是否静音播放 |
| initialTime | `number` |  | 否 | 指定视频初始播放位置 |
| pageGesture | `boolean` | `false` | 否 | 在非全屏模式下，是否开启亮度与音量调节手势 |
| direction | `number` |  | 否 | 设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度） |
| showProgress | `boolean` | `true` | 否 | 若不设置，宽度大于240时才会显示 |
| showFullscreenBtn | `boolean` | `true` | 否 | 是否显示全屏按钮 |
| showPlayBtn | `boolean` | `true` | 否 | 是否显示视频底部控制栏的播放按钮 |
| showCenterPlayBtn | `boolean` | `true` | 否 | 是否显示视频中间的播放按钮 |
| enableProgressGesture | `boolean` | `true` | 否 | 是否开启控制进度的手势 |
| objectFit | `keyof ObjectFit` | `"contain"` | 否 | 当视频大小与 video 容器大小不一致时，视频的表现形式 |
| poster | `string` |  | 否 | 视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效 |
| showMuteBtn | `boolean` | `false` | 否 | 是否显示静音按钮 |
| title | `string` |  | 否 | 视频的标题，全屏时在顶部展示 |
| playBtnPosition | `keyof PlayBtnPosition` | `'bottom'` | 否 | 播放按钮的位置<br />- `bottom`: controls bar 上<br />- `center`: 视频中间 |
| enablePlayGesture | `boolean` | `false` | 否 | 是否开启播放手势，即双击切换播放/暂停 |
| autoPauseIfNavigate | `boolean` | `true` | 否 | 当跳转到其它小程序页面时，是否自动暂停本页面的视频 |
| autoPauseIfOpenNative | `boolean` | `true` | 否 | 当跳转到其它微信原生页面时，是否自动暂停本页面的视频 |
| vslideGesture | `boolean` | `false` | 否 | 在非全屏模式下，是否开启亮度与音量调节手势（同 `page-gesture`） |
| vslideGestureInFullscreen | `boolean` | `true` | 否 | 在全屏模式下，是否开启亮度与音量调节手势 |
| adUnitId | `string` |  | 否 | 视频前贴广告单元ID，更多详情可参考开放能力 |
| posterForCrawler | `string` |  | 否 | 用于给搜索等场景作为视频封面展示，建议使用无播放 icon 的视频封面图，只支持网络地址 |
| showCastingButton | `boolean` |  | 否 | 显示投屏按钮。只安卓且同层渲染下生效，支持 DLNA 协议 |
| pictureInPictureMode | "" or "push" or "pop" or ("push" or "pop")[] |  | 否 | 设置小窗模式： push, pop，空字符串或通过数组形式设置多种模式（如： ["push", "pop"]） |
| enableAutoRotation | `boolean` |  | 否 | 是否开启手机横屏时自动全屏，当系统设置开启自动旋转时生效 |
| showScreenLockButton | `boolean` |  | 否 | 是否显示锁屏按钮，仅在全屏时显示，锁屏后控制栏的操作 |
| showSnapshotButton | `boolean` |  | 否 | 是否显示截屏按钮，仅在全屏时显示 |
| showBackgroundPlaybackButton | `boolean` |  | 否 | 是否展示后台音频播放按钮 |
| backgroundPoster | `string` |  | 否 | 进入后台音频播放后的通知栏图标（Android 独有） |
| nativeProps | `Record<string, unknown>` |  | 否 | 用于透传 `WebComponents` 上的属性到内部 H5 标签上 |
| showBottomProgress | `boolean` | `true` | 否 | 是否展示底部进度条 |
| pictureInPictureShowProgress | `string` |  | 否 | 是否在小窗模式下显示播放进度 |
| referrerPolicy | "origin" or "no-referrer" |  | 否 | 格式固定为 https://servicewechat.com/{appid}/{version}/page-frame.html，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本； |
| isDrm | `boolean` |  | 否 | 是否是 DRM 视频源 |
| provisionUrl | `string` |  | 否 | DRM 设备身份认证 url，仅 is-drm 为 true 时生效 (Android) |
| certificateUrl | `string` |  | 否 | DRM 设备身份认证 url，仅 is-drm 为 true 时生效 (iOS) |
| licenseUrl | `string` |  | 否 | DRM 获取加密信息 url，仅 is-drm 为 true 时生效 |
| preferredPeakBitRate | `number` |  | 否 | 指定码率上界，单位为比特每秒 |
| isLive | `boolean` |  | 否 | 是否为直播源 |
| onPlay | `EventFunction` |  | 否 | 当开始/继续播放时触发 play 事件 |
| onPause | `EventFunction` |  | 否 | 当暂停播放时触发 pause 事件 |
| onEnded | `EventFunction` |  | 否 | 当播放到末尾时触发 ended 事件 |
| onTimeUpdate | `EventFunction<onTimeUpdateEventDetail>` |  | 否 | 播放进度变化时触发, 触发频率 250ms 一次 |
| onFullscreenChange | `EventFunction<onFullscreenChangeEventDetail>` |  | 否 | 当视频进入和退出全屏时触发 |
| onWaiting | `EventFunction<onWaitingEventDetail>` |  | 否 | 视频出现缓冲时触发 |
| onError | `EventFunction` |  | 否 | 视频播放出错时触发 |
| onProgress | `EventFunction<onProgressEventDetail>` |  | 否 | 加载进度变化时触发，只支持一段加载 |
| onLoadedMetaData | `EventFunction<onLoadedMetaDataEventDetail>` |  | 否 | 视频元数据加载完成时触发 |
| onEnterPictureInPicture | `EventFunction` |  | 否 | 播放器进入小窗 |
| onLeavePictureInPicture | `EventFunction` |  | 否 | 播放器退出小窗 |
| onSeekComplete | `EventFunction` |  | 否 | seek 完成时触发 |
| onFullScreenChange | `EventFunction<onFullscreenChangeEventDetail>` |  | 否 | 视频进入和退出全屏时触发 |
| onControlsToggle | `EventFunction<onControlsToggleEventDetail>` |  | 否 | 切换 controls 显示隐藏时触发。 |
| onCastingUserSelect | `EventFunction` |  | 否 | 用户选择投屏设备时触发 detail = { state: "success"/"fail" } |
| onCastingStateChange | `EventFunction` |  | 否 | 投屏成功/失败时触发 detail = { type, state: "success"/"fail" } |
| onCastingInterrupt | `EventFunction` |  | 否 | 投屏被中断时触发 |

### ObjectFit

objectFit 的合法值

| 参数 | 说明 |
| --- | --- |
| contain | 包含 |
| fill | 填充 |
| cover | 覆盖 |

### PlayBtnPosition

playBtnPosition 的合法值

| 参数 | 说明 |
| --- | --- |
| bottom | controls bar上 |
| center | 视频中间 |

### onTimeUpdateEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| currentTime | `number` | 当前时间 |
| duration | `number` | 持续时间 |
| userPlayDuration | `number` | 用户实际观看时长 |
| videoDuration | `number` | 视频总时长 |

### onFullscreenChangeEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| direction | "vertical" or "horizontal" | 方向 |
| fullScreen | number or boolean | 全屏 |

### onWaitingEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| direction | "vertical" or "horizontal" | 方向 |
| fullScreen | number or boolean | 全屏 |

### onProgressEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| buffered | `number` | 百分比 |

### onLoadedMetaDataEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| width | `number` | 视频宽度 |
| height | `number` | 视频高度 |
| duration | `number` | 持续时间 |

### onControlsToggleEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| show | `boolean` | 是否显示 |