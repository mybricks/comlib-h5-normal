import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Input, View, Button, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isNumber, isObject, isString, isEmpty } from "./../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { isDesigner } from "../utils/env";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    let result = [...val];

    // 如果是单选，且需要格式化为字符串
    if (data.maxCount == 1 && data.useValueString) {
      result = result[0] || "";
    }

    //
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: result,
    });

    //
    outputs["onChange"](result);
  });

  useEffect(() => {
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = [];
          break;
        }
        case isString(val):
          result = [val].filter((item) => !!item);
          break;

        case Array.isArray(val):
          result = val;
          break;

        default:
          // 其他类型的值，直接返回
          return;
      }

      setValue(result);
      outputRels["setValueComplete"]?.(result); // 表单容器调用 setValue 时，没有 outputRels
    });

    /* 获取值 */
    inputs["getValue"]((val, outputRels) => {
      let result = getValue();

      // 如果是单选，且需要格式化为字符串
      if (data.maxCount == 1 && data.useValueString) {
        result = result[0] || "";
      }

      outputRels["returnValue"](result);
    });

    /* 设置最大上传数量 */
    inputs["setMaxCount"]?.((val, outputRels) => {
      if (!isNumber(val) || val < 0) {
        return;
      }

      data.maxCount = val;

      if (val && value.length > val) {
        setValue(value.slice(0, val));
      }
    });

    // 上传完成
    slots["customUpload"]?.outputs["setFileInfo"]?.((filePath) => {
      if (!filePath && typeof filePath !== "string") {
        return;
      }

      let result = [filePath, ...value];
      result = result.slice(0, data.maxCount);
      setValue(result);
    });
  }, [value, data.maxCount]);

  // const onChange = useCallback(
  //   (_value) => {
  //     let value = _value;

  //     // 如果是单选，且需要格式化为字符串
  //     if (data.maxCount == 1 && data.useValueString) {
  //       value = _value[0] || "";
  //     }

  //     parentSlot?._inputs["onChange"]?.({
  //       id: props.id,
  //       name: props.name,
  //       value,
  //     });
  //     outputs["onChange"](value);
  //   },
  //   [data.name, data.maxCount, data.useValueString]
  // );

  const onPreviewImage = useCallback((e, imageUrl) => {
    e.stopPropagation();
    Taro.previewImage({ urls: [imageUrl] });
  }, []);

  const onRemoveImage = useCallback(
    (e, index) => {
      e.stopPropagation();
      const newValue = value.filter((_, i) => i !== index);
      setValue(newValue);
    },
    [value]
  );

  const onChooseImage = useCallback(() => {
    if (env.edit) {
      return;
    }

    Taro.chooseImage({
      count: data.maxCount - value.length,
      sizeType: ["original", "compressed"],
      // sourceType: ["album", "camera"],
      sourceType: ["album"],
      success: async (res) => {
        res.tempFiles.forEach((tempFiles) => {
          slots["customUpload"]?.inputs["fileData"]({
            filePath: tempFiles.path,
            fileName:tempFiles.originalFileObj?.name
          });
        });
      },
    });
  }, [env.edit, value, data.maxCount, slots["customUpload"]]);

  const onChooseAvatar = useCallback((res) => {
    let tempPath = res.detail.avatarUrl;
    slots["customUpload"]?.inputs["fileData"]({
      filePath: tempPath,
    });
  }, []);

  const uploader = useMemo(() => {
    if (data.maxCount && value.length >= data.maxCount) {
      return null;
    }

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
  }, [env, value, data.maxCount, data.chooseAvatar, data.iconSlot]);

  const thumbnails = useMemo(() => {
    return value.map((raw, index) => {
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
  }, [value]);

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
