export interface ICommodity {
  itemId: number; // 商品id
  sellerId:number;
  itemUrl: string; // 详情链接
  itemName: string; // 标题
  itemImage: string; // 图片
  itemCouponPrice: number; // 券后价，小于等于原价，单位分
  itemCouponPriceDoc: string; // 券后价展示值，单位元
  itemOriginalPrice: number; // 原价（划线价），大于等于券后价，单位分；当等于券后价时，需要隐藏
  itemOriginalPriceDoc: string; // 原价展示值，单位元
  itemCouponPriceTitle: string; // 券后价文案，和后端约定好的字段，默认是 券后价；当原价等于券后价时，需要隐藏
  itemHasDropPriceDoc?: string; // 降了多少钱, 可能为空
  itemSoldNum: number; // 销量
  itemStock: number; // 库存
  itemIcon: string; // 标题标签
  itemIcons: string[]; // 标题标签(多个)
  itemTagList: string[]; // 商品标签集
  itemHeatScore: number; // 热度
  itemListPrice?: number; // 标牌价格
  itemTag?: string; // 品牌标签
  itemSoldNumDoc?: string; // 已售
  serverExpTag?: any;
  recoReason: number;
  trackingInfo: string;
  rank: number;
}
