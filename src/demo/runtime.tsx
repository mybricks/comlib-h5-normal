import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View } from "@tarojs/components";

export default function ({ id, data, inputs, outputs, title, slots, env }) {
  const myRef = React.useRef(null);

  useEffect(() => {
    env.onExp(id, () => {
      console.error("exp", id, myRef?.current);
      outputs["exp"](myRef?.current);
    });
  }, []);

  return (
    <View className="demo" id={id} ref={myRef}>
      demo-{id}
    </View>
  );
}
