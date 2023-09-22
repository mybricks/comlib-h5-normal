import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

const mockData = { "id": 462657399377989, "组织名称": "青橙会养生派", "组织简介": "阿里青橙会旗下组织，搭建一个让校友们更健康，美丽，富有的平台。期待更多喜欢的校友加入我们，一起链接。 养生派有丰富的线下活动供大家体验。", "_管理员": 461217339809861, "管理员": { "id": 461217339809861, "头像": "https://admin.alialumni.com/mfs/imgs/1690438717081/X3lJiCenHakjKJke2Inn8cK1JeoiawsY-1690438717381.jpg", "昵称": "新辰", "微信二维码": "https://admin.alialumni.com/mfs/imgs/1690439180972/HiMTUbYn46LF5xrsPbfihCrlEntavUbs-1690439181398.jpg" }, "入群条件": "阿里认证", "组织图标": "https://admin.alialumni.com/mfs/imgs/1691484517942/PR6z8iJrp7mdIk3HHlHXBOB23m3yIpJs-1691484518107.JPG", "我的状态": "", "相关活动": [{ "id": 468757753954373, "活动名称": "阿里青橙会养生派|海之莲茶道心理学沙龙", "活动海报": "https://admin.alialumni.com/mfs/imgs/1692279584311/FfWcGHzi5by3vJypAIa3V0ehcA4Puf4m-1692279584348.jpeg", "活动开始时间": 1692874800441, "活动结束时间": 1692882033441, "_组织": 462657399377989, "组织": { "id": 462657399377989 } }, { "id": 468079575793733, "活动名称": "青橙会养生派周易文化公益沙龙1期", "活动海报": "https://admin.alialumni.com/mfs/imgs/1692113981887/Ykg8lfo0KytSHM5VEEUANhuk7At2wToi-1692113982164.jpeg", "活动开始时间": 1692770400598, "活动结束时间": 1692783018598, "_组织": 462657399377989, "组织": { "id": 462657399377989 } }] };

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
      id: raw.id,
    });
  }, [raw]);

  return (
    <View className={css.card} onClick={onClick}>
      <View className={css.head}>
        <View className={css.main}>
          {raw["组织图标"] ? (
            <Image
              className={css.logo}
              mode="scaleToFill"
              src={raw["组织图标"]}
            />
          ) : null}
          <View className={css.meta}>
            <View className={css.title}>{raw["组织名称"]}</View>
            {/* <View className={css.condition}>入群条件：{raw['入群条件']}</View> */}
          </View>
        </View>

        <View className={css.button}>查看</View>
      </View>

      {raw["组织简介"] ? (
        <View className={css.body}>
          <Text className={css.text}>{raw["组织简介"]}</Text>
        </View>
      ) : null}


      {raw['相关活动']?.length > 0 ? (
        <View className={css.footer}>
          <View className={css.inner}>
            {raw['相关活动'].map(item => {
              return <Image className={css.thumbnail} mode={"aspectFill"} src={item['活动海报']} />
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
}
