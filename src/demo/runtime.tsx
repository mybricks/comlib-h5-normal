import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View } from "@tarojs/components";

export default function ({ id, data, inputs, outputs, title, slots, env }) {
  useEffect(() => {
    slots["customUpload"]?.inputs["fileData"]({
      filePathad: "aaaaaa",
    });
  }, []);

  return <View>adfsdf</View>;
}
