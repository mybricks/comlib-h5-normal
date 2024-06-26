import React, { useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import backIconWhite from "../icons/backIconWhite";
import backIconBlack from "../icons/backIconBlack";
import homeButtonWhite from "../icons/homeButtonWhite";
import homeButtonBlack from "../icons/homeButtonBlack";
import menuButtonWhite from "../icons/menuButtonWhite";
import menuButtonBlack from "../icons/menuButtonBlack";

export default function (props) {
  let { data, env } = props;

  const onBack = () => {
    if (env.runtime) {
      console.log("back");
      env.canvas.back();
    }
  };

  return (
    <View
      className={css.defaultNavigation}
      style={{ background: data.navigationBarBackgroundColor }}
    >
      <View className={css.safearea}></View>
      <View className={css.main}>
        <View className={css.left}>
          <Image
            className={css.backIcon}
            src={
              data.navigationBarTextStyle === "white"
                ? backIconWhite
                : backIconBlack
            }
            onClick={onBack}
          />
          {data.homeButton ? (
            <Image
              className={css.homeIcon}
              src={
                data.navigationBarTextStyle === "white"
                  ? homeButtonWhite
                  : homeButtonBlack
              }
            />
          ) : null}
        </View>
        <Image
          className={css.right}
          src={
            data.navigationBarTextStyle === "white"
              ? menuButtonWhite
              : menuButtonBlack
          }
        />
        {/* title */}
        <View
          className={css.title}
          style={{ color: data.navigationBarTextStyle }}
        >
          {data.navigationBarTitleText}
        </View>
      </View>
    </View>
  );
}
