import * as React from 'react';
import * as Taro from "@tarojs/taro";
import { Button, Text, Image, View } from "@tarojs/components";
import css from './runtime.edit.less';

const MockAdContent = () => {
  return (
    <View className={css.adContent}>
      <View className={css.title}>
        模拟广告！
      </View>
      <View className={css.desc}>
        登录就送200元红包，闯关红包更多，赶紧试试吧！
      </View>
      <View className={css.download}>
        点击下载
      </View>
    </View>
  )
}

export default function ({ env, data, inputs, outputs, createPortal }) {
  return createPortal(
    <View className={css.ad}>
      <View className={css.overlay}>
      </View>
      <View className={css.main}>
        <MockAdContent />
      </View>
    </View>
  )
}
