import React, { useCallback, useEffect, useMemo, useState } from "react";
import css from "./style.less";
import { View } from "@tarojs/components";
import { Badge } from "brickd-mobile";
import * as Icons from "@taroify/icons";

export default function ({ env, data, logger, slots, inputs, outputs, title }) {
  const [badgeContent, setBadgeContent] = useState(data.badgeContent);

  useEffect(() => {
    inputs["setBadgeContent"]((val) => {
      setBadgeContent(val);
    });
  }, []);

  useEffect(() => {
    setBadgeContent(data.badgeContent);
  }, [data.badgeContent]);

  const onClick = useCallback(
    (e) => {
      if (env.runtime) {
        e.stopPropagation();
        outputs["onClick"](true);

        // 点击时自动清空徽标内容
        if (data.autoClearBadgeWhenClick) {
          setBadgeContent("");
        }
      }
    },
    [data.autoClearBadgeWhenClick]
  );

  const icon = useMemo(() => {
    const Icon = Icons && Icons[data.icon as string]({
      size: data.iconSize,
      color: data.iconColor,
    });
    return <>{Icon}</>;
  }, [Icons, data.icon, data.iconColor, data.iconSize]);

  return (
    <View className={css.icon} onClick={onClick}>
      <Badge content={badgeContent}>{icon}</Badge>
      {data.useLabel ? (
        <View className={`${css.label} mybricks-icon-label`}>{data.labelContent}</View>
      ) : null}
    </View>
  );
}
