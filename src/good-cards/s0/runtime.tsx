import React, { useEffect, useMemo, useState } from 'react';
import TitleWithIcon from '../title-with-icon';
import styles from './styles.less';
import { Price } from '../price';

export default function ({ data, inputs, env }) {
  const [model, setModel] = useState({
    itemCouponPrice: 5900,
    itemImage:
      'https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/compress/image-3ba46c61-3ff6-490a-8da6-1ef3de777a4e.png',
    itemName: '新款冰丝麻小衫',
    itemOriginalPrice: 5900,
  });

  useEffect(() => {
    inputs['install']((model) => {
      console.log('安装时的model', model);
      setModel(model);
    });
  }, []);

  return (
    <>
      <div className={styles.goodCard}>
        <div className={styles.coverWrapper}>
          <img style={{ objectFit: 'cover' }} className={styles.cover} data-src={model.itemImage} />
        </div>
        <div className={styles.content}>
          <div>
            <TitleWithIcon numberOfLines={2} iconStyle={{ marginRight: '3px' }} env={env}>
              {model.itemName}
            </TitleWithIcon>
            {/* {renderTagList(model.itemTagList)} */}
          </div>
          <div className={styles.buyWrapper} style={{ backgroundImage: `url(${data.buyBg})` }}>
            <div className={styles.priceWrapper}>
              <div className={styles.price}>
                <span className={styles.itemCouponPrice}>
                  <Price>{model.itemCouponPrice / 100}</Price>
                </span>
                {model.itemCouponPrice !== model.itemOriginalPrice ? (
                  <span className={styles.itemOriginalPrice}>￥{model.itemOriginalPrice / 100}</span>
                ) : null}
              </div>
            </div>
            <div className={styles.buyBtn}>去抢购</div>
          </div>
        </div>
      </div>
    </>
  );
}
