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
  id: 468079575793733,
  活动名称: "青橙会养生派周易文化公益沙龙1期",
  活动海报:
    "https://admin.alialumni.com/mfs/imgs/1692113981887/Ykg8lfo0KytSHM5VEEUANhuk7At2wToi-1692113982164.jpeg",
  活动开始时间: 1692770400598,
  活动结束时间: 1692783018598,
  活动形式: null,
  活动地址: "杭州",
  活动简介: null,
  活动详情:
    "%3Cp%3E%E6%9C%AC%E6%9C%9F%E4%B8%BB%E9%A2%98%EF%BC%9A%3Cbr%20%2F%3E%E2%9C%85%20%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87%E4%B8%80%E4%B8%AA%E4%BA%BA%E7%9A%84%E5%90%8D%E5%AD%97%EF%BC%8C%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3%E8%BF%99%E4%B8%AA%E4%BA%BA%E7%9A%84%E6%80%A7%E6%A0%BC%EF%BC%9F%3Cbr%20%2F%3E%E2%9C%85%20%E4%B8%8D%E9%80%82%E5%AE%9C%E7%9A%84%E5%90%8D%E5%AD%97%E4%BC%9A%E5%B8%A6%E6%9D%A5%E5%93%AA%E4%BA%9B%E9%9A%90%E6%82%A3%EF%BC%9F%E5%AD%A9%E5%AD%90%E5%8F%96%E5%90%8D%E7%A6%81%E5%BF%8C%EF%BC%81%E2%9A%A0%EF%B8%8F%3Cbr%20%2F%3E%E2%9C%85%E5%AE%B6%E5%B1%85%E9%A3%8E%E6%B0%B4%E3%80%81%E5%8A%9E%E5%85%AC%E9%A3%8E%E6%B0%B4%E7%9A%84%E7%A6%81%E5%BF%8C%E6%9C%89%E5%93%AA%E4%BA%9B%EF%BC%9F%E5%A6%82%E4%BD%95%E5%A2%9E%E6%97%BA%E4%BA%8B%E4%B8%9A%E5%92%8C%E5%AE%85%E8%BF%90%EF%BC%9F%3Cbr%20%2F%3E%E2%9C%85%E4%B9%B0%E6%88%BF%E3%80%81%E7%A7%9F%E6%88%BF%E6%97%B6%E5%BA%94%E8%AF%A5%E6%B3%A8%E6%84%8F%E5%93%AA%E4%BA%9B%E9%A3%8E%E6%B0%B4%E7%A6%81%E5%BF%8C%EF%BC%9F%3Cbr%20%2F%3E%E2%9C%85%E5%A9%9A%E5%A7%BB%E4%B8%8D%E9%A1%BA%EF%BC%8C%E5%A6%82%E4%BD%95%E8%A7%84%E9%81%BF%E5%92%8C%E5%8C%96%E8%A7%A3%EF%BC%9F%E5%A6%82%E4%BD%95%E6%8B%9B%E6%A1%83%E8%8A%B1%EF%BC%9F%E5%A6%82%E4%BD%95%E6%96%A9%E6%A1%83%E8%8A%B1%EF%BC%9F%3Cbr%20%2F%3E%E2%9C%85%E5%AD%A9%E5%AD%90%E6%88%90%E7%BB%A9%E4%B8%80%E7%9B%B4%E4%B8%8A%E4%B8%8D%E5%8E%BB%EF%BC%8C%E5%A6%82%E4%BD%95%E6%94%B9%E5%96%84%E6%88%90%E6%89%8D%EF%BC%9F%3Cbr%20%2F%3E%E2%9C%85%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9%E5%90%88%E4%BD%9C%E4%BC%99%E4%BC%B4%EF%BC%8C%E5%A6%82%E4%BD%95%E6%89%BE%E5%88%B0%E7%94%9F%E5%91%BD%E4%B8%AD%E7%9A%84%E8%B4%B5%E4%BA%BA%EF%BC%9F%3Cbr%20%2F%3E%E2%9C%85%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87%E6%98%93%E7%BB%8F%E9%A3%8E%E6%B0%B4%E8%AE%A9%E8%B4%A2%E8%BF%90%E3%80%81%E6%83%85%E6%84%9F%E3%80%81%E4%BA%8B%E4%B8%9A%E7%AD%89%E5%90%84%E6%96%B9%E9%9D%A2%E8%BF%90%E5%8A%BF%E7%BF%BB%E5%80%8D%EF%BC%9F%3Cbr%20%2F%3E%E2%9C%85%E5%A6%82%E4%BD%95%E5%A2%9E%E8%BF%90%E6%97%BA%E8%BF%90%EF%BC%8C%E6%8F%90%E5%8D%87%E6%95%B4%E4%BD%93%E8%BF%90%E5%8A%BF%EF%BC%9F%3Cbr%20%2F%3E%E2%8C%9A%EF%B8%8F%E6%97%B6%E9%97%B4%EF%BC%9A8%E6%9C%8823%E6%97%A5%E4%B8%8B%E5%8D%8814%3A00%EF%BD%9E17%EF%BC%9A30%3Cbr%20%2F%3E%5B%E5%8A%A0%E6%B2%B9%5D%E5%90%8D%E9%A2%9D%E6%9C%89%E9%99%90%EF%BC%8C%E6%8F%90%E5%89%8D%E6%8A%A5%E5%90%8D%EF%BC%8C%E8%B0%A2%E7%BB%9D%E7%A9%BA%E9%99%8D%EF%BC%81%E3%80%90%E9%B8%BD%E5%AD%90%E8%B4%B9200%E5%85%83%E3%80%91%3C%2Fp%3E%0A%3Cp%3E%E5%88%86%E4%BA%AB%E5%98%89%E5%AE%BE%EF%BC%9A%3C%2Fp%3E%0A%3Cp%3E%3Cimg%20style%3D%22max-width%3A%20100%25%3B%22%20src%3D%22https%3A%2F%2Fadmin.alialumni.com%2Fmfs%2Ffiels%2F1692114031230%2FsXELDF2s35UTguRaDF4FzesIv04dXJeV-1692114031631.jpg%22%20%2F%3E%3C%2Fp%3E",
  活动报名表: [
    {
      id: 468083709112389,
      用户: {
        id: 461217339809861,
        头像: "https://admin.alialumni.com/mfs/imgs/1690438717081/X3lJiCenHakjKJke2Inn8cK1JeoiawsY-1690438717381.jpg",
        昵称: "新辰",
        用户名: "odlHh5OvNMK49dDcYP-Ukp8ki73g",
        阿里花名: "新辰",
      },
      _用户: 461217339809861,
      审核状态: "审核通过",
    },
    {
      id: 468275728592965,
      用户: {
        id: 463665624469573,
        头像: "https://admin.alialumni.com/mfs/imgs/1690438717081/X3lJiCenHakjKJke2Inn8cK1JeoiawsY-1690438717381.jpg",
        昵称: "新辰",
        用户名: "odlHh5Iv4G8R1MgwbYgekqH3CGnA",
        阿里花名: "新辰",
      },
      _用户: 463665624469573,
      审核状态: "审核中",
    },
  ],
  _活动分类: 463762142621765,
  活动分类: {
    id: 463762142621765,
    分类名称: "养生派",
    分类图标: null,
    分类简介: "",
  },
  活动城市: "杭州",
  活动特殊状态: "",
  报名人数上限: 20,
  _活动发起人: 461217339809861,
  活动发起人: {
    id: 461217339809861,
    头像: "https://admin.alialumni.com/mfs/imgs/1690438717081/X3lJiCenHakjKJke2Inn8cK1JeoiawsY-1690438717381.jpg",
    昵称: "新辰",
    阿里花名: "新辰",
    微信二维码:
      "https://admin.alialumni.com/mfs/imgs/1690439180972/HiMTUbYn46LF5xrsPbfihCrlEntavUbs-1690439181398.jpg",
    阿里认证审核状态: "审核通过",
  },
  活动状态: null,
  _组织: 464080158371909,
  组织: {
    id: 464080158371909,
    组织名称: "阿里校友志愿者",
    组织图标:
      "https://admin.alialumni.com/mfs/imgs/1691138016325/fiPyDzlroojaJF4Xego1Buxwkj5gLauf-1691138016255.jpeg",
    组织简介:
      "欢迎全球各地阿里同学积极参与组织建设，加入全球校友志愿者网络，目前志愿者超过300人，分布式协同运营支持社群发展。",
  },
  我的状态: "",
};

