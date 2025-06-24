import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { View, Image } from "@tarojs/components";
import { Arrow } from "@taroify/icons";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, slots, inputs, outputs }) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const translateXRef = useRef(0);
  const SWIPE_THRESHOLD = 30; // 滑动阈值
  const [cellStyle, setCellStyle] = useState({
    transform: `translateX(0px)`,
  });

  inputs["value"]((val) => {
    Object.keys(val).forEach((key) => {
      data[key] = val[key];
    });
  });


  useEffect(() => {
    inputs?.["swipe"]?.((val) => {
        data.useSwipeLeft = !!val
    })
  }, [])

  const onClick = useCallback(
    (raw) => {
      if (!env.runtime) {
        return;
      }
      outputs["onClick"](raw);
    },
    [env]
  );

  const onClickLeftAction = useCallback((raw) => {
    if (!env.runtime) {
      return;
    }
    outputs["onClickLeftAction"](raw);
  }, []);

  const onClickLeftActionSecondary = useCallback((raw) => {
    if (!env.runtime) {
      return;
    }
    outputs["onClickLeftActionSecondary"](raw);
  }, []);

  const onTouchStart = useCallback(
    (e) => {
      if (!data.useSwipeLeft) {
        return;
      }
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    },
    [data.useSwipeLeft]
  );

  const onTouchMove = useCallback(
    (e) => {
      if (!data.useSwipeLeft) {
        return;
      }

      const touche = e.touches[0];
      let deltaX = touche.clientX - touchStartX.current;
      let deltaY = touche.clientY - touchStartY.current;

      // console.log("deltaX",deltaX,"SWIPE_THRESHOLD",SWIPE_THRESHOLD,"deltaY",deltaY)

      // 只有水平滑动距离超过阈值，且大于垂直滑动距离时才处理
      if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        e.stopPropagation();

        // 右滑，且已经在最右边
        if (translateXRef.current === 0 && deltaX > 0) {
          return;
        }

        if (translateXRef.current <= -(data.leftSwipeWidth + data.leftSwipeWidthSecondary) && deltaX < 0) {
          return;
        }

        let result = deltaX + translateXRef.current;
        if (result > 0) {
          result = 0;
        } else if (result < -(data.leftSwipeWidth + data.leftSwipeWidthSecondary)) {
          result = -(data.leftSwipeWidth + data.leftSwipeWidthSecondary);
        }

        setCellStyle({
          transform: `translateX(${result}px)`,
        });
      }
    },
    [data.useSwipeLeft, data.leftSwipeWidth, data.leftSwipeWidthSecondary]
  );

  const onTouchEnd = useCallback(
    (e) => {
      if (!data.useSwipeLeft) {
        return;
      }

      let touche = e.changedTouches[0];

      if (touche.clientX >= touchStartX.current) {
        translateXRef.current = 0;
        setCellStyle({
          transform: `translateX(0px)`,
          transition: "transform 0.3s",
        });
      } else {
        translateXRef.current = -(parseInt(data.leftSwipeStyle.width) + parseInt(data.leftSwipeStyleSecondary.width));
        setCellStyle({
          transform: `translateX(${-(parseInt(data.leftSwipeStyle.width) + parseInt(data.leftSwipeStyleSecondary.width))}px)`,
          transition: "transform 0.3s",
        });
      }
    },
    [data.useSwipeLeft, data.leftSwipeStyle.width, data.leftSwipeStyleSecondary.width]
  );

  return (
    <View className={css.swipeCell}>
      <View
        className={cx(css.cell, "mybricks-cell")}
        style={{ ...cellStyle }}
        onClick={(e) => {
          if (env.runtime) {
            e.stopPropagation();
          }
          setCellStyle({
            transform: `translateX(0px)`,
            transition: "transform 0.3s",
          });
          onClick({ title: data.title });
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {data.useThumb && data.thumb ? (
          <Image
            className={cx(css.thumb, "mybricks-thumb")}
            mode="scaleToFill"
            src={data.thumb}
          />
        ) : null}
        <View className={cx(css.inner)}>
          {data.title || data.brief ? (
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
          ) : null}

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

      <View
        className={css.action}
        style={{
          ...data.leftSwipeStyleSecondary,
          right: `${data.leftSwipeStyle?.width ?? 50}px`
        }}
        onClick={(e) => {
          if (env.runtime) {
            e.stopPropagation();
          }
          setCellStyle({
            transform: `translateX(0px)`,
            transition: "transform 0.3s",
          });
          onClickLeftActionSecondary({ title: data.title });
        }}
      >
        {data.leftSwipeTextSecondary}
      </View>
      <View
        className={css.action}
        style={{
          ...data.leftSwipeStyle
        }}
        onClick={(e) => {
          if (env.runtime) {
            e.stopPropagation();
          }
          setCellStyle({
            transform: `translateX(0px)`,
            transition: "transform 0.3s",
          });
          onClickLeftAction({ title: data.title });
        }}
      >
        {data.leftSwipeText}
      </View>
    </View>
  );
}