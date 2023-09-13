import React, { useEffect, useMemo, useState } from 'react';
import TitleWithIcon from '../title-with-icon';
import styles from './styles.less';
import { GoodModel, ICommodity } from '../constant';
import { Price } from '../price';

export default function ({ inputs, env }) {
  const [model, setModel] = useState<GoodModel>({
    commodity: {} as ICommodity,
    index: 0,
    onPress: () => {},
    onExpose: () => {},
  });
  const { commodity, index, onPress } = model;

  useEffect(() => {
    inputs['install']((model: GoodModel) => {
      setModel(model);
      model.onExpose(model.commodity, model.index);
    });
  }, []);

  const showOriginalPrice =
    commodity?.itemOriginalPriceDoc && commodity?.itemOriginalPriceDoc != commodity?.itemCouponPriceDoc;

  return (
    <div key={`commodity-${index}`} className={styles.card} onClick={() => onPress(commodity, model.index)}>
      <img className={styles.commodityImg} data-src={commodity.itemImage} />
      <div className={styles.commodityDetail}>
        <div className={styles.title}>
          {commodity.itemIcons?.map((item, index) => {
            return (
              <img
                className={styles.nameTag}
                style={{
                  height: 14,
                  width: 'auto',
                }}
                src={item}
                key={item}
              />
            );
          })}
          {commodity.itemName}
        </div>
        <div className={styles.tagList}>
          {commodity.itemTagList?.map((tag) => (
            <div className={styles.goodTag}>{tag}</div>
          ))}
        </div>
        <div className={styles.flex1}></div>
        <div className={styles.priceBlock}>
          <span className={styles.prefix}>{commodity.itemCouponPriceTitle}</span>
          <Price className={styles.couponPrice}>
            {commodity?.itemCouponPriceDoc}
          </Price>
          {showOriginalPrice ? (
            <span className={styles.originalPrice}>¥{commodity?.itemOriginalPriceDoc}</span>
          ) : null}
        </div>
        <div className={styles.buyButton}>去抢购</div>
      </div>
    </div>
  );
}
