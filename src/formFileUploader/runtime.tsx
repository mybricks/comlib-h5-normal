import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Input, View, Button, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isNumber, isObject, isString, isEmpty } from "./../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { isDesigner, isH5 } from "../utils/env";

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

  const onRemoveFile = useCallback(
    (e, index) => {
      e.stopPropagation();
      const newValue = value.filter((_, i) => i !== index);
      setValue(newValue);
    },
    [value]
  );

  const onChooseFile = useCallback(() => {
    if (env.edit) {
      return;
    }

    Taro.chooseMessageFile({
      count: data.maxCount - value.length,
      type: "all",
      extension: data.extension?.length ? data.extension : [],
      success: async (res) => {
        for (const tempFile of res.tempFiles) {
          console.log("tempFile", tempFile);

          let result = {
            filePath: tempFile.path,
            size: tempFile.size,
          };

          slots["customUpload"]?.inputs["fileData"](result);
        }
      },
    });
  }, [env.edit, value, data.maxCount, slots["customUpload"]]);

  const handleFileChange = useCallback(
    (e) => {
      let file = e.target.files[0];
      if (!file) return;

      const result = {
        filePath: URL.createObjectURL(file),
        fileName: file.name,
        type: file.type,
        size: file.size,
      };

      slots["customUpload"]?.inputs["fileData"](result);
    },
    [data, slots]
  );

  const uploader = useMemo(() => {
    if (data.maxCount && value.length >= data.maxCount) {
      return null;
    }

    if (isH5()) {
      return (
        <label className={cx(css.uploader)}>
          <input
            className={css.input}
            type="file"
            onChange={handleFileChange}
          />
          <div className={css.icon_placeholder}>+上传文件</div>
        </label>
      );
    }

    return (
      <View className={cx(css.uploader)} onClick={onChooseFile}>
        <View className={css.icon_placeholder}>+上传文件</View>
      </View>
    );
  }, [env, value, data.maxCount, data.iconSlot]);

  const thumbnails = useMemo(() => {
    return value.map((raw, index) => {
      return (
        <View
          className={cx(css.item)}
          key={raw + "_" + index}
        >
          <View className={css.thumbnail}>{raw}</View>
          <View
            className={css.remove}
            onClick={(e) => {
              onRemoveFile(e, index);
            }}
          ></View>
        </View>
      );
    });
  }, [value]);

  const placeholderText = useMemo(() => {
    if (!data.placeholderText) return null;

    return <View className={css.placeholderText}>{data.placeholderText}</View>;
  }, [data.placeholderText]);

  return (
    <View className={css.value}>
      {uploader}
      {thumbnails}
      {placeholderText}
      {slots["customUpload"]?.render({
        style: {
          display: "none",
        },
      })}
    </View>
  );
}