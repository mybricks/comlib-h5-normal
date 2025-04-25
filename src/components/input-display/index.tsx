import React, { Children, CSSProperties, useMemo, ReactNode } from "react";
import { View } from "@tarojs/components";
import css from "./index.less";
import cx from "classnames";

export default ({ value, placeholder, disabled = false }) => {
    return (
        <View className={cx({
            [css.input]:true,
            ["mybricks-input"]:true,
            [css.disabled]:disabled,
            [css.normal]:!disabled && value
        })}>
            {value || placeholder}
        </View>
    );
};
