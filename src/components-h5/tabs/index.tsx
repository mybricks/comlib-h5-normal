import React, { CSSProperties, useEffect, useState } from "react";
import styles from "./index.less";
import cls from "classnames";

interface TabProps {
  value: string;
  items: [
    {
      _id: string;
      tabName: string;
    }
  ];
  swipeable?: boolean;
  onChange: (id: string) => void;
  children: React.ReactNode;
}

const Tab = (props: TabProps) => {
  const { value, items, swipeable, onChange, children } = props;

  const tabClick = (id) => {
    onChange(id);
  };

  return (
    <div>
      <div className={styles.tabs}>
        {/* 底部有线的tab样式 */}
        <div className={styles.tab_line}>
          {items.map((items) => (
            <div
              key={items._id}
              onClick={() => tabClick(items._id)}
              className={cls(
                styles.tabItem_line,
                items._id == value ? styles.active : ""
              )}
              style={{ flexGrow: 0 }}
            >
              {items.tabName}
              {items._id == value ? (
                <div
                  className={styles.line}
                  style={{ backgroundColor: "#FA6400" }}
                ></div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Tab;
