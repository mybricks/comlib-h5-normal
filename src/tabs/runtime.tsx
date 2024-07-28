import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import { Tabs } from "brickd-mobile";
import css from "./style.less";
import classNames from "classnames";

function getDefaultCurrTabId(tabs) {
  if (tabs.length > 0) {
    return tabs[0]._id || "";
  }
  return "";
}

const getTabsId = (prefix, length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (var i = 0; i < length; i++) {
    var randomPos = Math.floor(Math.random() * chars.length);
    result += chars.substring(randomPos, randomPos + 1);
  }
  return `${prefix}-${result}`;
};

function debounce(func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default function ({ data, inputs, outputs, title, slots, env }) {
  const [isFixed, setIsFixed] = useState(false);
  const [tabsTop, setTabsTop] = useState(-1);
  const [tabsTopUpdate, setTabsTopUpdate] = useState(-1);
  const [tabsPaneHeight, setTabsPaneHeight] = useState(0);
  const [customNavigationHeight, setCustomNavigationHeight] = useState(0);

  const [tabsHeight, setTabsHeight] = useState(0);
  const [pxDelta, setPxDelta] = useState(0);
  const [TabID, setTabID] = useState(getTabsId("tab", 6));
  const [tabholderId, setTabholderId] = useState(getTabsId("tabholder", 6));
  const [tabpaneId, setTabpaneId] = useState(getTabsId("tabpane", 6));

  // 当前选中的tab
  // const [currentTabId, setCurrentTabId] = useState(
  //   getDefaultCurrTabId(data.tabs)
  // );

  const currentTabIdRef = useRef(getDefaultCurrTabId(data.tabs));

  useMemo(() => {
    /** 默认触发一次 */
    if (data.tabs?.[0] && data.initChangeTab) {
      outputs.changeTab?.({
        id: data.tabs[0]?._id,
        title: data.tabs[0]?.tabName,
        index: 0,
      });
    }
  }, []);

  //判断是否是真机运行态
  const isRelEnv = () => {
    if (env.runtime.debug || env.edit) {
      return false;
    } else {
      return true;
    }
  };

  // 真机运行时获取tab的高度和距离顶部的距离
  useEffect(() => {
    if (isRelEnv()) {
      const query = Taro.createSelectorQuery();
      query
        .select(`#${TabID}`)
        .boundingClientRect()
        .exec((res) => {
          const rect = res[0];
          if (rect) {
            setTabsTop(rect.top);
            setTabsHeight(rect.height);
          }
        });

      //真机运行时，获取自定义导航栏的高度，如果没有则为0
      const query2 = Taro.createSelectorQuery();
      query2
        .select(`#custom_navigation`)
        .boundingClientRect()
        .exec((res) => {
          if (res && res[0]) {
            const rect = res[0];
            setCustomNavigationHeight(rect.height);
          }
        });

      Taro.getSystemInfo().then((res) => {
        const { windowHeight, windowWidth } = res;
        const pxDelta = windowWidth / 375;
        setPxDelta(pxDelta);
      });
    }
  }, []);

  useEffect(() => {
    inputs["dataSource"]?.((ds) => {
      if (Array.isArray(ds)) {
        data.tabs = ds.map((item) => {
          return {
            _id: item.id,
            tabName: item.tabName,
          };
        });
      }
    });

    // 注意，这里名字没有变，实际上是接收了数字，从 0 开始
    inputs["activeTabId"]?.((index) => {
      if (
        typeof +index === "number" &&
        +index >= 0 &&
        +index < data.tabs.length
      ) {
        let currentTabId = data.tabs[index]._id;

        _setCurrentTabId(currentTabId);
      }
    });

    inputs["setBadge"]?.((val) => {
      data.tabs = data.tabs.map((item, index) => {
        let result = {
          ...item,
        };

        if (index === val.index) {
          result.badge = val.text;
        }

        return result;
      });
    });

    inputs["setDesc"]?.((val) => {
      data.tabs = data.tabs.map((item, index) => {
        let result = {
          ...item,
        };

        if (index === val.index) {
          result.desc = val.text;
        }

        return result;
      });
    });
  }, [data.tabs]);

  // input获取当前激活项
  useEffect(() => {
    inputs["getActiveTabId"]?.((_, relOutputs) => {
      relOutputs["activeTabId"]?.({
        id: currentTabIdRef.current,
        title: data.tabs.find((tab) => tab._id == currentTabIdRef.current)
          ?.tabName,
        index: data.tabs.findIndex((tab) => tab._id == currentTabIdRef.current),
      });
    });
  }, [currentTabIdRef.current]);

  // 切换tab时获取tabpane的高度，用于tabpane滑出屏幕时，标记为非吸顶
  useEffect(() => {
    if (isRelEnv()) {
      const query = Taro.createSelectorQuery();
      query
        .select(`#${tabpaneId}`)
        .boundingClientRect()
        .exec((res) => {
          const rect = res[0];
          setTabsPaneHeight(rect.height);
        });
    }
  }, [currentTabIdRef.current]);

  const _setUpdateTabTop = (updateTabTop, e) => {
    setTabsTopUpdate(updateTabTop);
  };

  const debouncedSetTabsTopUpdate = useCallback(
    debounce(_setUpdateTabTop, 120, false),
    [tabsHeight]
  );

  const updateTabTop = async (tabpaneId, e) => {
    const query = Taro.createSelectorQuery();
    query
      .select(`#${tabpaneId}`)
      .boundingClientRect()
      .exec((res) => {
        const rect = res[0];
        if (rect) {
          const realtime_tabToTop = rect.top;
          const { scrollTop } = e.detail;
          const tabToTop = Number(
            (realtime_tabToTop + scrollTop - tabsHeight).toFixed(0)
          );
          debouncedSetTabsTopUpdate(tabToTop, e);
        } else {
          console.log("未能找到元素或其他错误");
        }
      });
  };

  const smoothUpdateTabTop = useCallback(updateTabTop, [
    tabsHeight,
    tabsTop,
    tabsTopUpdate,
  ]);

  useEffect(() => {
    if (tabsTop === -1 || !isRelEnv()) return;

    env?.rootScroll?.onScroll?.((e) => {
      if (!data.sticky) return;

      let _tabtop = 0;
      if (tabsTopUpdate === -1) {
        _tabtop = tabsTop;
      } else {
        _tabtop = tabsTopUpdate;
      }
      smoothUpdateTabTop(tabpaneId, e);
      const { scrollTop } = e.detail ?? {};
      if (customNavigationHeight + scrollTop >= _tabtop) {
        //判断tab是否已经滑动离开页面
        if (tabsPaneHeight + _tabtop < scrollTop + customNavigationHeight) {
          setIsFixed(false);
          return;
        }
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    });
  }, [
    tabsTop,
    tabsPaneHeight,
    customNavigationHeight,
    TabID,
    tabpaneId,
    tabsTopUpdate,
  ]);

  //点击tab进行切换
  const _setCurrentTabId = (currentTabId) => {
    currentTabIdRef.current = currentTabId;
    // setCurrentTabId(currentTabId);

    const index = data.tabs.findIndex((tab) => tab._id == currentTabId);
    if (index === -1) {
      return;
    }

    // 清空 badge
    data.tabs = data.tabs.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          badge: "",
        };
      }
      return item;
    });

    const findItem = data.tabs[index];
    outputs.changeTab?.({
      id: findItem._id,
      title: findItem.tabName,
      index,
    });

    if (isRelEnv()) {
      const random = Number(Math.random() * 0.1 + 0.01);
      let _tabtop;
      if (tabsTopUpdate === -1) {
        _tabtop = tabsTop;
      } else {
        _tabtop = tabsTopUpdate;
      }
      if (isFixed || data.sticky) {
        env.rootScroll.scrollTo({
          scrollTop: random + _tabtop - customNavigationHeight,
        });
      }
    }
  };

  const emptyView = useMemo(() => {
    if (env.edit && data.tabs.length === 0) {
      return <View className={css.empty}>暂无内容，请配置标签项</View>;
    } else {
      return null;
    }
  }, [env.edit, data.tabs]);

  const tabCommonStyle = useMemo(() => {
    return {
      flexGrow: data.tabWidthType === "fit" ? 0 : 1,
      marginRight: data.tabWidthType === "fit" ? data.tabItemGap : "",
    };
  }, [data.tabWidthType, data.tabItemGap]);

  return (
    emptyView || (
      <View className={css.tab_box}>
        <Tabs
          id={TabID}
          className={css.tabs_normal}
          style={data.sticky ? { position: "sticky" } : {}}
          value={currentTabIdRef.current}
          onChange={_setCurrentTabId}
          swipeable={data.swipeable}
        >
          {data.tabs.map((tab, index) => {
            let style = { ...(tabCommonStyle ?? {}) };
            if (tab.useStyle) {
              Object.assign(
                style,
                tab._id == currentTabIdRef.current ? tab.activeStyle : tab.style
              );
            }
            return (
              <Tabs.TabPane
                badge={tab.badge}
                key={tab._id}
                title={tab.tabName + (tab.desc ? `(${tab.desc})` : "")}
                value={tab._id}
                style={style}
              ></Tabs.TabPane>
            );
          })}
        </Tabs>

        {data.tabs.map((tab, index) => {
          if (currentTabIdRef.current === tab._id) {
            return (
              <View
                key={tab._id}
                id={tabpaneId}
                style={{
                  height: `calc(100% - ${
                    tabsHeight != 0 ? tabsHeight : "44"
                  }px)`,
                }}
                className={classNames(
                  css.tab_content,
                  env.edit && css.minHeight
                )}
              >
                {data.hideContent
                  ? null
                  : slots[data.tabs_dynamic ? "item" : tab._id].render?.({
                      style: {
                        position: "smart",
                      },
                      inputValues: {
                        itemData: tab,
                        index: index,
                      },
                      key: tab._id,
                    })}
              </View>
            );
          }
        })}
      </View>
    )
  );
}
