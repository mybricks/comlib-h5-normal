import React, { useCallback, useEffect, useMemo, useState } from "react";
import css from "./style.less";
import cx from "classnames";
import { Search } from "brickd-mobile";
import { debounce } from "./../utils/core";
export default function ({ env, data, inputs, outputs }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    inputs["setValue"]((val) => {
      setValue(val);
    });
  }, []);

  const onClick = useCallback(() => {
    if (data.disabled) {
      outputs["onClick"]?.(true);
    }
  }, [data.disabled]);

  const onSearch = useCallback((e) => {
    outputs["onSearch"]?.(e?.detail?.value);
  }, []);

  const onInput = useCallback((e) => {
    console.log("onInput", e.detail.value);
    setValue(e.detail.value);
  }, []);

  const onChange = useCallback(
    debounce((e) => {
      console.log("onChange", e.detail.value);
      outputs["onChange"]?.(e.detail.value);
    }, 300),
    []
  );

  const onCancel = useCallback((e) => {
    outputs["onCancel"]?.(true);
  }, []);

  const onClear = useCallback((e) => {
    outputs["onClear"]?.("");
  }, []);

  return (
    <Search
      className={cx(css.searchBar, "mybricks-searchBar")}
      label={data.label}
      value={value}
      placeholder={data?.placeholderText}
      disabled={data.disabled}
      onClick={onClick}
      onInput={onInput}
      onChange={onChange}
      // action
      onCancel={onCancel}
      onClear={onClear}
      onSearch={onSearch}
    />
  );
}
