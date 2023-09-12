import React, { useEffect, useState } from 'react';
import styles from './styles.less';
import useGoodShelve, { STATUS } from '../utils/hooks/useGoodShelve';
import Loading from '../components/loading';

export default function (props) {
  const { env, data, slots, inputs, outputs, className } = props;
  const { itemList, firstRequest, status, switchTab, onExpose, onPress, loadMore } = useGoodShelve({
    ...props,
    carrierType: data.carrierType,
    deliveryPack: data.deliveryPackId || {},
  });

  //页面首次加载钩子，只触发一次
  useEffect(() => {
    env.edit && slots['card'].size === 0 && slots['card'].addCom(data.selectComNameSpace);
  }, []);

  useEffect(() => {
    switchTab(data.deliveryPackId || {});
  }, [data.deliveryPackId]);

  const dataList = data.maxNum && data.maxNum > 0 ? itemList.slice(0, data.maxNum) : itemList;

  return (
    <>
      {itemList && itemList.length > 0 ? (
        <div className={styles.wrapper}>
          <img className={styles.banner} style={{ objectFit: 'cover' }} src={data.banner} />
          <div className={styles.goodListWrapper}>
            <div className={styles.goodList} style={{ backgroundColor: data.backgroundColor }}>
              {dataList.map((commodity, index) => (
                <div key={`commodity-${commodity?.itemId}`}>
                  {slots['card'].render({
                    inputs: {
                      install(fn) {
                        fn({
                          commodity,
                          index,
                          onPress: onPress,
                          onExpose: onExpose,
                        });
                      },
                    },
                  })}
                </div>
              ))}
            </div>
            {status === STATUS.AVAILABLE && itemList.length < data.maxNum ? (
              <div
                className={styles.more}
                style={{ backgroundColor: env.themes?.['bgSecondary'] || 'var(--color-bg-secondary)' }}
                onClick={loadMore}
              >
                <span className={styles.moreText}>点击展开更多</span>
                <img
                  style={{
                    width: '12px',
                    marginLeft: '4px',
                    objectFit: 'cover',
                  }}
                  src="https://f2.eckwai.com/kos/nlav11092/u_3nm9f9.83be11ec7f80a015.svg"
                />
              </div>
            ) : (
              ''
            )}

            {status === STATUS.LOADING && firstRequest === false ? (
              <div className={styles.moreLoading}>
                <Loading color={env.themes?.['bgPrimary'] || 'var(--color-bg-primary)'}></Loading>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
