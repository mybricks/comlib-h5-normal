import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Textarea } from "@tarojs/components";
import css from "./toolbar.less";
import { isH5 } from "../../utils/env";
import cx from "classnames";
import px2rpx from "../../utils/px2rpx";

export default function ({ data, inputs, outputs, env, extra, onSend }) {
  const [toolbarStyle, setToolbarStyle] = useState({});

  const onKeyboardHeightChange = useCallback((e) => {
    let height = px2rpx(e.detail.height);

    setToolbarStyle({
      bottom: height + "px",
      transition: (e.detail.duration || 0.25) + "s",
    });
  }, []);

  return (
    <View className={css.toolbar} style={{ ...toolbarStyle }}>
      <View className={css.inner}>
        <Textarea
          fixed={true}
          className={cx({
            [css.textarea]: true,
            [css.h5]: isH5(),
          })}
          cursorSpacing={8}
          adjustPosition={false}
          autoHeight
          // value={data.value}
          placeholder={data.placeholder}
          cursor={data.value.length}
          onKeyboardHeightChange={onKeyboardHeightChange}
          //
          disableDefaultPadding={true}
          //
          showConfirmBar={false}
          confirmType="send"
          confirmHold={true}
          onConfirm={(e) => {}}
        />
        <View className={css.send} onClick={onSend}>
          发送
        </View>
      </View>
    </View>
  );
}
