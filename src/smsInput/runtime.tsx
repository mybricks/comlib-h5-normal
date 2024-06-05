import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View, Input } from "@tarojs/components";
import classNames from "classnames";
import css from "./style.less";

export default function (props) {
  const { env, data, inputs, outputs, slots } = props;

  const [value, setValue] = useState(data.value || "");
  const [focus, setFocus] = useState(false);
  const [mask, setMask] = useState(false);

  useEffect(() => {
    //input触发倒计时开始
    inputs["startCountdown"]((val, outputRels) => {
      outputRels["startCountdownDone"](val);
      countDown();
    });

    //重置值
    inputs["resetValue"]((val) => {
      setValue("");
    });
  }, []);

  useEffect(() => {
    //值变化时输出
    if (value) outputs["onChange"](value);

    //获取值
    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](value);
    });
  }, [value]);

  const points = useMemo(() => {
    const Points: JSX.Element[] = [];

    for (let i = 0; i < data.length; i++) {
      const char = value[i];
      const bordered = i !== 0 && !data.gutter;
      let showCursor = focus && i === value.length;

      let style;
      if (i !== 0 && data.gutter) {
        style = { marginLeft: data.gutter + "px" };
      }

      Points.push(
        <View
          key={i}
          className={classNames(css.input_item, {
            [css.input_item_focus]: showCursor,
            "mybricks-input-item": true,
          })}
          style={style}
        >
          {mask ? (
            <View
              className={css.mask}
              style={{ visibility: char ? "visible" : "hidden" }}
            />
          ) : (
            char
          )}
          {showCursor && <View className={css.cursor} />}
        </View>
      );
    }
    return Points;
  }, [focus, data.gutter, data.length, mask, value]);

  const onSmsInput = (e) => {
    let input = e.detail.value;
    if (input.length == data.length) {
      //填满时输出
      outputs["onComplete"](e.detail.value);
    }
    if (input.length > data.length) {
      return;
    }
    setValue(input);
  };

  const onSmSFoucs = () => {
    setFocus(true);
  };

  const onSmSBlur = () => {
    setFocus(false);
  };

  const countDown = () => {
    if (!data.buttonAvailable) return;
    data.buttonAvailable = false;
    let count = data.countdown;
    data.buttonText = `${count}s 后重新发送`;
    let _buttonText = data.buttonText;
    const timer = setInterval(() => {
      count--;
      data.buttonText = `${count}s 后重新发送`;
      if (count <= 0) {
        clearInterval(timer);
        data.buttonAvailable = true;
        data.buttonText = _buttonText;
      }
    }, 1000);
  };

  const resendSMS = () => {
    if (!data.buttonAvailable) return;
    countDown();
    outputs["onSendSMS"](value);
  };

  return (
    <View className={css.box}>
      <View className={css.password}>
        <View className={css.security} children={points} />
        <Input
          className={css.hidden_input}
          type="number"
          value={value}
          onInput={onSmsInput}
          onFocus={onSmSFoucs}
          onBlur={onSmSBlur}
        />
      </View>
      <View className={css.desc} onClick={resendSMS}>
        {data.buttonText}
      </View>
    </View>
  );
}
