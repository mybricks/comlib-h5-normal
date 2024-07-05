import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import { Arrow } from "@taroify/icons";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, slots, inputs, outputs }) {
  inputs["value"]((val) => {
    Object.keys(val).forEach((key) => {
      data[key] = val[key];
    });
  });

  const onClick = useCallback((raw) => {
    if (!env.runtime) {
      return;
    }
    outputs["onClick"](raw);
  }, [env]);


  return (
    <View
      className={cx(css.cell, "mybricks-cell")}
      onClick={() => {
        onClick({ title: data.title });
      }}
    >
      {data.useThumb && data.thumb ? (
        <Image
          className={cx(css.thumb, "mybricks-thumb")}
          mode="scaleToFill"
          src={data.thumb}
        />
      ) : null}

      <View className={cx(css.inner)}>
        <View className={css.label}>
          {data.title ? (
            <View className={cx(css.title, "mybricks-title")}>
              {data.title}
            </View>
          ) : null}

          {data.brief ? (
            <View className={cx(css.brief, "mybricks-brief")}>
              {data.brief}
            </View>
          ) : null}
        </View>

        <View
          className={cx(css.content, {
            "mybricks-content": !data.useChildren,
            "mybricks-children": data.useChildren,
          })}
        >
          <View className={css.contentInner}>
            {data.useChildren
              ? slots["children"]?.render?.({
                  style: {
                    ...data.slotStyle,
                    minHeight: "12",
                  },
                })
              : data.content}
          </View>
        </View>
        {data.useArrowIcon ? (
          <View className={css.arrow}>
            <Arrow
              className={css.icon}
              style={
                data.useChildren && data.useArrowIcon
                  ? { color: data.arrowIconColor }
                  : {}
              }
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}
