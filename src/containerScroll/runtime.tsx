import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image, ScrollView } from "@tarojs/components";
import css from "./style.less";

export default function ({ env, data, inputs, outputs, slots, title, style }) {
  const [state, setState] = useState({
    refresherTriggered: false
  });

  useEffect(() => {}, []);

  const slotStyle = useMemo(() => {}, []);

  const onRefresh = useCallback(() => {
    setState({ refresherTriggered: true })
  }, [])

  const onRestore = useCallback(() => {
    setState({ refresherTriggered: false })
  }, [])

  return (
    <ScrollView
      className={css.scroll}
      scrollY
      refresherEnabled
      refresherThreshold={100}
      refresherDefaultStyle="black"
      refresherBackground="lightgreen"
      refresherTriggered={state.refresherTriggered}
      onRefresherRefresh={onRefresh}
      onRefresherRestore={onRestore}
    >
      {slots["content"].render({
        style: slotStyle,
      })}
    </ScrollView>
  );
}
