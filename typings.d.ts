declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

type Inputs = {
  add: (id: string, title: string) => any
  remove: (id: string) => any
  setTitle: (id: string, title: string) => any
  get: (id: string) => { id: string; title: string }
}

type Outputs = Record<string, Function>
interface Env {
  /** 编辑态时有值 */
  edit?: any

  /** 调试态、运行态有值  */
  runtime?: any

  /** 注入的yoda */
  yoda: yodaT

  /**
   * ajax请求方法
   * @param url 接口地址
   * @param option 接口参数，参考axios
   * @param useProxy 是否在调试和非生产环境使用代理
   */
  ajax: (url: string, option: Record<string, any>, useProxy?: boolean) => Promise<any>

  [x: string]: any
}

interface Slot {
  /** 插槽内子组件数量，为0时当前插槽为空 */
  size: number

  /** 插槽内子组件渲染函数 */
  render: (...args: any[]) => JSX.Element

  /** 清空插槽 */
  clear: () => void

  /** 添加子组件 */
  addCom: (namespace: string) => void
}

interface Logger {
  info: (text: string) => void
  warn: (text: string) => void
  error: (text: string) => void
  [props: string]: (text: string) => void
}

interface RuntimeParams<Data = any> {
  /** 环境注入 */
  env: Env

  /** 组件的配置数据 */
  data: Data

  /** 组件的输入 */
  inputs: Inputs

  /** 组件的输出 */
  outputs: Outputs

  /** 插槽 */
  slots: Record<string, Slot>

  /** 日志插件 */
  logger: Logger

  /** 用户输入的组件名称，一般用来埋点注册 */
  title: string

  /** 组件的外部样式，只读 */
  readonly style: CSSProperties

  /** 创建dom挂在在body上 */
  createPortal: (children: JSX.Element) => ReactNode
}

interface EditorResult<T> {
  data: T
  focusArea: any
  output: any
  input: any
  slot: any
  diagram: any
  env: any
  setDesc: (val: string) => void
  setAutoRun: (auto?: boolean) => void
  isAutoRun: () => boolean
}

interface UpgradeParams<T> {
  data: T
  output: any
  input: any
  slot: any
  setAutoRun: (auto?: boolean) => void
}

type AnyMap = {
  [key in string | number]: any
}

/** 主播实体 */
interface FStreamer {
  /** 排名，从1开始 */
  rank?: number
  /** 头像 */
  authorHeadImg: string
  /** 主播id */
  authorId: number | string
  /** 主播名称 */
  authorName: string
  /** 直播间id */
  liveId?: string | number
  /** 直播间title */
  liveTitle?: string
  /** 直播间观看人数 */
  watchNumber?: string | number
  /** 热度值 */
  hotValue?: number
  /** 粉丝数 */
  fans?: number
  /** 是否关注 */
  isFocus?: boolean
  /** TopN商品 */
  topItems: any[]
  /** 曝光参数 */
  serverExpTag?: string
}

/** 主播卡片install参数 */
interface FStreamerCard {
  cardData: FStreamer
  /** 埋点参数 */
  exposeParam: any
  /** 修改主播列表数据，用于关注修改数据等逻辑 */
  setDataSource?: React.Dispatch<React.SetStateAction<FStreamer[]>>
}

interface FVideo {
  videoId?: string
  liveId?: string | number
  userId?: string | number
  thumbnailUrl?: string
  title?: string
  authorName?: string
  likeCount?: number
  authorHeadImg?: string
  /** 曝光参数 */
  serverExpTag?: string
  caption: string
  userAvatar: string
  userName: string
}

interface FLive {
  liveId?: string | number
  liveStream: any
  liveUrl?: string
  liveCoverUrl?: string
  title?: string
  watchNumber?: string | number
  authorId?: string | number
  authorName?: string
  authorHeadImg?: string
  /** 曝光参数 */
  serverExpTag?: string
}

interface FItem {
  itemId: number | string
  itemName: string
  itemImage: string
  itemPrice: number | string
  itemPriceDesc?: string
  itemTag?: string
}

interface FLiveItem extends FLive {
  authorTagText?: string
  itemList: FItem[]
}

type Result<V, E> = {
  value: V
  error: E | null
}
