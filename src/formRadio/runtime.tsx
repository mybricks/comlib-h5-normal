import React, { useState, useCallback, useEffect } from "react";
import { Field, Radio, Image } from "brickd-mobile";
import cx from "classnames";
import { isObject, isString, isEmpty } from "./../utils/core/type";
import css from "./style.less";
import { View } from "@tarojs/components";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  // 编辑态时，第一项为选中项
  const [value, setValue] = useState(
    env.edit ? data.options[0]?.value : data.value
  );

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          setValue("");
          break;
        }
        case isString(val):
          setValue(val);
          // outputs["onChange"]({ name: data.name, value: val });
          break;
        case isObject(val):
          setValue(val[data.name]);
          // outputs["onChange"]({ name: data.name, value: val[data.name] });
          break;
        default:
          break;
      }
    });

    // 设置数据源
    inputs["setOptions"]((val) => {
      if (Array.isArray(val)) {
        data.options = val;
      }
    });
  }, []);

  useEffect(() => {
    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](value);
    });
  }, [value]);

  const onChange = useCallback((value) => {
    if (!env.runtime) {
      return;
    }

    setValue(value);

    setTimeout(() => {
      parentSlot?._inputs["onChange"]?.({
        id: props.id,
        name: props.name,
        value,
      });
      outputs["onChange"](value);
    }, 10);
  }, []);

  return (
    <Radio.Group direction={data.direction} value={value} onChange={onChange}>
      {data.options.map((item) => {
        const restProps = {} as any;
        if (item.icon) {
          restProps.icon = <Image src={item.icon} />;
        }

        return (
          <Radio
            className={cx({
              ["mybricks-inactive"]: value != item.value,
              ["mybricks-active"]: value == item.value,
            })}
            name={item.value}
            {...restProps}
          >
            <View className={cx("mybricks-label", css.label)}>
              {item.label}
            </View>
            {item.brief ? (
              <View className={cx("mybricks-brief", css.brief)}>
                {item.brief}
              </View>
            ) : null}
          </Radio>
        );
      })}
    </Radio.Group>
  );
}
