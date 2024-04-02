import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Button,
  Text,
  RichText as DRichText,
  Image,
} from "@tarojs/components";
import SkeletonImage from "./../components/skeleton-image";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";

import RichText from "./../components/rich-text";

// import mockAct from "./mockAct";

const mockData = {
  activity: {
    id: 539796973918336,
    activityName: "xxx活动2",
    activityStartTime: "2023-08-24 19:00:00",
    activityEndTime: "2023-08-24 21:00:33",
    activityType: "1",
    activityAddress: "中山花园秋月苑5楼海之莲1",
    activityBrief: "1",
    activityDetails: "1",
    activityCategoryId: 463762142621765,
    activityPosterUrl:
      "https://admin.alialumni.com/mfs/imgs/1691398475677/LViKCtb63WK81tcCG4RTu1iXoIoUoIN7-1691398475947.jpg",
    activityCity: "杭州",
    activityOrganizerId: 461217339809861,
    activitySpecialStatus: "1",
    activityCreatorId: 461215023108165,
    activityUpdaterId: 461164569567301,
    registerLimit: 10,
    activityStatus: "上架",
    organizationId: 462657399377989,
    ticketType: [],
    additionalField: [],
    registerRequirement: "1",
    registerCondition: "1",
  },
  loginUser: {
    id: 456915935653957,
    username: "odlHh5Dr3hfgOW1t1q_DjK3s02Dc",
    avatar: "",
    nickName: "钟鱼",
    aliFlowerName: "aliFlowerName",
  },
  activityRegister: null,
  activityRegisterList: [],
  activityCategory: {
    id: 463762142621765,
    categoryName: "养生派",
    categoryBrief: "11",
    categoryIcon: null,
  },
  activityOrganizer: {
    id: 461217339809861,
    avatar:
      "https://admin.alialumni.com/mfs/imgs/1690438717081/X3lJiCenHakjKJke2Inn8cK1JeoiawsY-1690438717381.jpg",
    nickName: "新辰",
    wechatAvatar: null,
    wechatQrcode:
      "https://admin.alialumni.com/mfs/imgs/1690439180972/HiMTUbYn46LF5xrsPbfihCrlEntavUbs-1690439181398.jpg",
  },
  organization: {
    id: 462657399377989,
    organizationName: "青橙会养生派",
    organizationDesc:
      "阿里青橙会旗下组织，搭建一个让校友们更健康，美丽，富有的平台。期待更多喜欢的校友加入我们，一起链接。 养生派有丰富的线下活动供大家体验。",
    organizationIcon:
      "https://img.alialumni.com/1709303794067_d4763e4e7d104ea6abfabd212b8157bf.jpg",
  },
};

const formatTimestamps = (timestamp1, timestamp2) => {
  timestamp1 = timestamp1?.replace(/-/g, "/");
  timestamp2 = timestamp2?.replace(/-/g, "/");

  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  const month1 = date1.getMonth() + 1;
  const month2 = date2.getMonth() + 1;
  const day1 = date1.getDate();
  const day2 = date2.getDate();
  const hour1 = date1.getHours();
  const hour2 = date2.getHours();
  const minute1 = date1.getMinutes();
  const minute2 = date2.getMinutes();

  const isSameYear = year1 === year2;
  const isCurrentYear = year1 === new Date().getFullYear();

  const yearStr1 = isSameYear || isCurrentYear ? "" : `${year1}-`;
  const yearStr2 = isSameYear || isCurrentYear ? "" : `${year2}-`;
  const monthStr1 = month1 < 10 ? `0${month1}` : month1;
  const monthStr2 = month2 < 10 ? `0${month2}` : month2;
  const dayStr1 = day1 < 10 ? `0${day1}` : day1;
  const dayStr2 = day2 < 10 ? `0${day2}` : day2;
  const hourStr1 = hour1 < 10 ? `0${hour1}` : hour1;
  const hourStr2 = hour2 < 10 ? `0${hour2}` : hour2;
  const minuteStr1 = minute1 < 10 ? `0${minute1}` : minute1;
  const minuteStr2 = minute2 < 10 ? `0${minute2}` : minute2;

  if (isSameYear) {
    return `${monthStr1}-${dayStr1} ${hourStr1}:${minuteStr1} 至 ${monthStr2}-${dayStr2} ${hourStr2}:${minuteStr2}`;
  } else {
    return `${yearStr1}${monthStr1}-${dayStr1} ${hourStr1}:${minuteStr1} 至 ${yearStr2}${monthStr2}-${dayStr2} ${hourStr2}:${minuteStr2}`;
  }
};

