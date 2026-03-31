import { safeModifyTptJson } from "../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "视频组件，用于播放视频，支持直播流、自动播放、循环播放、静音播放等功能",
    usage: `视频组件

data声明
src: string = ""  # 视频资源地址
controls: boolean = true  # 是否显示默认播放控件
poster: string = ""  # 视频封面
autoplay: boolean = false  # 是否自动播放
loop: boolean = false  # 是否循环播放
muted: boolean = false  # 是否静音播放
"object-fit": "contain" | "fill" | "cover" = "contain"  # 视频适配方式
"is-live": boolean = false  # 是否为直播源

slots插槽
无

styleAry声明
无

layout声明
width: 可配置，默认100%
height: 可配置，默认210

事件
onPlay: 当开始/继续播放时触发
onPause: 当暂停播放时触发
onEnded: 当播放到末尾时触发
onTimeUpdate: 当播放进度改变时触发
onWaiting: 当视频出现缓冲时触发
onError: 当视频出错时触发

注意事项
- 视频封面poster仅在controls为true时显示
- 自动播放autoplay在某些浏览器/环境下可能受限制
- 直播流is-live开启后，视频将以直播形式播放，不支持seek操作
- object-fit配置决定视频与容器的适配方式
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "video");
  },
};
