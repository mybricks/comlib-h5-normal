import React, { useCallback, useEffect, useLayoutEffect, useRef, useMemo, useState } from "react";
import css from "./style.less";
import cx from "classnames";
import { View, Image } from "@tarojs/components";
import { Search } from "brickd-mobile";
import { debounce } from "./../utils/core";
import { Button } from "@tarojs/components";
import { clearable } from "./clearable";

export default function ({ env, data, inputs, outputs }) {
  const [value, setValue] = useState("");
  const [autoFocus, setAutoFocus] = useState(false)

  useEffect(() => {
    inputs["setValue"]((val) => {
      setValue(val);
    });

    inputs["getValue"]?.((val, relOutputs) => {
      relOutputs["returnValue"](value);
    });

    inputs["focus"]?.((val, relOutputs) => {
      setAutoFocus(true)
      relOutputs['focusDone'](val)
    })
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

  const onBlur = useCallback((e) => {
    //防止失去焦点后又自动聚焦
    setAutoFocus(false)
  }, [])

  const onButtonClick = useCallback(() => {
    outputs["onSearch"]?.(value);
  }, [value]);

  const icon = useMemo(() => {
    if (data.isCustom && !!data.src) {
      return <Image style={{ width: data.contentSize?.[1] ?? 14, height: data.contentSize?.[0] ?? 14, marginRight: data.iconDistance }} src={data?.src} alt={' '} />
    } else {
      return undefined
    }

  }, [data.contentSize, data.src, data.isCustom, data.iconDistance])

  const $clearIcon = useMemo(() => {
    if (data.clearable && value.length > 0) {
      return <View style={{ width: 18, height: 18 }} onClick={() => {
        setValue('')
        outputs?.["onClear"]?.('')
      }}>
        <Image style={{ width: 18, height: 18 }} src={clearable}></Image>
      </View>
    } else {
      return null
    }
  }, [data.clearable, value.length])

  return (
    <View className={cx(css.searchBox, "mybricks-searchBar")}>
      {/* 搜索框禁用时在上方加一层View，不然点击不生效 */}
      {data.disabled && <View className={css.searchBoxDisabled} onClick={onClick}></View>}
      <Search
        className={cx(css.searchBar, "mybricks-searchBar-input")}
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
        onBlur={onBlur}
        icon={icon}
        clearable={false}
        autoFocus={autoFocus}
      />
      {$clearIcon}
      {data.showSearchButton &&
        <Button
          className={cx(css.searchButton, "mybricks-searchButton")}
          onClick={onButtonClick}>
          {data.searchButtonText}
        </Button>
      }
    </View>
  );
}
