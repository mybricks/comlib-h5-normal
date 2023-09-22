import React, { FC, useState } from 'react';

import styles from "./geoConfig.less";

const GeoConfig: FC = ({ editConfig }: any) => {
  const { value } = editConfig;
  /** getter获取默认数据 */
  const geoMap = value.get?.() ?? {};
  const [] = useState([])

  


  return (
    <div className={styles.configs}>

    </div>
  )
}

export default GeoConfig