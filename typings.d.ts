declare module "*.less" {
  const resource: { [key: string]: string };
  export = resource;
}
interface RuntimeParams<T> {
  /** 环境注入 */
  env: Env;

  /** 组件的配置数据 */
  data: T;

  /** 组件的输入 */
  inputs: Inputs;

  /** 组件的输出 */
  outputs: Outputs;

  /** 插槽 */
  slots: Record<string, Slot>;

  /** 日志插件 */
  logger: Logger;

  /** 用户输入的组件名称，一般用来埋点注册 */
  title: string;

  /** 组件的外部样式，只读 */
  readonly style: CSSProperties;

  /** 创建dom挂在在body上 */
  createPortal: (children: JSX.Element) => ReactNode;
}

interface EditorResult<T> {
  data: T;
  focusArea: any;
  output: any;
  input: any;
  slot: any;
  diagram: any;
}


interface Data {
  [key: string]: any;
}

interface UpgradeParams<T> {
  data: T;
  output: any;
  input: any;
  slot: any;
  setAutoRun: any;
}

type AnyMap = {
  [key in string | number]: any;
};

interface Env {
  preview?: {};
  edit?: {};
  runtime?: any;
  mock?: {};
  ajax: (url: string, opt: Record<string, any>) => Promise<any>;
  themes: {
    bgPage: string;
    bgPrimary: string;
    bgSecondary: string;
    fontPrimary: string;
    fontSecondary: string;
  };
  weblogger: {
    collect: (type: "SHOW" | "CLICK", exposeParam: any) => void;
    [x: string]: any;
  };
  // rem: (pixel: number) => number;
  [x: string]: any;
}

type Result<V, E> = {
  data: V;
  msg: E | null;
};

interface TopItem {
  itemId: 2559340137546;
  itemTitle: string;
  itemName: string;
  itemCouponPriceTitle: string;
  itemImage: string;
  thumbnailUrl: string;
  itemPrice: number;
  itemCouponPrice: number;
  itemCouponPriceDoc: string;
  itemOriginalPrice: number;
  itemOriginalPriceDoc: string;
}

/** 主播实体 */
interface FStreamer {
  /** 排名，从1开始 */
  rank?: number;
  /** 头像 */
  authorHeadImg: string;
  /** 主播id */
  authorId: number | string;
  /** 主播名称 */
  authorName: string;
  /** 直播间id */
  liveId?: string | number;
  /** 直播间title */
  liveTitle?: string;
  /** 直播间观看人数 */
  watchNumber?: string | number;
  /** 热度值 */
  hotValue?: number;
  /** 粉丝数 */
  fans?: number;
  /** 是否关注 */
  follow?: boolean;
  /** TopN商品 */
  topItems: TopItem[];
  /** 曝光参数 */
  serverExpTag?: string;
}

/** 主播卡片install参数 */
interface FStreamerCard {
  cardData: FStreamer;
  /** 埋点参数 */
  exposeParam: any;
  /** 修改主播列表数据，用于关注修改数据等逻辑 */
  setDataSource?: React.Dispatch<React.SetStateAction<FStreamer[]>>;
}

type UndoTask = {commit: Function}