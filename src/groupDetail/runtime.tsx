import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Button, Text, Image, RichText } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import SkeletonImage from './../components/skeleton-image';
import * as Taro from "@tarojs/taro";

const mockData = {
  "id": 466540510376005, "组织名称": "新测试", "组织图标": null, "组织简介": "啊啊啊", "_管理员": 1689843135576, "管理员": { "id": 1689843135576, "头像": "https://admin.alialumni.com/mfs/imgs/1690792885614/eaVTvtl7uIPGIB7L71OXAvrxGwdBfYx1-1690792885969.jpeg", "昵称": "啊啊啊啊", "微信二维码": "https://admin.alialumni.com/mfs/imgs/1690792885614/eaVTvtl7uIPGIB7L71OXAvrxGwdBfYx1-1690792885969.jpeg" }, "入群条件": null,
  "会员人数": 10000, "成员列表": [], "我的状态": "", "活动列表": [{ "id": 465926252814405, "活动名称": "测试活动1", "活动海报": "https://admin.alialumni.com/mfs/imgs/1691588293276/eCGeJigj7TMEaXSLVWbXy8zm4ng8oOKz-1691588293691.jpeg", "活动开始时间": 1692288000209, "活动结束时间": 1692411210209, "活动城市": "杭州", "_活动分类": 1686139623743, "活动分类": { "id": 1686139623743, "分类名称": "AIGC", "分类图标": "http://cdn.huodongxing.com/Content/app/appom/202305/581170169463/294875664239464.jpg", "分类简介": null } }]
}

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
      id: activityId
    });
  }, []);

  const 组织详情 = useMemo(() => {
    if (dataSource["组织详情"]) {
      let content = decodeURIComponent(dataSource["组织详情"]);
      content = content.replace(/<img/gi, '<img style="display: block; width: 100%; height: auto;"');
      return content;
    } else {
      return "";
    }
  }, [dataSource]);

  const onClickCopy = useCallback(() => {
    outputs["onCopy"](`来自青橙会，申请加入 ${dataSource?.['组织名称']}。`);
  }, [dataSource]);

  return (
    <View className={css.detail}>
      <View className={css.head}>
        <Image
          className={css.logo}
          mode="aspectFill"
          src={dataSource["组织图标"]}
        />
        <View className={css.title}>{dataSource["组织名称"]}</View>

        {dataSource["会员人数"] ? (
          <View className={css.membersCount}>{dataSource["会员人数"]}</View>
        ) : null}
      </View>

      {dataSource["组织简介"] ? (
        <View className={css.card}>
          <View className={css.label}>社群介绍</View>
          <View className={css.content}>{dataSource["组织简介"]}</View>

          {dataSource["组织详情"] ? (
            <RichText
              className={cx({
                [css.content]: true,
                taro_html: true,
              })}
              nodes={组织详情}
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
              src={dataSource?.["管理员"]?.["微信二维码"]}
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
              <View className={css.copy}>「来自青橙会，申请加入 {dataSource?.['组织名称']}...」</View>
            </View>
          </View>
        </View>
      </View>

      {/* 相关活动 */}
      {dataSource["活动列表"]?.length ? (
        <View className={css.card}>
          <View className={css.label}>相关活动</View>
          <View className={css.content}>
            {dataSource["活动列表"].map((item) => {

              let datetime = formatTimestamp(item["活动开始时间"]);

              const buttonText = ((item) => {
                let userInfo = Taro.getStorageSync("userInfo");
                //
                let now = new Date().getTime();
                let start = new Date(item["活动开始时间"]).getTime();
                let end = new Date(item["活动结束时间"]).getTime();

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
                <View className={css.activityCard} onClick={() => { onClickActivityCard(item.id); }}>
                  <View className={css.head}>
                    {item?.活动分类?.分类名称 ? (
                      <View className={css.tag}>{item?.活动分类?.分类名称}</View>
                    ) : null}
                    <SkeletonImage
                      skeleton={true}
                      className={css.thumbnail}
                      mode="aspectFill"
                      src={item["活动海报"]}
                    />
                  </View>
                  <View className={css.body}>
                    <View className={css.title}>{item["活动名称"]}</View>
                    <View className={css.meta}>
                      <View className={css.left}>
                        <View className={css.datetime}>
                          <Text className={css.text}>{datetime}</Text>
                        </View>
                        <View className={css.address}>
                          <Text className={css.text}>{item["活动城市"]}</Text>
                        </View>
                      </View>
                      <View className={css.btn}>{buttonText}</View>
                    </View>
                  </View>
                </View>
              )
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
