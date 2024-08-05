import React, { useState, useCallback, useEffect } from "react";
import { Checkbox, Image } from "brickd-mobile";
import { isObject, isString, isEmpty } from "./../utils/core/type";

import cx from "classnames";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;
  // 编辑态时，第一项为选中项
  const [value, setValue] = useState(
    env.edit ? data.options[0]?.value : data.value
  );

  useEffect(() => {
    inputs["getValue"]((val, relOutputs) => {
      console.log("value", value);
      relOutputs["returnValue"](value);
    });
  }, [value]);

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          setValue([]);
          break;
        }
        case isString(val):
          setValue([val]);
          // outputs["onChange"]({ name: data.name, value: [val] });
          break;
        case Array.isArray(val):
          setValue(val);
          // outputs["onChange"]({ name: data.name, value: val });
          break;
        case isObject(val):
          if (isString(val[data.name])) {
            setValue(val[data.name]);
          }
          // outputs["onChange"]({ name: data.name, value: val[data.name] });
          break;
        default:
          break;
      }
    });

    inputs["setOptions"]((val) => {
      if (Array.isArray(val)) {
        data.options = val;
      }
    });
  }, []);

  const onChange = useCallback((value) => {
    if (!env.runtime) {
      return;
    }

    /** 不知道为啥会出来['', 'xx']这样的结构，先兼容一下 */
    let resVal = (Array.isArray(value) ? value : []).filter((v) => v);

    setValue(resVal);

    setTimeout(() => {
      parentSlot?._inputs["onChange"]?.({
        id: props.id,
        name: props.name,
        value,
      });
      outputs["onChange"](resVal);
    }, 10);
  }, []);

  return (
    <Checkbox.Group
      direction={data.direction}
      value={value}
      onChange={onChange}
    >
      {data.options.map((item) => {
        const restProps = {} as any;
        if (item.icon) {
          restProps.icon = <Image src={item.icon} />;
        }

        return (
          <Checkbox
            className={cx({
              ["mybricks-inactive"]: value?.indexOf?.(item.value) === -1,
              ["mybricks-active"]: value?.indexOf?.(item.value) !== -1,
            })}
            name={item.value}
            shape="square"
            disabled={item.disabled ?? false}
            {...restProps}
          >
            {item.label}
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
}
