import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import cls from "classnames";

function formatTime(input) {
  // 如果 input 是数字，则将其视为时间戳并转换为 Date 对象
  const date = typeof input === 'number' ? new Date(input) : input;

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function formatTimeDiff(timeDiff) {
  const hours = String(Math.floor(timeDiff / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((timeDiff % (1000 * 60)) / 1000)).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function timeStringToTimestamp(timeString) {
  // 分割时间字符串 "01:00:05" 为 ["01", "00", "05"]
  const timeParts = timeString.split(":");

  // 解析小时、分钟和秒
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);

  // 计算总秒数
  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  return totalSeconds * 1000;
}

export default function ({ env, data, inputs, outputs, title, style }) {
  const [showTime, setShowTime] = useState("--:--:--");
  const [initTime, setInitTime] = useState(new Date());
  const [countDown, setCountDown] = useState(data.countdown);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);
  const timerIdRef = useRef(null);

  //更新当前时间
  const updateCurrentTime = () => {
    const currentTime = new Date();
    setShowTime(formatTime(currentTime));
    outputs.currentTime?.(currentTime.getTime());
  };

  //计时器
  const updateTimer = () => {
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - initTime.getTime();
    setShowTime(formatTimeDiff(timeDiff));
    outputs.currentTime?.(timeDiff);
  }

  //倒计时
  const updateCountDown = useCallback(() => {
    let countDownStamp = timeStringToTimestamp(countDown)
    let endTimeStamp = initTime.getTime() + countDownStamp
    let currentTimeStamp = new Date().getTime()
    let timeDiff = endTimeStamp - currentTimeStamp
    if (timeDiff >= 0) {
      setShowTime(formatTimeDiff(timeDiff));
      outputs.currentTime?.(timeDiff);
    } else {
      console.log("清除计时器",timerIdRef.current)
      clearInterval(timerIdRef.current)
      outputs.finishCountDown?.(countDownStamp);
    }

  },[timerId,countDown])

  useEffect(() => {
    inputs["countDownTimeStamp"]?.((ds) => {
      setCountDown(ds);
    })

  }, [])

  useEffect(() => {
    if (!env.runtime) return;

  // 清除之前的定时器
  if (timerIdRef.current) {
    clearInterval(timerIdRef.current);
  }

    let newTimerId;
    switch (data.clockType) {
      case "realtime":
        updateCurrentTime();
        newTimerId = setInterval(updateCurrentTime, 1000);
        break;

      case "timer":
        updateTimer();
        newTimerId = setInterval(updateTimer, 1000);
        break;

      case "countdown":
        updateCountDown();
        newTimerId = setInterval(updateCountDown, 1000);
        break;
    }
    timerIdRef.current = newTimerId; // Use ref to store timer ID

    // 清理函数，在组件卸载时清除定时器
    return () => {
      clearInterval(newTimerId);
    };
  }, [data.clockType, env.runtime, countDown]);

  // const myStyle = useMemo(() => {
  //   return {
  //     color:data.color,
  //     fontSize: data.size + "px",
  //   };
  // }, [data.color,data.size]);


  return (
    <View 
      className={cls(css.timer,"mybricks_timer")}
      // style={myStyle}
      >
      {showTime}
    </View>
  );
}
