import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { View } from "@tarojs/components";
import { ArrowRight } from "@taroify/icons";
import { Input, Picker } from "brickd-mobile";
import { isObject, isString, isNumber, isEmpty } from "./../utils/type";
import css from "./style.less";
import InputDisplay from "../components/input-display";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [ready, setReady] = useState(
    env.edit ? true : data.defaultRnderMode === "dynamic" ? false : true
  );

  const [value, setValue, getValue] = useFormItemValue(
    env.edit ? data.options[0]?.value : data.value,
    (val) => {
      //
      parentSlot?._inputs["onChange"]?.({
        id: props.id,
        name: props.name,
        value: val,
      });

      //
      outputs["onChange"](val);
    }
  );

  useEffect(() => {
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = "";
          break;
        }
        case isString(val) || isNumber(val):
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
      outputRels["returnValue"](getValue());
    });

    /* 重置值 */
    inputs["resetValue"]((val, outputRels) => {
      setValue("");
      outputRels["resetValueComplete"]?.("");
    });

    /* 设置标题 */
    inputs["setLabel"]?.((val) => {
      if (!isString(val)) {
        return;
      }

      parentSlot?._inputs["setProps"]?.({
        id: props.id,
        name: props.name,
        value: {
          label: val,
        },
      });
    });

    /* 设置数据源 */
    inputs["setOptions"]((val) => {
      if (Array.isArray(val)) {
        data.options = val;
        setReady(true);
      }
    });

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, []);

  const onChange = useCallback(
    (index) => {
      const value = data.options?.[index]?.value;
      setValue(value);
    },
    [data.options]
  );

  const onCancel = useCallback(() => {
    outputs["onCancel"](value);
  }, [value]);

  const selectItem = useMemo(() => {
    let item = data.options.find((item) => {
      return item.value == value;
    });

    return (
      item || {
        label: value,
        value: value,
      }
    );
  }, [value, data.options]);

  const displayValue = useMemo(() => {
    return !!selectItem;
  }, [selectItem]);

  const selectIndex = useMemo(() => {
    return data.options.findIndex((item) => item.value == value);
  }, [value, data.options]);

  const options = useMemo(() => {
    return ready ? data.options : [];
  }, [ready, data.options]);

  return (
    <>
      <View className={css.wrap}>
        <Picker
          value={selectIndex}
          options={options}
          onChange={onChange}
          onCancel={onCancel}
        >
          <View className={css.select}>
            <InputDisplay
              placeholder={data.placeholder}
              value={selectItem?.label}
            ></InputDisplay>
            <ArrowRight />
          </View>
        </Picker>
      </View>
    </>
  );
}
