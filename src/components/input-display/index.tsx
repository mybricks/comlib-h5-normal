import React, { Children, CSSProperties, useMemo, ReactNode } from "react";
import { View } from "@tarojs/components";
import css from "./index.less";

export default ({ value, placeholder }) => {
    const style = useMemo(() => {
        return {
            color: value ? "#323233" : "#c8c9cc",
        };
    }, [value, placeholder]);
    return (
        <View className={css.input} style={style}>
            {value || placeholder}
        </View>
    );
};
