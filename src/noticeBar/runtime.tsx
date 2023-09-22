import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NoticeBar } from "brickd-mobile";

export default function ({ env, data, inputs, outputs }) {
  useMemo(() => {
    inputs["noticeText"]((val) => {
      data.noticeText = val;
    });
  }, []);

  const onClick = useCallback(() => {
    outputs["onClick"]?.(data.noticeText);
  }, []);

  const editKey = useMemo(() => {
    return Math.random();
  }, [!!env.edit]);

  const scrollable = useMemo(() => {
    return data.scrollable && !env?.edit;
  }, [!!env.edit, data.scrollable]);

  return (
    <NoticeBar
      key={editKey}
      wordwrap={data.wordwrap}
      scrollable={scrollable}
      onClick={onClick}
      style={data.style}
    >
      {data.noticeText}
    </NoticeBar>
  );
}
