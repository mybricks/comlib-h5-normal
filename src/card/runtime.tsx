import React, { useCallback, useMemo } from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, inputs, outputs, slots }) {
  const onExtraClick = useCallback(() => {
    outputs["extraClick"]?.();
  }, []);

  const extra = useMemo(() => {
    switch (data.useExtra) {
      case "slot":
        return slots["extra"].render();

      case "none":
        return null;

      case "text":
      default:
        return (
          <View className={css.text}>
            {data.extraText}
            <View className={css.arrow} />
          </View>
        );
    }
  }, [data.useExtra, data.extraText, onExtraClick]);

  const bodyCx = useMemo(() => {
    return cx({
      [css.body]: true,
      [css.empty]: !!env.edit && !slots["content"].size,
    });
  }, [slots["content"].size]);

  return (
    <View className={cx(css.card, "mybricks-card")}>
      {/* head */}
      <View className={cx(css.head, "mybricks-head")}>
        <View className={cx(css.title, "mybricks-title")}>{data.title}</View>

        {extra ? (
          <View className={css.extra} onClick={onExtraClick}>
            {extra}
          </View>
        ) : null}
      </View>

      {/* body */}
      <View className={bodyCx}>
        {slots["content"].render({
          style: data.slotStyle,
        })}
      </View>
    </View>
  );
}
