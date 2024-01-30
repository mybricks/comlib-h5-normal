import React, { useCallback, useMemo, useState } from "react";
import * as Icons from "@taroify/icons";
import { Cross } from "@taroify/icons";
import css from "./index.less";
import { basicIcons, filledIcons, outlinedIcons } from "./icons";

const { Drawer, Radio } = window.antd ?? {}

const Icon = (props: any) => {
  const { type, size, className } = props;

  // @ts-ignore
  const RenderIcon = Icons[type];

  if (!RenderIcon) return <></>;

  return <RenderIcon className={className} size={size || 24} />;
};

export default function ({ value }) {
  const [visible, setVisible] = useState(false);
  const [iconSet, setIconSet] = useState("basic");

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

  const renderBasicIcons = useMemo(() => {
    return (
      <div className={css["icon-list"]}>
        {basicIcons.map((icon) => {
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
  }, [basicIcons]);

  const renderOutlinedIcons = useMemo(() => {
    return (
      <div className={css["icon-list"]}>
        {outlinedIcons.map((icon) => {
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
  }, [outlinedIcons]);

  const renderFilledIcons = useMemo(() => {
    return (
      <div className={css["icon-list"]}>
        {filledIcons.map((icon) => {
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
  }, [filledIcons]);

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
        onClose={close}
        width={390}
        getContainer={() => document.querySelector('div[class^="lyStage-"]')}
        style={{ position: "absolute" }}
      >
        <div className={css.sticky}>
          <div className={css["drawerTitle"]}>
            {"选择图标"}
            <Cross onClick={close} />
          </div>
          <div className={css.styleChoose}>
            <div>
              <Radio.Group
                value={iconSet}
                onChange={(e) => setIconSet(e.target.value)}
              >
                <Radio.Button value="basic">基础图标</Radio.Button>
                <Radio.Button value="outLined">线框风格</Radio.Button>
                <Radio.Button value="Filled">实底风格</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div>
          {iconSet === "basic" ? renderBasicIcons : null}
          {iconSet === "outLined" ? renderOutlinedIcons : null}
          {iconSet === "Filled" ? renderFilledIcons : null}
        </div>
      </Drawer>
    </div>
  );
}
