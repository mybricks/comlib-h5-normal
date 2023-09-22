import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from '@tarojs/components'
import css from './style.less'

export default function ({ env, data, inputs, outputs }) {

  return (
    <View className={`${css.map} mybricks-map`}>
      <Image mode={"aspectFill"} className={css.img} src="https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-07-31/1690806475543.676665f7c192de31.jpg" />
    </View>
  );
}
