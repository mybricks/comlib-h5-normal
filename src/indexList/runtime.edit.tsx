import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import { IndexList } from './runtime'
import css from './style.edit.less'

export default (props) => {
  const { env, data, inputs, outputs, slots } = props

  return (
    <View className={css.edit}>
      <IndexList {...props} />
    </View>
  )
}