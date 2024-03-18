import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Button, Text, Image, RichText } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import SkeletonImage from "./../components/skeleton-image";
import * as Taro from "@tarojs/taro";

const mockData = {
  organization: {
    id: 464073095774277,
    updateTime: "2023-10-20 16:35:19",
    organizationName: "阿里ChatGPT和AIGC交流群",
    organizationDesc:
      "阿里ChatGPT和AIGC交流群是「青橙会：源于2015年」子社群，也是阿里校友会和阿里公益备案民间互助社群，群成员仅开放阿里离职校友和在职员工，致力于阿里校友间交流与互助。 截止2023月10月： 母社群矩阵超过6万人； 阿里ChatGPT和AIGC交流群近2000人； 本群聚焦：ChatGPT、大模型和AI相关话题，文字聊天为主，仅开放发布：ChatGTP & Open AI、大模型和AI相关外链，阿里官方、政府或互联网类新闻、企业招聘和青橙会相关外链。",
    adminUserId: 456915935653957,
    joinCondition: "阿里认证",
    organizationIcon: "https://img.alialumni.com/fiels/1700141212827/igw5IzdYUBCIepbT5rsVfSNVWBBCJL6H-1700141213331.jpeg",
    organizationDetails:
      "%3Cp%3E%3Cimg%20style%3D%22max-width%3A%20100%25%3B%22%20src%3D%22https%3A%2F%2Fimg.alialumni.com%2Ffiels%2F1697790896182%2FDDx4MHv7lUmK5vE2P9JjIuUm8WOpRWfI-1697790896440.jpeg%22%20%2F%3E%3Cimg%20style%3D%22max-width%3A%20100%25%3B%22%20src%3D%22https%3A%2F%2Fimg.alialumni.com%2Ffiels%2F1697790902203%2FLKhohg9fKIiZHOtAxD7feGc91njZtp0s-1697790902340.jpeg%22%20%2F%3E%3Cimg%20style%3D%22max-width%3A%20100%25%3B%22%20src%3D%22https%3A%2F%2Fimg.alialumni.com%2Ffiels%2F1697790908314%2FTCvncsaNxEOHQeXCDLmCyGlHcOjSUM6Y-1697790908480.jpeg%22%20%2F%3E%3C%2Fp%3E",
    memberCount: 2000,
    adminUser: {
      id: 456915935653957,
      avatar: "",
      wechatQrcode:
        "https://img.alialumni.com/app/imgs/1710335957744/app/imgs/1710335957744/1710335957891_bc8bd92e9d474624bcc504c5edbf0349",
    },
  },
  activityList: [
    {
      id: 500957416050757,
      activityName: "第二届AI商业应用产投大会：AI零售主题峰会",
      activityStartTime: "2023-11-25 09:00:00",
      activityEndTime: "2023-11-26 12:00:00",
      activityCategoryId: null,
      activityPosterUrl:
        "https://img.alialumni.com/fiels/1700141212827/igw5IzdYUBCIepbT5rsVfSNVWBBCJL6H-1700141213331.jpeg",
      activityCity: "杭州",
    },
    {
      id: 491329770049605,
      activityName: "AI峰会：最后一公里变现探索",
      activityStartTime: "2023-11-04 09:30:00",
      activityEndTime: "2023-11-04 18:00:00",
      activityCategoryId: null,
      activityPosterUrl:
        "https://img.alialumni.com/fiels/1697791705612/TTMfcEPoPXZr3ogsCUswaz9Mpyps1KPn-1697791705976.jpeg",
      activityCity: "杭州",
    },
    {
      id: 489925042036805,
      activityName: "2023中国AI数智未来大会：AI引领品牌新腾飞",
      activityStartTime: "2023-10-20 09:30:00",
      activityEndTime: "2023-10-20 21:00:00",
      activityCategoryId: null,
      activityPosterUrl:
        "https://img.alialumni.com/fiels/1697446910594/yUOgLyDG7KKgYqRlgFwH3SrDtrZ4z3Bc-1697446906026.jpeg",
      activityCity: "杭州",
    },
  ],
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
  const [dataSource, setDataSource] = useState(env.edit ? mockData : {});

  useEffect(() => {
    inputs["status"]((val) => {
      setDataSource({
        ...dataSource,
        我的状态: val,
      });
    });

    inputs["setDataSource"]((val) => {
      setDataSource(val);
    });
  }, [dataSource]);

  const onToggleSignup = useCallback(() => {
    if (dataSource["我的状态"] === "审核通过") {
      outputs["onQuitGroup"]({
        id: dataSource.id,
      });
      return;
    }

    outputs["onApplyGroup"](dataSource);
  }, [dataSource]);

  const onClickActivityCard = useCallback((activityId) => {
    outputs["onClickActivityCard"]({
      activityId: activityId,
    });
  }, []);

  const organizationDetails = useMemo(() => {
    if (dataSource["organization"]?.["organizationDetails"]) {
      let content = decodeURIComponent(
        dataSource["organization"]["organizationDetails"]
      );
      content = content.replace(
        /<img/gi,
        '<img style="display: block; width: 100%; height: auto;"'
      );
      return content;
    } else {
      return "";
    }
  }, [dataSource]);

  const onClickCopy = useCallback(() => {
    outputs["onCopy"](`来自青橙会，申请加入 ${dataSource?.["organization"]["organizationName"]}。`);
  }, [dataSource]);

  return (
    <View className={css.detail}>
      <View className={css.head}>
        <Image
          className={css.logo}
          mode="aspectFill"
          src={dataSource["organization"]?.["organizationIcon"]}
        />
        <View className={css.title}>{dataSource["organization"]?.["organizationName"]}</View>

        {/* {dataSource["会员人数"] ? (
          <View className={css.membersCount}>{dataSource["会员人数"]}</View>
        ) : null} */}
      </View>

      {dataSource["organization"]?.["organizationDesc"] ? (
        <View className={css.card}>
          <View className={css.label}>社群介绍</View>
          <View className={css.content}>{dataSource["organization"]?.["organizationDesc"]}</View>

          {dataSource["organization"]?.["organizationDetails"] ? (
            <RichText
              className={cx({
                [css.content]: true,
                taro_html: true,
              })}
              nodes={organizationDetails}
              selectable={"true"}
              imageMenuPrevent={"false"}
              preview={"true"}
            />
          ) : null}
        </View>
      ) : null}

      <View className={css.card}>
        <View className={css.label}>进入微信群</View>
        <View className={css.content}>
          <View className={css.applyInfo}>
            <Image
              mode="widthFix"
              showMenuByLongpress={true}
              className={css.qrcode}
              src={dataSource?.["organization"]?.["adminUser"]?.["wechatQrcode"]}
            />
            {/* <View className={css.admin}>
              <Image
                className={css.avatar}
                src={dataSource?.["管理员"]?.["头像"]}
              />
              <View className={css.nickname}>
                {dataSource?.["管理员"]?.["昵称"]}
              </View>
            </View> */}

            <View className={css.tips} onClick={onClickCopy}>
              <View className={css.line}>长按识别微信二维码联系社群管理员</View>
              <View className={css.line}>添加微信时请填写以下备注</View>
              <View className={css.copy}>
                「来自青橙会，申请加入 {dataSource?.["organization"]?.["organizationName"]}...」
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 相关活动 */}
      {dataSource["activityList"]?.length ? (
        <View className={css.card}>
          <View className={css.label}>相关活动</View>
          <View className={css.content}>
            {dataSource["activityList"].map((item) => {
              let datetime = formatTimestamp(item["activityStartTime"]);

              const buttonText = ((item) => {
                let userInfo = Taro.getStorageSync("userInfo");
                //
                let now = new Date().getTime();
                let start = new Date(item["activityStartTime"]).getTime();
                let end = new Date(item["activityEndTime"]).getTime();

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

                let isSigned = (item["活动报名表"] || []).some((item) => {
                  return item["用户"] === userInfo.id;
                });

                if (isSigned) {
                  return "已报名";
                } else {
                  return normalText;
                }
              })(item);

              return (
                <View
                  className={css.activityCard}
                  onClick={() => {
                    onClickActivityCard(item.id);
                  }}
                >
                  <View className={css.head}>
                    {item?.活动分类?.分类名称 ? (
                      <View className={css.tag}>
                        {item?.活动分类?.分类名称}
                      </View>
                    ) : null}
                    <SkeletonImage
                      skeleton={true}
                      className={css.thumbnail}
                      mode="aspectFill"
                      src={item["activityPosterUrl"]}
                    />
                  </View>
                  <View className={css.body}>
                    <View className={css.title}>{item["activityName"]}</View>
                    <View className={css.meta}>
                      <View className={css.left}>
                        <View className={css.datetime}>
                          <Text className={css.text}>{datetime}</Text>
                        </View>
                        <View className={css.address}>
                          <Text className={css.text}>{item["activityCity"]}</Text>
                        </View>
                      </View>
                      <View className={css.btn}>{buttonText}</View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}

      {/* 报名 */}
      <View className={css.placeholder}></View>

      {/* <View className={css.signupBar}>
        <View className={css.share}>
          <Button className={css.shareButton} open-type="share" />
          <Text className={css.shareText}>分享到微信</Text>
        </View>

        <View
          className={cx(css.signupButton, {
            [css.disabled]: dataSource["我的状态"] === "审核通过",
          })}
          onClick={onToggleSignup}
        >
          {dataSource["我的状态"] === "审核通过" ? "退出社群" : "申请加入"}
        </View>
      </View>
       */}
    </View>
  );
}
