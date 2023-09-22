import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import css from "./style.less";
import * as Taro from "@tarojs/taro";
import SkeletonImage from './../components/skeleton-image';

const mockData = {
  id: 1686035574636,
  活动名称: "2023阿里巴巴公益榜颁奖晚会",
  活动海报:
    "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-03-03/1677827764831.94d6c7462d593fa1.jpeg",
  活动开始时间: "2023-03-03 19:00",
  活动结束时间: "2023-03-03 21:00",
  活动形式: "线上活动",
  活动城市: "杭州",
  活动地址: "阿里巴巴西溪园区A区5号报告厅",
  活动详情: "",
  报名条件: "不限制",
  活动报名表: [
    {
      审核状态: "审核中",
      用户: 1686035634859,
    },
    {
      审核状态: "审核未通过",
      用户: 1686035641612,
    },
  ],
  _活动分类: 1686041696194,
  活动分类: {
    id: 1686041696194,
    分类介绍: null,
    分类名称: "分类1",
    分类图标: null,
  },
  活动简介: null,
  _活动开始时间: 1686035517987,
  _活动结束时间: 1686035517987,
};

const formatTimestamp = (timestamp) => {
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
  }, [])

  const onClick = useCallback(() => {
    outputs["onClick"]({
      id: raw.id,
    });
  }, [raw]);

  const datetime = useMemo(() => {
    return formatTimestamp(raw["活动开始时间"]);
  }, [raw]);

  const buttonText = useMemo(() => {
    let userInfo = Taro.getStorageSync("userInfo");
    //
    let now = new Date().getTime();
    let start = new Date(raw["活动开始时间"]).getTime();
    let end = new Date(raw["活动结束时间"]).getTime();

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
        {raw?.活动分类?.分类名称 ? (
          <View className={css.tag}>{raw?.活动分类?.分类名称}</View>
        ) : null}
        <SkeletonImage
          skeleton={true}
          className={css.thumbnail}
          mode="aspectFill"
          src={raw["活动海报"]}
        />
      </View>
      <View className={css.body}>
        <View className={css.title}>{raw["活动名称"]}</View>
        <View className={css.meta}>
          <View className={css.left}>
            <View className={css.datetime}>
              <Text className={css.text}>{datetime}</Text>
            </View>
            <View className={css.address}>
              <Text className={css.text}>{raw["活动城市"]}</Text>
            </View>
          </View>
          <View className={css.btn}>{buttonText}</View>
        </View>
      </View>
    </View>
  );
}
