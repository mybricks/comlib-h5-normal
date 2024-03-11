import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import { ArrowRight } from "@taroify/icons";
import { Field, Input, AreaPicker } from "brickd-mobile";
import { isObject, isString, isEmpty } from './../utils/core/type';
// import * as Taro from "@tarojs/taro";
// import { isDesigner } from "../utils/env";
import css from './style.less';

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  useEffect(() => {
    //
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = '';
          break;
        }
        case isString(val):
          data.value = val;
          // outputs["onChange"]({ name: data.name, value: val });
          break;
        case isObject(val):
          data.value = val[data.name];
          // outputs["onChange"]({ name: data.name, value: val[data.name] });
          break;
        default:
          break;
      }
    });

    // 输入框类型
    inputs["changeType"]((val) => {
      data.type = val;
    });
  }, []);

  // // 地址: 省/市/区 转 数组
  // const convertValue2Array = useCallback((value) => {
  //   value = value || "";

  //   let valArr = value.split("/");

  //   let result = valArr.map((str, index) => {
  //     let obj = {};
  //     switch (index) {
  //       case 0:
  //         obj = areaList["province_list"];
  //         break;
  //       case 1:
  //         obj = areaList["city_list"];
  //         break;
  //       case 2:
  //         obj = areaList["county_list"];
  //         break;
  //     }

  //     Object.keys(obj).forEach((key) => {
  //       if (obj[key] === str) {
  //         return key;
  //       }
  //     });

  //     return "";
  //   });

  //   return result.filter((item) => !!item);
  // }, [areaList]);

  // // 地址: 数组 转 省/市/区
  // const convertValue2String = useCallback((value) => {
  //   let result = [];
  //   for (let i = 0; i < value.length; i++) {
  //     switch (i) {
  //       case 0:
  //         result.push(areaList["province_list"][value[i]]);
  //         break;
  //       case 1:
  //         result.push(areaList["city_list"][value[i]]);
  //         break;
  //       case 2:
  //         result.push(areaList["county_list"][value[i]]);
  //         break;
  //     }
  //   }
  //   return result.join("/");
  // }, [areaList]);

  // const onClick = useCallback(() => {
  //   if (env.runtime && data.type === "select") {
  //     let _value = convertValue2Array(data.value);
  //     setValue(_value);
  //     setOpen(true);
  //   }
  // }, [env.runtime, data.value, data.type, convertValue2Array]);

  // const onCancel = useCallback(() => {
  //   setOpen(false);
  // }, []);

  // const onConfirm = useCallback((values) => {
  //   data.value = convertValue2String(values);

  //   setOpen(false);

  //   parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value: data.value })
  //   outputs["onChange"](data.value);
  // }, [convertValue2String]);

  const onChangeText = useCallback((e) => {
    let value = e.detail.value;
    data.value = value;

    parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value })
    outputs["onChange"](value);
  }, []);

  const onChange = useCallback((val) => {
    data.value = val.join('/');

    parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value: data.value })
    outputs["onChange"](data.value);
  }, [])

  const _value = useMemo(() => {
    return data.value.split('/')
  }, [data.value])

  return (
    <>
      {/* <Field
        readonly
        label={data.label}
        name={data.name}
        rightIcon={data.type === "select" && <ArrowRight />}
        onClick={onClick}
      > */}
      <View className={css.wrap}>
        {data.type === "text" ? (
          <Input
            placeholder={data.placeholder}
            value={data.value}
            onChange={onChangeText}
          />
        ) : null}

        {data.type === "select" ? (
          <AreaPicker value={_value} onChange={onChange}>
            <View className={css.select}>
              <Input
                readonly
                disabled={!data.value}
                placeholder={data.placeholder}
                value={data.value}
                style={{ flex: 1 }}
              />
              <ArrowRight />
            </View>
          </AreaPicker>
        ) : null}
      </View>
      {/* </Field> */}
      {/* <Popup open={open} rounded placement="bottom" onClose={onCancel}>
        <AreaPicker value={value} onCancel={onCancel} onConfirm={onConfirm}>
          <AreaPicker.Toolbar>
            <AreaPicker.Button>取消</AreaPicker.Button>
            <AreaPicker.Button>确认</AreaPicker.Button>
          </AreaPicker.Toolbar>
          <AreaPicker.Columns children={areaList} />
        </AreaPicker>
      </Popup> */}
    </>
  );
}
