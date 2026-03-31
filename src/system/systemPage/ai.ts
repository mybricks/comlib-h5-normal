import { safeModifyTptJson } from "../../utils/ai-helpers";

export default {
  ":root"({ data }) {
    return {};
  },
  prompts: {
    summary:
      "系统页面容器，用于承载页面级配置和布局，是小程序每个页面的根容器",
    usage: `系统页面容器，是小程序每个页面的根容器

data声明
# 导航栏配置
useNavigationStyle: "default" | "none" = "default"  # 导航栏样式类型，一般使用「默认」和「隐藏」两种类型，不配置则为「默认」类型
  # 默认：为包含返回按钮和标题的导航栏样式，可以配置 返回按钮 和 标题 ，也可以通过「顶部栏」样式配置背景和字体颜色；
    - 注意：背景仅允许配置背景色；
  # 隐藏：直接隐藏导航栏，此时内部组件需要考虑
    -「顶部间距」：提供顶部安全区域，建议配置44；
    - 右上角「胶囊按钮」：布局必须避开，不能被遮挡；
    - 需要考虑组件背景同内部组件(重点第一个组件)的样式衔接，避免出现背景不一致的情况；
    - 导航栏不建议右侧操作按钮；或者设置paddingRight: 100，避开安全区域；
navigationStyle: "default" | "custom" = "default"  # 导航栏风格
navigationBarBackgroundColor: string = "#ffffff"  # 导航栏背景色（仅支持单色）
navigationBarTextStyle: "black" | "white" = "black"  # 导航栏标题颜色
navigationBarTitleText: string = "页面标题"  # 导航栏标题文字

# 页面背景配置
background: string = "#ffffff"  # 页面背景色
backgroundImage: string = ""  # 页面背景图片
backgroundColor: string = "#464646"  # 页面背景色（兼容字段）
backgroundColorTop: string = "#ffffff"  # 顶部下拉时外露的背景色
backgroundColorBottom: string = "#ffffff"  # 底部上滑时外露的背景色
backgroundSize: "cover" | "contain" | "100% 100%" | "auto" = "cover"  # 背景图片尺寸
backgroundPosition: string = "center top"  # 背景图片位置
backgroundRepeat: "repeat" | "no-repeat" = "repeat"  # 背景图片平铺

# TabBar配置
useTabBar: boolean = true  # 是否使用底部标签栏
  # 如果用户提到了要使用「底部导航栏」「作为标签页」「作为tabbar」等关键词，则需要配置 useTabBar 为 true；不能在页面上使用tab组件来模拟tabbar；
tabBar: array = []  # 标签栏配置（在systemTabbar中详细配置）

# 页面功能配置
enablePullDownRefresh: boolean = false  # 是否开启下拉刷新
backgroundTextStyle: "dark" | "light" = "dark"  # 下拉 loading 的样式
enableShareAppMessage: boolean = false  # 是否开启分享给朋友
enableShareTimeline: boolean = false  # 是否开启分享到朋友圈
onReachBottomDistance: number = 30  # 页面上拉触底事件触发时距页面底部距离（px）
pageOrientation: "portrait" | "landscape" | "auto" = "portrait"  # 屏幕旋转设置
disableScroll: boolean = false  # 是否禁止页面滚动
disableSwipeBack: boolean = false  # 是否禁止页面右滑返回

# 内容区布局配置
layout: object = { position: "smart" }  # 内容区布局配置
  # 推荐使用: { position: "flex", flexDirection: "column" }

# 底部空间配置
bottomSpace: number = 30  # 底部留白空间（避免内容被遮挡）
useFooter: boolean = false  # 是否开启页脚容器

# 骨架屏配置
useSkeleton: boolean = false  # 是否开启骨架屏
skeleton: array = [  # 骨架屏配置
  { type: "thumbnail" },  # 缩略图占位
  { type: "avatar" },     # 头像占位
  { type: "title" },      # 标题占位
  { type: "paragraph" }   # 段落占位
]

# 页面加载配置
useLoading: boolean = false  # 是否开启页面Loading
isEntryPagePath: boolean = false  # 是否为入口页面
alias: string = ""  # 页面别名

slots插槽
content: 页面内容插槽（主要放置页面组件）
footerBar: 页脚容器插槽（useFooter为true时有效）

styleAry声明
页面背景: .mybricks-page
  - 可编辑样式: background（支持背景色和背景图片）

返回图标: .mybricks-backIcon
  - 可编辑样式: size

导航栏标题: .mybricks-navigation-title
  - 可双击编辑标题文字

页脚容器: .mybricks-footer
  - 可编辑样式: background

layout声明
width: 固定为100%
height: 可配置，建议根据内容自适应

输入项
ready: 初始化完成（useLoading为true时需要调用以隐藏Loading）

事件
pageDidShow: 当页面重新显示时触发（页面切入前台）
pageDidHide: 当页面隐藏时触发（页面切入后台）
pulldown: 当下拉刷新触发时（enablePullDownRefresh为true时）

注意事项
- 系统页面容器是每个页面的根容器，必须配置
- 导航栏背景色仅支持单色，不支持渐变色
- 页面背景支持颜色、图片、渐变色
- 内容区布局强烈建议使用 flex 布局（flexDirection: "column"）
- system.page 下方的第一层元素建议配置 width: '100%' 和左右 margin
- 开启下拉刷新后，需要通过输入项调用 ready 来结束刷新状态
- 页脚容器开启后，内容区需要预留 bottomSpace 空间

最佳实践
1. 页面根布局使用 flex column，便于垂直排列内容
2. 主要内容区域配置 flex: 1 可以自动撑开剩余空间
3. 导航栏标题颜色与背景色要有足够对比度
4. 下拉刷新适合列表类页面，表单类页面建议关闭
5. 分享给朋友和朋友圈需要在小程序后台配置
`,
  },
  modifyTptJson: (component) => {
    safeModifyTptJson(() => {
      // 暂无特殊处理逻辑
    }, component, "system/systemPage");
  },
};
