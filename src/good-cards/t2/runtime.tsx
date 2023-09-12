import React, { useEffect, useState } from 'react';
import TitleWithIcon from '../../components/title-with-icon';
import styles from './styles.less';
import { GoodModel, ICommodity } from '../constant';
import { wFormat } from '../../utils';
import { Price } from '../../components/price';

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

  const formatSize = (price: string = '') => {
    if (price.length < 4) {
      return '14px';
    } else if (price.length < 6) {
      return '12px';
    } else {
      return '10px';
    }
  };

  return (
    <div key={`commodity-${index}`} className={styles.card} onClick={() => onPress(model.commodity, model.index)}>
      <div className={styles.coverMask}></div>
      <img className={styles.cover} data-src={commodity?.itemImage} style={{ objectFit: 'cover' }} />
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
      <div className={styles.priceWrapper}>
        <div className={styles.itemOriginalPriceWrapper}>
          <span className={styles.soldNum}>
            {commodity.itemSoldNum ? `热卖${wFormat(commodity.itemSoldNum)}` : '热卖中'}
          </span>
          {commodity.itemHasDropPriceDoc ? (
            <span className={styles.itemHasDropPriceDoc}>
              <span className={styles.itemHasDropPriceDocPrefix}>直降</span>￥{commodity.itemHasDropPriceDoc}
            </span>
          ) : null}
        </div>
        <div className={styles.itemCouponPriceWrapper}>
          <p className={styles.prefix}>到手价</p>
          <Price
            className={styles.itemCouponPriceDoc}
            style={{
              fontSize: formatSize(commodity?.itemCouponPriceDoc),
            }}
          >
            {commodity?.itemCouponPriceDoc}
          </Price>
        </div>
      </div>
    </div>
  );
}
