import React, { useCallback, useMemo, useState } from "react";
import { Cross } from "@taroify/icons";
import css from "./index.less";
import { TaroifyIcons } from "../../components/dynamic-icon/icons";
import DynamicIcon from "../../components/dynamic-icon";

const { Drawer, Radio } = window.antd ?? {};

const Icon = (props: any) => {
  const { type, size, className } = props;
  return <DynamicIcon className={className} size={size || 24} name={type} />;
};

export default function ({ value }) {
  const [visible, setVisible] = useState(false);
  const [iconSet, setIconSet] = useState(TaroifyIcons[0]?.title);

  const _setValue = useCallback(
    (icon) => {
      setVisible(false);
      value.set(icon);
    },
    [value]
  );

  const toggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const renderIcons = useCallback((icons) => {
    return (
      <div className={css["icon-list"]}>
        {Object.keys(icons).map((icon) => {
          return (
            <div
              className={css["icon-item"]}
              onClick={() => {
                _setValue(icon);
              }}
              key={icon}
            >
              <Icon type={icon} />
            </div>
          );
        })}
        <div className={css["icon-item-placeholder"]}></div>
        <div className={css["icon-item-placeholder"]}></div>
        <div className={css["icon-item-placeholder"]}></div>
        <div className={css["icon-item-placeholder"]}></div>
        <div className={css["icon-item-placeholder"]}></div>
        <div className={css["icon-item-placeholder"]}></div>
      </div>
    );
  }, []);

  return (
    <div className={css["editor-icon"]}>
      <button className={css["editor-icon__button"]} onClick={toggle}>
        <Icon
          type={value.get()}
          size={16}
          className={css["editor-icon__button-editIcon"]}
        />
        {`${visible ? "关闭" : "打开"}`}图标选择器
      </button>

      <Drawer
        className={`${css.iconBody} fangzhou-theme`}
        bodyStyle={{
          padding: 0,
          borderLeft: "1px solid #bbb",
          backgroundColor: "#F7F7F7",
          overflow: "auto",
        }}
        placement="right"
        mask={false}
        closable={false}
        destroyOnClose={true}
        visible={visible}
        width={390}
        getContainer={() => document.querySelector('div[class^="lyStage-"]')}
        style={{ position: "absolute" }}
      >
        <div className={css.sticky}>
          <div className={css["drawerTitle"]}>
            {"选择图标"}
            <Cross onClick={toggle} />
          </div>
          <div className={css.styleChoose}>
            <div>
              <Radio.Group
                value={iconSet}
                onChange={(e) => setIconSet(e.target.value)}
              >
                {TaroifyIcons.map((icons) => {
                  return (
                    <Radio.Button value={icons.title}>
                      {icons.title}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </div>
          </div>
        </div>
        <div>
          {renderIcons(TaroifyIcons.find((t) => t.title === iconSet)?.icons)}
        </div>
      </Drawer>
    </div>
  );
}
