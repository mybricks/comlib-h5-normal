import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cls from "classnames";
import css from "./../style.less";


export default function ({ env, data, inputs, style, outputs }) {
  const ref = useRef<HTMLImageElement>(null);

  const imageUrl = useMemo(() => {
      return data.src;
  }, [data.src]);


  const onLoad = useCallback(() => {
    const naturalWidth = ref.current?.naturalWidth;
    const naturalHeight = ref.current?.naturalHeight;
    if (naturalHeight && naturalWidth) {
      data.height = (naturalHeight * 414) / naturalWidth;
    }
  }, []);

  const onBack = useCallback(() => {
  }, []);


  return (
      <div className={css.wrapper}>
        <img onLoad={onLoad} ref={ref} className={css.bg} src={imageUrl}></img>
          <img
            src={data.leftImg}
            className={cls(
              css.leftBlock,
              css.icon,
            )}
            style={{
              top:"50px",
            }}
            onClick={onBack}
          />
      </div>
  );
}
