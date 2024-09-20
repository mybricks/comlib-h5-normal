import React, { useCallback, useEffect, useMemo, useState } from "react";
import css from "./style.less";
import cx from "classnames";
import { View } from "@tarojs/components";
import { Search } from "brickd-mobile";
import { debounce } from "./../utils/core";
import { Button } from "@tarojs/components";

export default function ({ env, data, inputs, outputs }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    inputs["setValue"]((val) => {
      setValue(val);
    });

    inputs["getValue"]?.((val, relOutputs) => {
      relOutputs["returnValue"](value);
    });
  }, [value]);

  const onClick = useCallback(() => {
    if (data.disabled) {
      outputs["onClick"]?.(value);
    }
  }, [data.disabled]);

  const onSearch = useCallback((e) => {
    outputs["onSearch"]?.(e?.detail?.value);
  }, []);

  const onInput = useCallback((e) => {
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
    setValue("");

    setTimeout(() => {
      outputs["onClear"]?.("");
    }, 0);
  }, []);

  const onButtonClick = useCallback(() => {
    outputs["onSearch"]?.(value);
  }, [value]);

  return (
    <div className={cx(css.searchBox, "mybricks-searchBar")}>
      <Search
        className={cx(css.searchBar)}
        label={data.label}
        value={value}
        placeholder={data?.placeholderText}
        // disabled={data.disabled}
        onClick={onClick}
        onInput={onInput}
        onChange={onChange}
        // action
        onCancel={onCancel}
        onClear={onClear}
        onSearch={onSearch}
      />
      {data.showSearchButton &&
        <Button
          className={cx(css.searchButton, "mybricks-searchButton")}
          onClick={onButtonClick}>
          {data.searchButtonText}
        </Button>
      }
    </div>
  );
}
