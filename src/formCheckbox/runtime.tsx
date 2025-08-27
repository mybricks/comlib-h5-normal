import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Checkbox, Image } from "brickd-mobile";
import { isObject, isString, isEmpty, isNumber } from "./../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import cx from "classnames";
import { View } from "@tarojs/components";
import css from "./style.less";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [ready, setReady] = useState(
    env.edit ? true : data.defaultRenderMode === "dynamic" ? false : true
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
    parentSlot?._inputs["setProps"]?.({
      id: props.id,
      name: props.name,
      value: {
        visible: props.style.display !== "none",
      },
    });
  }, [props.style.display]);

  useEffect(() => {
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = [];
          break;
        }
        case isString(val) || isNumber(val): {
          result = [val];
          break;
        }
        case Array.isArray(val): {
          result = val;
          break;
        }
        default:
          // 其他类型的值，直接返回
          return;
      }

      setValue(result);
      outputRels["setValueComplete"]?.(result); // 表单容器调用 setValue 时，没有 outputRels
    });

    /* 获取值 */
    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](getValue() || []);
    });

    /* 重置值 */
    inputs["resetValue"]((val, outputRels) => {
      setValue([]);
      outputRels["resetValueComplete"]?.([]);
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

        // 如果选项中有 checked 为 true 的项，则设置为当前值
        let checkedItems = val.filter((item) => item.checked);
        if (checkedItems.length) {
          setValue(checkedItems.map((item) => item.value));
        }
      }
    });

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, [value]);

  const onChange = useCallback((value) => {
    if (!env.runtime) {
      return;
    }

    /** 不知道为啥会出来['', 'xx']这样的结构，先兼容一下 */
    let resVal = (Array.isArray(value) ? value : []).filter((v) => v);
    setValue(resVal);
  }, []);

  const options = useMemo(() => {
    return ready ? data.options : [];
  }, [ready, data.options]);

  const gapStyle = useMemo(() => {
    if (data.direction === "vertical") {
      return {
        marginBottom: `${data.gap}px`,
      };
    }
    if (data.direction === "horizontal") {
      if (data.columns) {
        return {
          flex: `1 1 ${100 / data.columns}%`,
          maxWidth: `${100 / data.columns}%`,
          paddingRight: `${data.gap}px`,
          marginRight: `0px`,
        };
      } else {
        return {
          marginRight: `${data.gap}px`,
        };
      }
    }
  }, [data.direction, data.gap]);

  return (
    <Checkbox.Group
      direction={data.direction}
      value={value}
      onChange={onChange}
    >
      {options.map((item,index) => {
        const restProps = {} as any;
        if (item.icon) {
          restProps.icon = <Image src={item.icon} />;
        }

        return (
          <Checkbox
            disabled={data.disabled}
            className={cx({
              ["mybricks-inactive"]: value?.indexOf?.(item.value) === -1,
              ["mybricks-active"]: value?.indexOf?.(item.value) !== -1,
              [css.box]: true
            })}
            name={item.value}
            shape="square"
            {...restProps}
            style={gapStyle}
          >
            <View data-index={index} className="mybricks-label">{item.label}</View>
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
}
