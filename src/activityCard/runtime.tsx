import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import css from "./style.less";
import * as Taro from "@tarojs/taro";
import SkeletonImage from "./../components/skeleton-image";

const mockData = {
  id: 464069272072261,
  activityName: "「8.04 | 周五」夜爬网红马家坞",
  activityStartTime: "2023-08-04 19:30:00",
  activityEndTime: "2023-08-04 21:00:00",
  activityCategoryId: 464070986551365,
  activityPosterUrl:
    "https://admin.alialumni.com/mfs/imgs/1691398475677/LViKCtb63WK81tcCG4RTu1iXoIoUoIN7-1691398475947.jpg",
  activityCity: "杭州",
  category: {
    id: 464070986551365,
    categoryName: "徒步、爬山运动",
    categoryBrief: "一起运动，减肥甩脂~",
    categoryIcon:
      "https://admin.alialumni.com/mfs/imgs/1691135378466/LiOVMlWTj0hBMrGb37uargsqLJ2bsRiC-1691135378931.jpg",
  },
};

const formatTimestamp = (timestamp) => {
  timestamp = timestamp?.replace(/-/g, "/");

  const date = new Date(timestamp);
  const now = new Date();
  const isCurrentYear = date.getFullYear() === now.getFullYear();

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const monthStr = month < 10 ? `0${month}` : month;
  const dayStr = day < 10 ? `0${day}` : day;
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minute < 10 ? `0${minute}` : minute;

  if (isCurrentYear) {
    return `${monthStr}-${dayStr} ${hourStr}:${minuteStr}`;
  } else {
    const year = date.getFullYear();
    return `${year}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}`;
  }
};

export default function ({ env, data, inputs, outputs, slots }) {
  const [raw, setRaw] = useState(env.edit ? mockData : {});

  useMemo(() => {
    inputs["setDatasource"]((val) => {
      setRaw(val);
    });
  }, []);

  const onClick = useCallback(() => {
    outputs["onClick"]({
      activityId: raw.id,
    });
  }, [raw]);

  const datetime = useMemo(() => {
    return formatTimestamp(raw["activityStartTime"]);
  }, [raw]);

  const buttonText = useMemo(() => {
    let userInfo = Taro.getStorageSync("userInfo");
    //
    let now = new Date().getTime();
    let start = new Date(raw["activityStartTime"]?.replace(/-/g, "/")).getTime();
    let end = new Date(raw["activityEndTime"]?.replace(/-/g, "/")).getTime();

    let normalText = "立即报名";

    switch (true) {
      case now < start:
        normalText = "立即报名";
        break;
      case now >= start && now <= end:
        normalText = "进行中";
        break;
      case now > end:
        normalText = "已结束";
        break;
    }

    if (!userInfo || !userInfo.id) {
      return normalText;
    }

    let isSigned = (raw["活动报名表"] || []).some((item) => {
      return item["用户"] === userInfo.id;
    });

    if (isSigned) {
      return "已报名";
    } else {
      return normalText;
    }
  }, [raw]);

  return (
    <View className={css.card} onClick={onClick}>
      <View className={css.head}>
        {raw?.category?.categoryName ? (
          <View className={css.tag}>{raw?.category?.categoryName}</View>
        ) : null}
        <SkeletonImage
          skeleton={true}
          className={css.thumbnail}
          mode="aspectFill"
          src={raw["activityPosterUrl"]}
        />
      </View>
      <View className={css.body}>
        <View className={css.title}>{raw["activityName"]}</View>
        <View className={css.meta}>
          <View className={css.left}>
            <View className={css.datetime}>
              <Text className={css.text}>{datetime}</Text>
            </View>
            <View className={css.address}>
              <Text className={css.text}>{raw["activityCity"]}</Text>
            </View>
          </View>
          <View className={css.btn}>{buttonText}</View>
        </View>
      </View>
    </View>
  );
}
