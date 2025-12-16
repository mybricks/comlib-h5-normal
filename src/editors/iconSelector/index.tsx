import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { Cross } from "@taroify/icons";
import css from "./index.less";
import { HarmonyIcons } from "../../components/dynamic-icon/harmony-icons/icons";
import DynamicIcon from "../../components/dynamic-icon";

const { Drawer, Tabs, Radio } = window.antd ?? {};

const Icon = (props: any) => {
  const { type, size, className } = props;
  return <DynamicIcon className={className} size={size || 24} name={type} />;
};

export default function ({ value }) {
  const [visible, setVisible] = useState(false);
  const [iconSet, setIconSet] = useState(HarmonyIcons[0]?.title);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cateRef = useRef(null);
  const cateItemRefs = useRef({}) as MutableRefObject<{
    [key: string]: HTMLElement;
  }>;
  const isScrollingRef = useRef(false);

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
      </div>
    );
  }, []);

  let scrollTimeout;
  const handleChangeTab = (activeKey: string) => {
    console.log("activeKey", activeKey);
    setIconSet(activeKey);
    // 滚动到对应的分类
    isScrollingRef.current = true;
    cateItemRefs.current[activeKey]?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      isScrollingRef.current = false;
    }, 300);
  };

  useEffect(() => {
    setIconSet(HarmonyIcons[0]?.title);
  }, [visible]);

  useLayoutEffect(() => {
    if (!cateRef.current) return;
    const visibleSet = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target =
            entry.target instanceof HTMLElement ? entry.target : null;
          const title = target?.dataset.title;
          if (!title) return;
          if (entry.isIntersecting) {
            visibleSet.add(title);
          } else {
            visibleSet.delete(title);
          }
        });
        if (isScrollingRef.current) return;

        const firstVisible = HarmonyIcons.map((item) => item.title).filter(
          (title) => visibleSet.has(title)
        )?.[0];

        if (firstVisible && firstVisible !== iconSet) {
          setIconSet(firstVisible);
        }
      },
      {
        root: cateRef.current,
        threshold: 0,
      }
    );

    Object.values(cateItemRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visible, isScrollingRef]);

  // tab居中显示
  useEffect(() => {
    const activeIndex = HarmonyIcons.findIndex(
      (item) => item.title === iconSet
    );
    const activeEl = tabsRef.current?.querySelectorAll(
      ".ant-radio-button-wrapper"
    )?.[activeIndex] as HTMLElement;
    const tabsWrapWidth = tabsRef.current?.offsetWidth ?? 0;
    const curTabWidth = activeEl?.offsetWidth;
    const curTabLeft = activeEl?.offsetLeft;
    const scrollTo = curTabLeft - tabsWrapWidth / 2 + curTabWidth / 2;

    tabsRef.current?.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  }, [iconSet]);

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
        <div className={css["drawer-content"]}>
          <div className={css["drawerTitle"]}>
            {"选择图标"}
            <Cross onClick={toggle} />
          </div>
          <div className={css.styleChoose}>
            <div ref={tabsRef} style={{ overflowX: "auto" }}>
              <Radio.Group
                value={iconSet}
                onChange={(e) => handleChangeTab(e.target.value)}
                style={{ whiteSpace: "nowrap" }}
              >
                {HarmonyIcons.map((icons) => {
                  return (
                    <Radio.Button value={icons.title} key={icons.title}>
                      {icons.title}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </div>
          </div>
          <div className={css["icon-cate-list"]} ref={cateRef}>
            {HarmonyIcons.map((itemCate) => {
              return (
                <div
                  key={itemCate.title}
                  ref={(el) => (cateItemRefs.current[itemCate.title] = el)}
                  data-title={itemCate.title}
                >
                  <h3 className={css["icon-cate-title"]}>{itemCate.title}</h3>
                  {renderIcons(itemCate.icons)}
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
