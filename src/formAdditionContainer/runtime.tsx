import React, { useState, useCallback, useEffect, useMemo } from "react";
import css from "./style.less";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  return slots["container"].render();
}
