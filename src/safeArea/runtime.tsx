import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import cx from 'classnames'
import css from "./style.less";

export default function ({ env, data, inputs, outputs }) {

  const safeAreaCx = useMemo(() => {
    return cx({
      [css.safeArea]: true,
      [css.safeAreaTop]: data.position === 'top',
      [css.safeAreaBottom]: data.position === 'bottom',
      // [css.edit]: env.edit || env.runtime?.debug,
      [css.edit]: env.edit
    })
  }, [env.edit, data.position]);

  return (
    <View className={safeAreaCx}></View>
  );
}
