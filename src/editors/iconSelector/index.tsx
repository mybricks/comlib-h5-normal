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

const { Drawer, Tabs } = window.antd ?? {};

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
  let tabScrollTimeout;
  useEffect(() => {
    const tabsWrapWidth = (
      tabsRef.current?.querySelector(".ant-tabs-nav-wrap") as HTMLElement
    )?.offsetWidth;
    const tabsEl = tabsRef.current?.querySelector(
      ".ant-tabs-nav-list"
    ) as HTMLElement;
    if (tabsEl) {
      const tahIndex = HarmonyIcons.findIndex((item) => item.title === iconSet);
      const curTab = tabsEl.querySelectorAll(".ant-tabs-tab")[
        tahIndex
      ] as HTMLElement;
      if (curTab) {
        const curTabWidth = curTab.offsetWidth;
        const curTabLeft = curTab.offsetLeft;
        const move = tabsWrapWidth / 2 - curTabLeft - curTabWidth / 2;
        const minScrollTo = tabsWrapWidth - tabsEl.offsetWidth;
        const maxScrollTo = 0;
        const scrollTo = Math.max(minScrollTo, Math.min(maxScrollTo, move));
        if (tabScrollTimeout) {
          clearTimeout(tabScrollTimeout);
        }
        tabScrollTimeout = setTimeout(() => {
          tabsEl.style.transform = `translate(${scrollTo}px,0)`;
        }, 300);
      }
    }
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
          <div ref={tabsRef} className={css.styleChoose}>
            <Tabs
              type="card"
              activeKey={iconSet}
              tabPosition="top"
              onChange={handleChangeTab}
            >
              {HarmonyIcons.map((icons) => {
                return <Tabs.TabPane tab={icons.title} key={icons.title} />;
              })}
            </Tabs>
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