export default function ({ env, data, inputs, outputs, slots, id }) {
  const [raw, setRaw] = useState(env.edit ? mockData : {});

  // 是否展示联系活动发起人提示
  const [contactable, setContactable] = useState(false);
  useEffect(() => {
    if (!env.edit) {
      let cache = Taro.getStorageSync(`cache${id}`);
      let qrcode = raw["activityOrganizer"]?.["wechatQrcode"];
      setContactable(!cache && !!qrcode);
    } else {
      setContactable(true);
    }
  }, [raw["activityOrganizer"]]);

  useMemo(() => {
    inputs["status"]((val) => {
      setRaw((raw) => {
        raw["activityRegister"]?.["auditStatus"] = val;
        return {
          ...raw,
        };
      });
    });

    inputs["value"]((val) => {
      //
      let now = new Date().getTime();
      let start = new Date(
        val.activity?.["activityStartTime"]?.replace(/-/g, "/")
      ).getTime();
      let end = new Date(
        val.activity?.["activityEndTime"]?.replace(/-/g, "/")
      ).getTime();

      val["activityRegister"] = val["activityRegister"] || {};

      if (now < start) {
        // 报名中的活动，如果人数达到上限，则停止报名
        let activityRegisterList = val?.["activityRegisterList"] || [];

        activityRegisterList = activityRegisterList.filter((item) => {
          return item.auditStatus !== "审核未通过";
        });

        if (
          val.activity?.["registerLimit"] &&
          val.activity?.["registerLimit"] <= activityRegisterList.length
        ) {
          val["activityRegister"]?.["auditStatus"] = "报名人数已满";
        }
        //////
      } else if (now > end) {
        val["activityRegister"]?.["auditStatus"] = "活动已结束";
      } else {
        val["activityRegister"]?.["auditStatus"] = "活动进行中";
      }

      setRaw({
        ...val,
      });
    });
  }, []);

  const datetime = useMemo(() => {
    if (
      raw.activity?.["activityStartTime"] &&
      raw.activity?.["activityEndTime"]
    ) {
      return formatTimestamps(
        raw.activity["activityStartTime"],
        raw.activity["activityEndTime"]
      );
    } else {
      return "";
    }
  }, [raw]);

  const content = useMemo(() => {
    if (raw.activity?.["activityDetails"]) {
      let content = decodeURIComponent(raw.activity["activityDetails"]);
      content = content.replace(
        /<img/gi,
        '<img style="display: block; width: 100%; height: auto;"'
      );
      // content = content.replace(/<img.*?src="(.*?)"/g, '<img data-id="$1" src="$1"');
      return content;
    } else {
      return "";
    }
  }, [raw]);

  const contentCx = useMemo(() => {
    return cx({
      [css.content]: true,
      taro_html: true,
    });
  }, []);

  const onToggleSignup = useCallback(() => {
    if (
      raw["activity"]?.["activitySpecialStatus"] ||
      (raw["activityRegister"]?.["auditStatus"] &&
        raw["activityRegister"]?.["auditStatus"] !== "审核未通过")
    ) {
      return;
    }

    outputs["onSignup"]({
      activityId: raw.id,
    });
  }, [raw]);

  const 活动报名表 = useMemo(() => {
    let result = raw["activityRegisterList"] || [];
    result = result.filter((item) => {
      return item.auditStatus !== "审核未通过";
    });
    return result;
  }, [raw["activityRegisterList"]]);

  const onClickGroup = useCallback(() => {
    outputs["onClickGroupCard"]({
      organizationId: raw["organization"]?.id,
    });
  }, [raw]);

  const onClickUser = useCallback((userId) => {
    outputs["onClickUserCard"]({
      userId: userId,
    });
  }, []);

  const onContact = useCallback(() => {
    if (env.edit) {
      return;
    }

    Taro.setStorageSync(`cache${id}`, true);
    setContactable(false);

    Taro.previewImage({
      urls: [raw["activityOrganizer"]?.["wechatQrcode"]],
    });
  }, [raw["activityOrganizer"], env]);

  /**
   * 暂无数据
   */
  if (JSON.stringify(raw) === JSON.stringify({})) {
    return null;
  }

  /**
   * 活动下架
   */
  if (raw["activity"]?.["activityStatus"] === "下架") {
    return (
      <View className={css.errorResult}>
        <View className={css.text}>来晚啦，活动已下线</View>
      </View>
    );
  }

  /**
   * 活动正常
   */
  return (
    <View className={css.detail}>
      <View className={css.head}>
        <View className={css.thumbnailSlot}>
          <SkeletonImage
            className={css.thumbnail}
            skeleton={true}
            mode={"aspectFill"}
            src={raw.activity["activityPosterUrl"]}
          />
        </View>

        <View className={css.meta}>
          <View className={css.title}>{raw.activity["activityName"]}</View>

          <View className={css.datetime}>
            <Text className={css.text}>{datetime}</Text>
          </View>

          <View className={css.address}>
            <Text className={css.text}>{`${
              raw.activity["activityAddress"] || ""
            }`}</Text>
          </View>
        </View>
      </View>

      {/* 社群 */}
      {raw["organization"] ? (
        <View className={css.card}>
          <View className={css.label}>关联社群</View>
          <View className={css.content}>
            <View className={css.groupCard} onClick={onClickGroup}>
              <View className={css.head}>
                <View className={css.main}>
                  {raw["organization"]["organizationIcon"] ? (
                    <Image
                      className={css.logo}
                      mode="scaleToFill"
                      src={raw["organization"]["organizationIcon"]}
                    />
                  ) : null}
                  <View className={css.meta}>
                    <View className={css.title}>
                      {raw["organization"]["organizationName"]}
                    </View>
                  </View>
                </View>
                <View className={css.button}>查看</View>
              </View>
            </View>
          </View>
        </View>
      ) : null}

      {/* 报名人数 */}
      {活动报名表?.length ? (
        <View className={css.card}>
          <View className={css.label}>已报名（{活动报名表.length}）</View>
          <View className={css.content}>
            <View className={css.userList}>
              {活动报名表.map((item, index) => {
                return (
                  <View
                    className={css.item}
                    key={index}
                    onClick={() => {
                      onClickUser(item.userId);
                    }}
                  >
                    <View className={css.avatarWrapper}>
                      <SkeletonImage
                        skeleton={true}
                        className={css.avatar}
                        src={
                          item["avatar"] ||
                          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png"
                        }
                      />
                    </View>
                    <View className={css.nickname}>
                      {item["nickName"] || item["aliFlowerName"] || ""}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      ) : null}

      <View className={css.card}>
        <View className={css.label}>活动详情</View>
        <View className={css.content}>
          {/* <DRichText className={contentCx} nodes={content} selectable={"true"} imageMenuPrevent={"false"} preview={"true"} /> */}
          <RichText
            className={contentCx}
            content={content}
            selectable
            imageMenuPrevent={false}
            imagePreview
          />
        </View>
      </View>

      <View className={css.placeholder}></View>

      <View className={css.signupBar}>
        {/* 发起人 */}
        {raw["activityOrganizer"] ? (
          <View className={css.contact} onClick={onContact}>
            {contactable ? (
              <View className={css.contactTips}>联系活动发起人</View>
            ) : null}
            <Image
              className={css.avatar}
              src={
                raw["activityOrganizer"]["avatar"] ||
                "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png"
              }
            />
            <View className={css.nickname}>
              {raw["activityOrganizer"]["nickName"]}
            </View>
          </View>
        ) : null}

        <Button className={css.share} open-type="share">
          <View className={css.shareButton}></View>
          <Text className={css.shareText}>分享到微信</Text>
        </Button>

        <View
          className={cx(css.signupButton, {
            [css.disabled]:
              raw["activity"]?.["activitySpecialStatus"] ||
              (raw["activityRegister"]?.["auditStatus"] &&
                raw["activityRegister"]?.["auditStatus"] !== "审核未通过"),
          })}
          onClick={onToggleSignup}
        >
          {raw["activity"]?.["activitySpecialStatus"] ||
            raw["activityRegister"]?.["auditStatus"] ||
            "我要报名"}
        </View>
      </View>
    </View>
  );
}
