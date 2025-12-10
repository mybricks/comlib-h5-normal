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
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { isH5 } from "../utils/env";
import cx from "classnames";
import { uuid } from "../utils";
import { useConnector } from './../utils/connector/runtime'

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot,id } = props;

  //判断组件是否需要为可交互状态
  const comOperatable = useMemo(() => {
    if (env.edit) {
      return false;
    } else {
      return true;
    }
  }, [env.edit]);
  

  const [ready, setReady] = useState(
    env.edit ? true : data.defaultRenderMode === "dynamic" ? false : true
  );

  const [dataSource, setDataSource] = useState(env?.edit ? [] : data.options)

  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    //
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: val,
    });

    //
    outputs["onChange"](val);
  });

  useEffect(() => {
    parentSlot?._inputs["setProps"]?.({
      id: props.id,
      name: props.name,
      value: {
        visible: props.style.display !== "none",
      },
    });
  }, [props.style.display]);

  const connectorStateRef = useConnector({ env, data }, (fetchPromise) => {
    if (env.edit) {
      return
    }
    fetchPromise.then(options => {
      if (Array.isArray(options) && !connectorStateRef.stop) {
        setDataSource(options)
        setReady(true);
      }
    })
  });

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
        setDataSource(val);
        setReady(true);
        connectorStateRef.stop = true;

        // 如果选项中有 checked 为 true 的项，则设置为当前值
        let checkedValue = val.filter((item) => {
          return item.checked;
        });
        let lastCheckedItem = checkedValue[checkedValue.length - 1];

        if (lastCheckedItem) {
          setValue(lastCheckedItem.value);
        }
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
      const value = dataSource?.[index]?.value;
      setValue(value);
    },
    [dataSource]
  );

  const onCancel = useCallback(() => {
    outputs["onCancel"](value);
  }, [value]);

  const selectItem = useMemo(() => {
    let item = dataSource.find((item) => {
      return item.value == value;
    });

    return (
      item || {
        label: value,
        value: value,
      }
    );
  }, [value, dataSource]);

  const options = useMemo(() => {
    return ready ? dataSource : [];
  }, [ready, dataSource]);

  const selectIndex = useMemo(() => {
    return options.findIndex((item) => item.value == value);
  }, [value, options]);

  const displayValue = useMemo(() => {
    if (selectIndex > -1) {
      return dataSource[selectIndex].label;
    } else {
      return "";
    }
  }, [value, selectIndex, dataSource, data.placeholder]);

  const normalView = useMemo(() => {
    return (
      <View
        id={`a-${id}`}
        key={`normalView-${uuid()}`}
        className={cx({
          [css.select]: true,
          "mybricks-select": !isH5(),
          "mybricks-h5Select": isH5(),
        })}
      >
        {comOperatable && <Picker
          disabled={data.disabled}
          className={css.picker}
          value={selectIndex}
          options={options}
          onChange={onChange}
          onCancel={onCancel}
        >
          <View className={cx(css.display,"mybricks-display")}>
            <View
              className={cx({
                [css.input]: true,
                "mybricks-input": value,
                [css.placeholder]: !value,
                "mybricks-placeholder": !value,
              })}
            >
              {displayValue || data.placeholder}
            </View>
            <ArrowRight
              className={cx(
                {
                [css.right]: data.arrow === "right",
                [css.down]: data.arrow === "down",
                [css.none]: data.arrow === "none",
              },
              "mybricks-arrow"
            )}
            />
          </View>
        </Picker>}
        {!comOperatable && <View className={css.display}>
            <View
              className={cx({
                [css.input]: true,
                "mybricks-input": value,
                [css.placeholder]: !value,
                "mybricks-placeholder": !value,
              })}
            >
              {displayValue || data.placeholder}
            </View>
            <ArrowRight
              className={cx(
                {
                [css.right]: data.arrow === "right",
                [css.down]: data.arrow === "down",
                [css.none]: data.arrow === "none",
              },
              "mybricks-arrow"
            )}
            />
          </View>}

      </View>
    );
  }, [
    data.disabled,
    selectIndex,
    options,
    displayValue,
    data.placeholder,
    data.arrow,
  ]);

  const slotsView = useMemo(() => {
    return (
      <View
        key={`slotsView-${uuid()}`}
        className={cx({
          [css.select]: true,
          [css.slot_default_style]: true,
          "mybricks-select": !isH5(),
          "mybricks-h5Select": isH5(),
        })}
      >
        <Picker
          disabled={data.disabled}
          className={css.picker}
          value={selectIndex}
          options={options}
          onChange={onChange}
          onCancel={onCancel}
        >
          {slots?.["content"]?.render({
            style: {
              height: "100%",
            },
          })}
        </Picker>
      </View>
    );
  }, [data.disabled, selectIndex, options]);

  if (data.isSlot) {
    return slotsView;
  } else {
    return normalView;
  }
}
