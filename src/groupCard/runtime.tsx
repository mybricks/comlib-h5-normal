import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

const mockData = {
  id: 464073095774277,
  organizationName: "阿里ChatGPT和AIGC交流群",
  organizationDesc:
    "阿里ChatGPT和AIGC交流群是「青橙会：源于2015年」子社群，也是阿里校友会和阿里公益备案民间互助社群，群成员仅开放阿里离职校友和在职员工，致力于阿里校友间交流与互助。 截止2023月10月： 母社群矩阵超过6万人； 阿里ChatGPT和AIGC交流群近2000人； 本群聚焦：ChatGPT、大模型和AI相关话题，文字聊天为主，仅开放发布：ChatGTP & Open AI、大模型和AI相关外链，阿里官方、政府或互联网类新闻、企业招聘和青橙会相关外链。",
  organizationIcon: null,
  activityList: [
    {
      id: 500957416050757,
      activityName: "第二届AI商业应用产投大会：AI零售主题峰会",
      activityStartTime: "2023-11-25 09:00:00",
      activityEndTime: "2023-11-26 12:00:00",
      activityPosterUrl:
        "https://img.alialumni.com/fiels/1700141212827/igw5IzdYUBCIepbT5rsVfSNVWBBCJL6H-1700141213331.jpeg",
      organizationId: 464073095774277,
    },
    {
      id: 491329770049605,
      activityName: "AI峰会：最后一公里变现探索",
      activityStartTime: "2023-11-04 09:30:00",
      activityEndTime: "2023-11-04 18:00:00",
      activityPosterUrl:
        "https://img.alialumni.com/fiels/1697791705612/TTMfcEPoPXZr3ogsCUswaz9Mpyps1KPn-1697791705976.jpeg",
      organizationId: 464073095774277,
    },
    {
      id: 489925042036805,
      activityName: "2023中国AI数智未来大会：AI引领品牌新腾飞",
      activityStartTime: "2023-10-20 09:30:00",
      activityEndTime: "2023-10-20 21:00:00",
      activityPosterUrl:
        "https://img.alialumni.com/fiels/1697446910594/yUOgLyDG7KKgYqRlgFwH3SrDtrZ4z3Bc-1697446906026.jpeg",
      organizationId: 464073095774277,
    },
  ],
};

export default function ({ env, data, inputs, outputs, slots }) {
  const [raw, setRaw] = useState(env.edit ? mockData : {});

  useEffect(() => {
    inputs["setDatasource"]((val) => {
      if (env.runtime) {
        setRaw(val);
      }
    });
  }, []);

  const onClick = useCallback(() => {
    outputs["onClick"]({
      organizationId: raw.id,
    });
  }, [raw]);

  return (
    <View className={css.card} onClick={onClick}>
      <View className={css.head}>
        <View className={css.main}>
          {raw["organizationIcon"] ? (
            <Image
              className={css.logo}
              mode="scaleToFill"
              src={raw["organizationIcon"]}
            />
          ) : null}
          <View className={css.meta}>
            <View className={css.title}>{raw["organizationName"]}</View>
            {/* <View className={css.condition}>入群条件：{raw['入群条件']}</View> */}
          </View>
        </View>

        <View className={css.button}>查看</View>
      </View>

      {raw["organizationDesc"] ? (
        <View className={css.body}>
          <Text className={css.text}>{raw["organizationDesc"]}</Text>
        </View>
      ) : null}

      {raw["activityList"]?.length > 0 ? (
        <View className={css.footer}>
          <View className={css.inner}>
            {raw["activityList"].map((item) => {
              return (
                <Image
                  className={css.thumbnail}
                  mode={"aspectFill"}
                  src={item["activityPosterUrl"]}
                />
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
}
