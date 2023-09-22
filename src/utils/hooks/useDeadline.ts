import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'

const checkTimeFormat = (timeStr: string) => {
  return /\d{4}\-\d{1,2}\-\d{1,2}\s\d{1,2}\:\d{1,2}/.test(timeStr)
}

const hasArriveDeadLine = (time: string) => {
  return dayjs().isAfter(time)
}

/**
 * 是否到达截止时间,传入空字符串，则表示时间已到
 * @param timeStr 2022-10-1 08:00
 */
const useDeadline = (timeStr: string, interval = 100) => {
  const [overTime, setOverTime] = useState(hasArriveDeadLine(timeStr))

  useEffect(() => {
    if (!timeStr) {
      setOverTime(true)
      return
    }

    // 兼容ios的时间格式
    if (!checkTimeFormat(timeStr)) {
      console.error(`${timeStr} 不符合时间格式, 请按照格式 2022-10-1 08:00 书写`)
      return
    }

    const timer = setInterval(() => {
      if (hasArriveDeadLine(timeStr)) {
        setOverTime(true)
        clearInterval(timer)
      } else if (overTime) {
        setOverTime(false)
      }
    }, interval)

    return () => {
      clearInterval(timer)
    }
  }, [timeStr, overTime])

  return overTime
}

export default useDeadline
