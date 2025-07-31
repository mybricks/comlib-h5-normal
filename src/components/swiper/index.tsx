import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  View,
  Swiper as TaroSwiper,
  SwiperItem,
  SwiperProps,
} from '@tarojs/components'
import { polyfill_taro_swiper } from './../../utils/h5-polyfill'
import css from './index.less'

polyfill_taro_swiper()

function findArrayOrObject(arr) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      return item
    } else if (typeof item === 'object' && item !== null) {
      return [item]
    }
  }
  return null // 如果没有找到数组或对象，返回 null
}

interface CustomSwiperProps extends SwiperProps {
  env: Env
  data: Data
  indicator: boolean
}

export function Swiper(props: CustomSwiperProps) {
  const {
    env,
    data,
    current,
    style,
    children,
    className,
    indicator,
    ...extra
  } = props
  const [swiperKey, setSwiperKey] = useState(0)

  //判断是否是真机运行态
  const isRelEnv = useMemo(() => {
    if (env.runtime.debug || env.edit) {
      return false
    } else {
      return true
    }
  }, [env?.runtime?.debug, env.edit])

  const SwiperComp = useMemo(() => {
    if (env.edit) {
      return View
    }
    return TaroSwiper
  }, [env.edit])

  // useEffect(()=>{
  //   const randomNumber = Math.floor(Math.random() * 1000000000);
  //   setSwiperKey(randomNumber)
  // },[data.items])

  return (
    <View className={`${css.wrapper} mybricks-swiper-wrapper ${className}`}>
      <SwiperComp
        key={swiperKey}
        {...extra}
        // className={`${css.swiper} mybricks-swiper`}
        style={style}
        current={current}
        indicatorDots={false}
      >
        {children}
      </SwiperComp>
      {indicator && (
        <View className={'indicators'}>
          {Array.from(isRelEnv ? findArrayOrObject(children) : data.items).map(
            (raw, index) => {
              return (
                <View
                  key={index}
                  className={
                    current === index
                      ? 'indicator indicator-active'
                      : 'indicator'
                  }
                ></View>
              )
            }
          )}
        </View>
      )}
    </View>
  )
}

export { SwiperItem }
