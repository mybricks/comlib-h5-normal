import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { parseModuleAndActionFromTitle } from '../utils/track';
import styles from './styles.less';
import { mockCommodityList } from '../../mock/mockCommodityList';

export enum STATUS {
  INITIAL = 'initial',
  LOADING = 'loading',
  AVAILABLE = 'available',
  NO_MORE = 'noMore',
  EMPTY = 'empty',
  ERROR = 'error',
}

const topTags = [
  'https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/compress/image-6e871feb-e1eb-46c7-9567-253abaf1d181.png',
  'https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/compress/image-8c8841d2-667b-4674-8dc3-ce198c572902.png',
  'https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/compress/image-39f99eb8-b9e6-464d-91ca-d4d4e52eb6e4.png',
];

export default function (props) {
  const { env, data, inputs, outputs, slots, title } = props;
  const itemList = mockCommodityList;

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

  useEffect(() => {}, [data.rankId, data.size]);

  const { moduleName, actionName } = parseModuleAndActionFromTitle(title);

  return (
    <>
      {itemList && itemList.length > 0 ? (
        <div>
          <div className={styles.goodListWrapper}>
            <div className={styles.goodList} style={{ backgroundColor: data.backgroundColor }}>
              <img className={styles.banner} src={data.banner} />

              <div>
                {itemList && itemList.length > 0 ? (
                  <div className={styles.goodList}>
                    {(itemList || []).map((commodity, index) => (
                      // <div className={styles.goodCard}>
                      //   <div className={styles.coverWrapper}>
                      //     <img style={{ objectFit: 'cover' }} className={styles.cover} data-src={commodity.itemImage} />
                      //     {index < 3 ? (
                      //       <img className={styles.top3Tag} src={topTags[index]} />
                      //     ) : (
                      //       <div className={styles.otherTag}>
                      //         <span className={styles.otherTagText}>{index + 1}</span>
                      //       </div>
                      //     )}
                      //   </div>
                      //   <div className={styles.content}>
                      //     <div>
                      //       <TitleWithIcon
                      //         key={index}
                      //         numberOfLines={2}
                      //         icons={commodity?.itemIcons || []}
                      //         iconStyle={{ marginRight: '3px' }}
                      //         env={env}
                      //       >
                      //         {commodity.itemName}
                      //       </TitleWithIcon>
                      //       {renderTagList(commodity.itemTagList)}
                      //     </div>
                      //     <div className={styles.buyWrapper} style={{ backgroundImage: `url(${data.buyBg})` }}>
                      //       <div className={styles.priceWrapper}>
                      //         <div className={styles.price}>
                      //           <span className={styles.itemCouponPrice}>
                      //             <Price>{commodity.itemCouponPrice / 100}</Price>
                      //           </span>
                      //           {commodity.itemCouponPrice !== commodity.itemOriginalPrice ? (
                      //             <span className={styles.itemOriginalPrice}>
                      //               ￥{commodity.itemOriginalPrice / 100}
                      //             </span>
                      //           ) : null}
                      //         </div>
                      //       </div>
                      //       <div className={styles.buyBtn}>去抢购</div>
                      //     </div>
                      //   </div>
                      // </div>
                      slots['card']?.render()
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
