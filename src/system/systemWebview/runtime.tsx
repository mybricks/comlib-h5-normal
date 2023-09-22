import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, WebView, NavigationBar } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import { isDesigner } from "../../utils/env";
import EmptyCom from "../../components/empty-com";
import DefaultNavigation from "../modules/defaultNavigation";

export default function ({ env, data, inputs, outputs }) {

  useEffect(() => {
    inputs["setUrl"]((val) => {
      data.url = val;
    });
  }, []);

  const onMessage = useCallback((e) => {
    outputs["onMessage"](e);
  }, []);

  const onLoad = useCallback((e) => {
    outputs["onLoad"](e);
  }, []);

  const onError = useCallback((e) => {
    outputs["onError"](e);
  }, []);

  // 编辑态
  if (isDesigner(env)) {
    return (
      <>
        <View className={"mybricks-navigation"}>
          <DefaultNavigation data={data} />
        </View>

        <View className={cx(css.webview, css.edit)}>
          {data.url ? (
            <WebView
              src={data.url}
              onMessage={onMessage}
              onLoad={onLoad}
              onError={onError}
            />
          ) : (
            <EmptyCom title="暂未设置网页链接" />
          )}
        </View>
      </>
    );
  }

  // todo
  // 如果小程序有登录态，把 token 合并到 url 中给到网页
  return data.url ? (
    <WebView
      className={css.webview}
      src={data.url}
      onMessage={onMessage}
      onLoad={onLoad}
      onError={onError}
    />
  ) : null;
}
