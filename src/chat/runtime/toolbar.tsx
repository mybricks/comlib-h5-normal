import { View, Textarea } from "@tarojs/components";
import css from "./toolbar.less";
import { isH5 } from "../../utils/env";
import cx from "classnames";

export default function ({ data, inputs, outputs, env, extra }) {
  return (
    <View className={css.toolbar}>
      <View className={css.inner}>
        <Textarea
          fixed={true}
          className={cx({
            [css.textarea]: true,
            [css.h5]: isH5(),
          })}
          cursorSpacing={8}
          autoHeight
          // value={data.value}
          placeholder={data.placeholder}
          cursor={data.value.length}
          onKeyboardHeightChange={(e) => {
            console.log("onKeyboardHeightChange", e);
          }}
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
