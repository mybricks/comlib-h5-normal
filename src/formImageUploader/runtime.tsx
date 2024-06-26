import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Input, View, Button, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isObject, isString, isEmpty } from "./../utils/core/type";
import { isDesigner } from "../utils/env";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = [];
          break;
        }
        case isString(val):
          data.value = [val].filter((item) => !!item);
          break;
        case Array.isArray(val):
          data.value = val;
          break;
        case isObject(val):
          let _val = val[data.name];
          if (typeof _val === "string") {
            data.value = [val[data.name]].filter((item) => !!item);
          } else if (Array.isArray(_val)) {
            data.value = val[data.name];
          }
          break;
        default:
          break;
      }
    });

    inputs["getValue"]((val, outputRels) => {
      let result = data.value;

      // 如果是单选，且需要格式化为字符串
      if (data.maxCount == 1 && data.useValueString) {
        result = result[0] || "";
      }

      outputRels["returnValue"](result);
    });

    // 上传完成
    slots["customUpload"]?.outputs["setFileInfo"]?.((filePath) => {
      if (!filePath && typeof filePath !== "string") {
        return;
      }

      data.value = [filePath, ...data.value];
      data.value = data.value.slice(0, data.maxCount);
      onChange(data.value);
    });
  }, [data]);

  const onChange = useCallback(
    (_value) => {
      let value = _value;

      // 如果是单选，且需要格式化为字符串
      if (data.maxCount == 1 && data.useValueString) {
        value = _value[0] || "";
      }

      parentSlot?._inputs["onChange"]?.({
        id: props.id,
        name: props.name,
        value,
      });
      outputs["onChange"](value);
    },
    [data.name, data.maxCount, data.useValueString]
  );

  const onPreviewImage = useCallback((e, imageUrl) => {
    e.stopPropagation();
    Taro.previewImage({ urls: [imageUrl] });
  }, []);

  const onRemoveImage = useCallback(
    (e, index) => {
      e.stopPropagation();
      const newValue = data.value.filter((_, i) => i !== index);
      data.value = newValue;
      onChange(newValue);
    },
    [data.value]
  );

  const onChooseImage = useCallback(() => {
    if (env.edit) {
      return;
    }

    Taro.chooseImage({
      count: data.maxCount - data.value.length,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: async (res) => {
        res.tempFilePaths.forEach((tempFilePath) => {
          slots["customUpload"]?.inputs["fileData"]({
            filePath: tempFilePath,
          });
        });
      },
    });
  }, [env.edit, data.value, data.maxCount, slots["customUpload"]]);

  const onChooseAvatar = useCallback(
    (res) => {
      let tempPath = res.detail.avatarUrl;
      slots["customUpload"]?.inputs["fileData"]({
        filePath: tempPath,
      });
    },
    [data.value]
  );

  const uploader = useMemo(() => {
    if (data.value.length >= data.maxCount) return null;

    if (data.chooseAvatar && !isDesigner(env)) {
      return (
        <View className={cx(css.uploader, css.card, "mybricks-square")}>
          <Button
            className={css.chooseAvatar}
            openType={"chooseAvatar"}
            onChooseAvatar={onChooseAvatar}
          ></Button>
        </View>
      );
    } else {
      return (
        <View
          className={cx(css.uploader, css.card, "mybricks-square")}
          onClick={onChooseImage}
        >
          {data.iconSlot ? (
            <View>{slots["iconSlot"]?.render({})}</View>
          ) : (
            <View className={css.icon_placeholder}>+</View>
          )}
        </View>
      );
    }
  }, [env, data.value, data.maxCount, data.chooseAvatar, data.iconSlot]);

  const thumbnails = useMemo(() => {
    return data.value.map((raw, index) => {
      return (
        <View
          className={cx(css.item, css.card, "mybricks-square")}
          onClick={(e) => {
            onPreviewImage(e, raw);
          }}
          key={raw + "_" + index}
        >
          <Image
            className={css.thumbnail}
            mode={"aspectFill"}
            src={raw}
          ></Image>
          <View
            className={css.remove}
            onClick={(e) => {
              onRemoveImage(e, index);
            }}
          ></View>
        </View>
      );
    });
  }, [data.value]);

  const placeholder = useMemo(() => {
    if (!data.placeholder) return null;

    return (
      <View
        className={cx(css.placeholder, "mybricks-square")}
        onClick={(e) => {
          onPreviewImage(e, data.placeholder);
        }}
      >
        <Image
          className={css.thumbnail}
          mode={"aspectFill"}
          src={data.placeholder}
        ></Image>
        <View className={css.text}>示例图片</View>
      </View>
    );
  }, [data.placeholder]);

  const placeholderText = useMemo(() => {
    if (!data.placeholderText) return null;

    return <View className={css.placeholderText}>{data.placeholderText}</View>;
  }, [data.placeholderText]);

  return (
    <View className={css.value}>
      {uploader}
      {thumbnails}
      {placeholderText}
      {placeholder}
      {slots["customUpload"]?.render({
        style: {
          display: "none",
        },
      })}
    </View>
  );
}
