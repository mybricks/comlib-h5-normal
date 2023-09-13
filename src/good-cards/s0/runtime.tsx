import React, { useEffect, useMemo, useState } from 'react';
import TitleWithIcon from '../title-with-icon';
import styles from './styles.less';
import { GoodModel, ICommodity } from './../constant';
import { Price } from '../price';

export default function ({ data, inputs, env }) {
  const [model, setModel] = useState();
  const topTags = [
    'https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/compress/image-6e871feb-e1eb-46c7-9567-253abaf1d181.png',
    'https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/compress/image-8c8841d2-667b-4674-8dc3-ce198c572902.png',
    'https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/compress/image-39f99eb8-b9e6-464d-91ca-d4d4e52eb6e4.png',
  ];

  const renderTagList = (itemTagList: string[] = []) => {
    let sum = 0,
      total = 15;

    return (
      <div className={styles.goodTagList}>
        {itemTagList?.map((tag, index) => {
          sum += tag.length;
          if (sum > total) {
            return null;
          }
          return (
            <>
              {index !== 0 ? <div className={styles.divider}></div> : null}
              <span className={styles.goodTag}>{tag}</span>
            </>
          );
        })}
      </div>
    );
  };

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
          {model.rank < 3 ? (
            <img className={styles.top3Tag} src={topTags[model.rank]} />
          ) : (
            <div className={styles.otherTag}>
              <span className={styles.otherTagText}>{model.rank + 1}</span>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div>
            <TitleWithIcon
              key={model.rank}
              numberOfLines={2}
              icons={model.itemIcons || []}
              iconStyle={{ marginRight: '3px' }}
              env={env}
            >
              {model?.itemName}
            </TitleWithIcon>
            {renderTagList(model?.itemTagList)}
          </div>
          <div className={styles.buyWrapper} style={{ backgroundImage: `url(${data.buyBg})` }}>
            <div className={styles.priceWrapper}>
              <div className={styles.price}>
                <span className={styles.itemCouponPrice}>
                  <Price>{model?.itemCouponPrice / 100}</Price>
                </span>
                {model?.itemCouponPrice !== model?.itemOriginalPrice ? (
                  <span className={styles.itemOriginalPrice}>￥{model?.itemOriginalPrice / 100}</span>
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
