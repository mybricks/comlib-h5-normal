import React, { Children, CSSProperties, useMemo, ReactNode } from "react";
import { View } from "@tarojs/components";
import css from "./index.less";
import cx from "classnames";

export default ({ value, placeholder, disabled = false }) => {
    const style = useMemo(() => {
        return {
            color: value && !disabled ? "#323233" : "#c8c9cc"
        };
    }, [value, placeholder, disabled]);
    return (
        <View className={cx({
            [css.input]:true,
            ["mybricks-input"]:true,
            [css.disabled]:disabled,
            [css.normal]:!disabled
        })}>
            {value || placeholder}
        </View>
    );
};
