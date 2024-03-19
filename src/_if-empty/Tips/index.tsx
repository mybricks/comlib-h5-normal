import React, { FC, useCallback, useEffect, useState } from "react";

import styles from "./index.less";

const Tips: FC = () => {

  return (
    <div className={styles.tips}>
      提示：
      <br />
      通过判断上面输入的字段是否为空，决定输出到「非空」或者「空」输出，两种输出都会原样携带输入的数据；
      <br /> 判断的字段应该精确到某个值，而不是对象或数组;
      <br />
      <br />
      以下情况会被认定为空：
      <br />
      - 0
      <br />
      - “”
      <br />- undefined
    </div>
  );
};

export default Tips;