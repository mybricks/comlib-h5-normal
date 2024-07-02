import react, { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import css from "./skeleton.less";

export default function Skeleton({ editConfig }) {
  let [value, setValue] = useState(editConfig.value.get());

  const skeleton = useMemo(() => {
    return (
      <div className={css.skeleton}>
        {value.map((item, index) => {
          let row = null;
          switch (item.type) {
            case "thumbnail":
              row = <div className={css.thumbnail}></div>;
              break;
            case "avatar":
              row = <div className={css.avatar}></div>;
              break;
            case "title":
              row = <div className={css.title}></div>;
              break;
            case "paragraph":
              row = (
                <div className={css.paragraph}>
                  <div className={css.line}></div>
                  <div className={css.line}></div>
                  <div className={css.line}></div>
                  <div className={css.shortLine}></div>
                </div>
              );
              break;
          }

          return row;
        })}
      </div>
    );
  }, [value]);

  // const onOpen = useCallback(() => {
  //   return createPortal(
  //     <div className={css.preview}>{skeleton}</div>,
  //     document.body
  //   );
  // }, []);

  return createPortal(
    <div className={css.action}>
      <div className={css.button}>
        点击编辑骨架屏
      </div>
    </div>
  );
}
