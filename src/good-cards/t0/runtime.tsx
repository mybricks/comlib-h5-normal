import React, { useEffect, useState } from 'react';
import TitleWithIcon from '../../components/title-with-icon';
import styles from './styles.less';
import { GoodModel, ICommodity } from '../constant';
import { Price } from '../../components/price';

export default function ({ data, inputs, env }) {
  const [model, setModel] = useState<GoodModel>({
    commodity: {} as ICommodity,
    index: 0,
    onPress: () => {},
    onExpose: () => {},
  });

  const { commodity, index, onPress } = model;

  const formatSize = (price: string = '') => {
    if (price.length <= 5) {
      return '18px';
    } else if (price.length <= 7) {
      return '16px';
    } else {
      return '14px';
    }
  };

  useEffect(() => {
    inputs['install']((model: GoodModel) => {
      setModel(model);
      model.onExpose(model.commodity, model.index);
    });
  }, []);

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
          {commodity?.itemName}
        </TitleWithIcon>
      </div>
      <div className={styles.priceWrapper}>
        <img className={styles.priceBg} src="https://f2.eckwai.com/kos/nlav11092/u_teitsx.292bf5e6c69b4e8a.png" />
        <div className={styles.price}>
          <div style={{ marginLeft: '4px' }}>
            <Price
              className={styles.priceValue}
              style={{ fontSize: formatSize(commodity?.itemCouponPriceDoc) }}
            >
              {commodity?.itemCouponPriceDoc}
            </Price>
          </div>
          <div className={styles.robWrapper}>
            <div className={styles.rob}>抢</div>
          </div>
        </div>
      </div>
    </div>
  );
}
