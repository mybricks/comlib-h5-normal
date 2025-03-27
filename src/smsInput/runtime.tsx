import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View, Input } from "@tarojs/components";
import classNames from "classnames";
import css from "./style.less";

export default function (props) {
  const { env, data, inputs, outputs, slots } = props;

  const [value, setValue] = useState(data.value || "");
  const [focus, setFocus] = useState(false);
  const [mask, setMask] = useState(false);
  const [error, setError] = useState(false);
  const [displayNormalText, setDisplayNormalText] = useState(data.retryText);

  useEffect(() => {
    if (env.edit) {
      setDisplayNormalText(data.retryText);
    }
  }, [data.retryText]);

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

    inputs["setError"]((val) => {
      setError(true);
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
      //是否设置了基本的边距值
      if (i !== 0 && data.gutter) {
        if (i === data.length / 2 && data.showLine) {
        } else {
          style = { marginLeft: data.gutter + "px" };
        }
      }
      //单个输入框宫格
      Points.push(
        <>
          <View
            key={i}
            className={classNames(css.input_item, {
              [css.input_item_focus]: showCursor,
              [css.input_item_error]: error,
            })}
            id="mybricks-input-item"
            style={style}
          >
            {char}
            {showCursor && <View className={css.cursor} />}
          </View>
          {i === data.length / 2 - 1 && data.showLine && (
            <View className={css.center_line}>
              <View className={css.line}></View>
            </View>
          )}
        </>
      );
    }
    return Points;
  }, [focus, data.gutter, data.length, mask, value, data.showLine, error]);

  const onSmsInput = useCallback((e) => {
    let input = e.detail.value;

    // 如果内容没有变化，不触发
    if(input == value){
      return;
    }

    if (input.length == data.length) {
      setError(false);
      //填满时输出
      outputs["onComplete"](e.detail.value);
    }
    if (input.length > data.length) {
      return;
    }
    setValue(input);
  }, [value]);

  const onSmSFoucs = () => {
    setFocus(true);
    setError(false);
  };

  const onSmSBlur = () => {
    setFocus(false);
    setError(false);
  };

  const countDown = () => {
    if (!data.buttonAvailable) return;
    data.buttonAvailable = false;
    let count = data.countdown;
    //点击按钮后立即修改按钮文字，不然会有1s的延迟
    setDisplayNormalText(`${count}${data.countDownText}`);
    const timer = setInterval(() => {
      count--;
      setDisplayNormalText(`${count}${data.countDownText}`);
      if (count <= 0) {
        clearInterval(timer);
        data.buttonAvailable = true;
        setDisplayNormalText(`${data.retryText}`);
      }
    }, 1000);
  };

  const resendSMS = () => {
    if(env.edit) return
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
      <View className={css.desc} id="mybricks-input-desc" onClick={resendSMS}>
        <View className="mybricks-desc">{displayNormalText}</View>
        {error && <View className={css.error}>{data.errorText}</View>}
      </View>
    </View>
  );
}
