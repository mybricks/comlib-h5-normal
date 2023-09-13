import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

export default function (props) {
  const { env, data, inputs, outputs, slots, title } = props;
  const itemList = mockCommodityList;

  return (
    <>
      {itemList && itemList.length > 0 ? (
        <div>
          <div className={styles.goodListWrapper}>
            <div className={`${styles.banner} item-list-banner`} />
            {itemList && itemList.length > 0 ? (
              <div className={`${styles.cardList} item-list-cards`}>
                {(itemList || []).map((commodity, index) => (
                  <div className={styles.card}>
                    {
                      slots['card']?.render({
                        inputs: {
                          install(fn) {
                            fn(commodity);
                          },
                        },
                        style: {
                          backgound: 'transparent'
                        }
                      })
                    }
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
