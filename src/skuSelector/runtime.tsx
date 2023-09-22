import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import { Space, Tag } from "brickd-mobile";
import css from "./style.less";

export default function ({ env, data, inputs, outputs }) {
  return (
    <View className={css.tags}>
      <Space className={css.space} size="small">
        {data.tags.map((item, index) => {
          return (
            <Tag color="info" size="medium" key={index}>
              {item.label}
            </Tag>
          );
        })}
      </Space>
    </View>
  );
}
