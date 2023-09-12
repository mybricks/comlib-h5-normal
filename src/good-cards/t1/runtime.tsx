import React, { useEffect, useState } from 'react';
import TitleWithIcon from '../../components/title-with-icon';
import styles from './styles.less';
import { GoodModel, ICommodity } from '../constant';
import { Price } from '../../components/price';

export default function ({ inputs, env }) {
  const [model, setModel] = useState<GoodModel>({
    commodity: {} as ICommodity,
    index: 0,
    onPress: () => {},
    onExpose: () => {},
  });

  const { commodity, index, onPress } = model;

  const formatSize = (price: string = '') => {
    if (price.length < 5) {
      return '20px';
    } else if (price.length < 7) {
      return '18px';
    } else {
      return '16px';
    }
  };

  useEffect(() => {
    inputs['install']((model: GoodModel) => {
      setModel(model);
      model.onExpose(model.commodity, model.index);
    });
  }, []);

  const showOriginalPrice =
    commodity?.itemOriginalPriceDoc && commodity?.itemOriginalPriceDoc != commodity?.itemCouponPriceDoc;

  return (
    <div key={`commodity-${index}`} className={styles.card} onClick={() => onPress(model.commodity, model.index)}>
      <div>
        <div className={styles.coverMask}></div>
        <img className={styles.cover} data-src={commodity?.itemImage} style={{ objectFit: 'cover' }} />

        <TitleWithIcon
          numberOfLines={2}
          iconStyle={{ marginRight: '3px' }}
          icons={commodity?.itemIcons || []}
          env={env}
        >
          <span>{commodity?.itemName}</span>
        </TitleWithIcon>
      </div>
      <div className={styles.priceWrapper}>
        <Price
          className={styles.couponPriceValue}
          style={{
            fontSize: formatSize(commodity?.itemCouponPriceDoc),
          }}
        >
          {commodity?.itemCouponPriceDoc}
        </Price>
        {showOriginalPrice && <span className={styles.originalPrice}>￥{commodity?.itemOriginalPriceDoc}</span>}
      </div>
    </div>
  );
}