const formatTimestamps = (timestamp1, timestamp2) => {
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
      let qrcode = raw["活动发起人"]?.["微信二维码"];
      setContactable(!cache && !!qrcode);
    } else {
      setContactable(true);
    }
  }, [raw["活动发起人"]]);

  useMemo(() => {
    inputs["status"]((val) => {
      setRaw((raw) => {
        return {
          ...raw,
          ["我的状态"]: val,
        };
      });
    });

    inputs["value"]((val) => {
      //
      let now = new Date().getTime();
      let start = val["活动开始时间"];
      let end = val["活动结束时间"];

      if (now < start) {
        // 报名中的活动，如果人数达到上限，则停止报名
        let 活动报名表 = val["活动报名表"] || [];

        活动报名表 = 活动报名表.filter((item) => {
          return item.审核状态 !== "审核未通过";
        });

        if (val["报名人数上限"] && val["报名人数上限"] <= 活动报名表.length) {
          val["我的状态"] = "报名人数已满";
        }
        //////
      } else if (now > end) {
        val["我的状态"] = "活动已结束";
      } else {
        val["我的状态"] = "活动进行中";
      }

      setRaw({
        ...val,
      });
    });
  }, []);

  const datetime = useMemo(() => {
    if (raw["活动开始时间"] && raw["活动结束时间"]) {
      return formatTimestamps(raw["活动开始时间"], raw["活动结束时间"]);
    } else {
      return "";
    }
  }, [raw]);

  const content = useMemo(() => {
    if (raw["活动详情"]) {
      let content = decodeURIComponent(raw["活动详情"]);
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
    if (raw["我的状态"] && raw["我的状态"] !== "审核未通过") {
      return;
    }

    outputs["onSignup"]({
      id: raw.id,
    });
  }, [raw]);

  const 活动报名表 = useMemo(() => {
    let result = raw["活动报名表"] || [];
    result = result.filter((item) => {
      return item.审核状态 !== "审核未通过";
    });
    return result;
  }, [raw["活动报名表"]]);

  const onClickGroup = useCallback(() => {
    outputs["onClickGroupCard"]({
      id: raw["组织"]?.id,
    });
  }, [raw]);

  const onClickUser = useCallback((userId) => {
    outputs["onClickUserCard"]({
      id: userId,
    });
  }, []);

  const onContact = useCallback(() => {
    if (env.edit) {
      return;
    }

    Taro.setStorageSync(`cache${id}`, true);
    setContactable(false);

    Taro.previewImage({
      urls: [raw["活动发起人"]?.["微信二维码"]],
    });
  }, [raw["活动发起人"], env]);

  /**
   * 暂无数据
   */
  if (JSON.stringify(raw) === JSON.stringify({})) {
    return null;
  }

  /**
   * 活动下架
   */
  if (raw["活动状态"] === "下架") {
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
            src={raw["活动海报"]}
          />
        </View>

        <View className={css.meta}>
          <View className={css.title}>{raw["活动名称"]}</View>

          <View className={css.datetime}>
            <Text className={css.text}>{datetime}</Text>
          </View>

          <View className={css.address}>
            <Text className={css.text}>{`${raw["活动地址"] || ""}`}</Text>
          </View>
        </View>
      </View>

      {/* 社群 */}
      {raw["组织"] ? (
        <View className={css.card}>
          <View className={css.label}>关联社群</View>
          <View className={css.content}>
            <View className={css.groupCard} onClick={onClickGroup}>
              <View className={css.head}>
                <View className={css.main}>
                  {raw["组织"]["组织图标"] ? (
                    <Image
                      className={css.logo}
                      mode="scaleToFill"
                      src={raw["组织"]["组织图标"]}
                    />
                  ) : null}
                  <View className={css.meta}>
                    <View className={css.title}>{raw["组织"]["组织名称"]}</View>
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
                      onClickUser(item["用户"].id);
                    }}
                  >
                    <View className={css.avatarWrapper}>
                      <SkeletonImage
                        skeleton={true}
                        className={css.avatar}
                        src={
                          item["用户"]?.["头像"] ||
                          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png"
                        }
                      />
                    </View>
                    <View className={css.nickname}>
                      {item["用户"]?.["昵称"] ||
                        item["用户"]?.["阿里花名"] ||
                        ""}
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
        {raw["活动发起人"] ? (
          <View className={css.contact} onClick={onContact}>
            {contactable ? (
              <View className={css.contactTips}>联系活动发起人</View>
            ) : null}
            <Image className={css.avatar} src={raw["活动发起人"]["头像"]} />
            <View className={css.nickname}>{raw["活动发起人"]["昵称"]}</View>
          </View>
        ) : null}

        <Button className={css.share} open-type="share">
          <View className={css.shareButton}></View>
          <Text className={css.shareText}>分享到微信</Text>
        </Button>

        <View
          className={cx(css.signupButton, {
            [css.disabled]: raw["我的状态"] && raw["我的状态"] !== "审核未通过",
          })}
          onClick={onToggleSignup}
        >
          {raw["我的状态"] || "我要报名"}
        </View>
      </View>
    </View>
  );
}
