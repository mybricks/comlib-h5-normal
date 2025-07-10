import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import { View, ScrollView } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import { Tabs } from "brickd-mobile";
import css from "./style.less";
import cx from "classnames";

//侧边栏展示类型
enum ContentShowType {
  Roll = "roll",
  Switch = "switch",
}

interface Tab {
  _id: string;
  tabName: string;
  top?: number;
  height?: number;
}


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

  const [innerScrollId, setInnerScrollId] = useState("");
  const [inClickType, setInClickType] = useState(false);
  const [updatedTabs, setUpdatedTabs] = useState<Tab[]>([]);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [safeAreaHeight, setSafeAreaHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);


  // 当前选中的tab
  // const [currentTabId, setCurrentTabId] = useState(
  //   getDefaultCurrTabId(data.tabs)
  // );

  const currentTabIdRef = useRef(getDefaultCurrTabId(data.tabs));
  const [currentTabId, setCurrentTabId] = useState(getDefaultCurrTabId(data.tabs))

  useEffect(() => {
    //真机运行时，获取屏幕高度和宽度
    if (isRelEnv()) {
      Taro.getSystemInfo().then((res) => {
        const { windowHeight, windowWidth } = res;
        const pxDelta = windowWidth / 375;
        setWindowHeight(windowHeight);
        setWindowWidth(windowWidth);
        setPxDelta(pxDelta);
        const safeAreaHeight = res.screenHeight - res.safeArea.bottom;
        setSafeAreaHeight(safeAreaHeight * pxDelta);
      });
    } else {
      //pc端调试态设置固定的宽高即可
      setWindowHeight(583);
      setWindowWidth(375);
      setPxDelta(1);
    }
  }, []);

  useMemo(() => {
    /** 默认触发一次 */
    if (data.tabs?.[0] && data.initChangeTab) {
      outputs.changeTab?.({
        id: data.tabs[0]?._id,
        title: data.tabs[0]?.tabName,
        index: 0,
      });

      outputs[`changeTab_${data.tabs[0]?._id}`]?.({
        id: data.tabs[0]?._id,
        title: data.tabs[0]?.tabName,
        index: 0,
      });
    }
  }, [data.tabs]);

  useLayoutEffect(() => {
    //通过连线来切换tab
    data.tabs.forEach((item) => {
      inputs[item._id]?.((bool, relOutputs) => {
        _setCurrentTabId(item._id);
        relOutputs["changeDone"]?.(bool);
      });
    });
  }, [data.tabs]);

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
        _setCurrentTabId(data.tabs[0]._id);
      }
    });

    // 注意，这里名字没有变，实际上是接收了数字，从 0 开始
    inputs["activeTabId"]?.((index) => {
      if (
        typeof +index === "number" &&
        +index >= 0 &&
        +index < data.tabs.length
      ) {
        let currentTabId = data.tabs[index]?._id;
        if (currentTabId) {
          _setCurrentTabId(currentTabId);
        }
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
          if (res && res[0]) {
            const rect = res[0];
            setTabsPaneHeight(rect.height);
          }
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

    if (ContentShowType.Roll === data.contentShowType) {
      setInClickType(true); // 标记为点击触发
      console.log("点击tab进行切换", currentTabId);

      // 找到对应 Tab 的位置
      const targetTab = updatedTabs.find((tab) => tab._id === currentTabId);
      if (targetTab) {
        const scrollTop = targetTab.top; // Tab 的顶部位置
        const offset = customNavigationHeight || 0; // 考虑顶部导航栏的高度
        //滚动显示的时候，innerScrollId必须和上一次不一致，否则scroll不生效，无法滚动到对应位置
        env.runtime && setInnerScrollId("");
        setTimeout(() => {
          env.runtime && setInnerScrollId(currentTabId);
        }, 0);
      }

      // 延迟解除点击状态，避免滚动触发逻辑干扰
      setTimeout(() => setInClickType(false), 300);
    }

    const index = data.tabs.findIndex((tab) => tab._id == currentTabId);
    if (index === -1) {
      return;
    }

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

    if (ContentShowType.Switch === data.contentShowType) {
      if (isRelEnv()) {
        const random = Number(Math.random() * 0.1 + 0.01);
        let _tabtop;
        if (tabsTopUpdate === -1) {
          _tabtop = tabsTop;
        } else {
          _tabtop = tabsTopUpdate;
        }
        if (isFixed) {
          env.rootScroll.scrollTo({
            scrollTop: random + _tabtop - customNavigationHeight,
          });
        }
      }
    }
    outputs.changeTab?.({
      id: findItem._id,
      title: findItem.tabName,
      index,
    });

    outputs[`changeTab_${findItem._id}`]?.({
      id: findItem._id,
      title: findItem.tabName,
      index,
    });
  };

  const _scrollingCurrentTabId = (currentTabId) => {
    console.log("找到内容-tab高亮", currentTabId)
    currentTabIdRef.current = currentTabId;
    //下面这个只是为了触发页面更新 hack
    setCurrentTabId(currentTabId);
  }

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


  //判断是否有tabbar
  const ifHasTabbar = () => {
    if (!isRelEnv()) return false;
    if (env.useTabBar) {
      return true;
    } else {
      return false;
    }
  };

  const scrollStyle = useMemo(() => {
    if (env.edit) {
      //编辑态,确保内容可见，不需要滚动
      return { height: "max-content" };
    } else if (isRelEnv()) {
      //线上运行态
      //判断是否有tabbar
      if (ifHasTabbar()) {
        return {
          height:
            (windowHeight - safeAreaHeight - 54) / pxDelta,
        };
      } else {
        return {
          height: windowHeight / pxDelta,
        };
      }
    } else {
      //pc端调试态
      return {
        height: "max-content",
      };
    }
  }, [windowHeight, windowWidth, env, pxDelta, safeAreaHeight]);

  //真机运行时，计算出每个tab的顶部距离和高度
  useEffect(() => {
    console.log("data.tabs", data.tabs, data.useDynamicTab);
    if (data.contentShowType == ContentShowType.Switch || !data.contentShowType) {
      return
    }
    const updateTabsData = () => {
      const updatedTabs = [];
      let index = 0;

      const processNextTab = () => {
        if (index < data.tabs.length) {
          const item = data.tabs[index];
          const query = Taro.createSelectorQuery();
          query
            .select(`#${item._id}`)
            .boundingClientRect()
            .exec((res) => {
              if (res && res[0]) {
                const { top, height } = res[0];
                updatedTabs.push({ ...item, top, height });
              } else {
                console.error(`Failed to get boundingClientRect for ${item._id}`);
              }
              index++;
              processNextTab(); // 处理下一个 tab
            });
        } else {
          setUpdatedTabs(updatedTabs);
        }
      };

      processNextTab(); // 开始处理第一个 tab
    };

    if (isRelEnv()) {
      updateTabsData();
    }
  }, [data.tabs, data.useDynamicTab, data.contentShowType]);


  const innerOnScroll = useCallback((e) => {

    if (inClickType) {
      console.log("忽略滚动事件，因为是点击触发");
      return; // 忽略滚动事件
    }

    const scrollTop = e.detail.scrollTop;

    const findItem = updatedTabs.find((item) => {
      const itemBottom = item.top + item.height;
      return scrollTop >= item.top && scrollTop < itemBottom;
    });

    if (findItem) {
      console.log("找到内容", findItem)
      _scrollingCurrentTabId(findItem._id);
    }
  }, [inClickType, updatedTabs]);


  const RollContent = useMemo(() => {
    //非动态标签页的情况
    if (!data.useDynamicTab) {
      return data.tabs.map((tab, index) => {
        return (
          <View
            key={tab._id}
            id={tab._id}
            style={{
              height: `calc(100% - ${tabsHeight != 0 ? tabsHeight : "44"}px)`
            }}
            className={cx(css.tab_content)}
          >
            {slots[tab._id]?.render?.({
              key: tab._id,
            })}
          </View>
        );
      });
    }
  }, [data.useDynamicTab, data.tabs, slots]);

  const SwitchContent = useMemo(() => {
    //非动态标签页的情况
    if (!data.useDynamicTab) {
      return data.tabs.map((tab, index) => {
        const isActive = currentTabIdRef.current === tab._id;
        return (
          <View
            key={tab._id}
            id={tabpaneId}
            style={{
              height: `calc(100% - ${tabsHeight != 0 ? tabsHeight : "44"}px)`,
              display: isActive ? "block" : "none", // 控制显示和隐藏
            }}
            className={cx(css.tab_content, env.edit && css.minHeight)}
          >
            {slots[tab._id]?.render?.({
              key: tab._id,
            })}
          </View>
        );
      });
    }

    //动态标签页的情况
    if (data.useDynamicTab) {
      return data.tabs.map((tab, index) => {
        const isActive = currentTabIdRef.current === tab._id;
        if (isActive) {
          return (
            <View
              key={tab._id}
              id={tabpaneId}
              style={{
                height: `calc(100% - ${tabsHeight != 0 ? tabsHeight : "44"}px)`,
                display: isActive ? "block" : "none", // 控制显示和隐藏
              }}
              className={cx(css.tab_content, env.edit && css.minHeight)}
            >
              {slots["tabItem"]?.render?.({
                inputValues: {
                  itemData: tab,
                  index: index,
                },
              })}
            </View>
          );
        } else {
          return null;
        }
      });
    }
  }, [data.useDynamicTab, data.tabs, slots]);

  return (
    emptyView || (
      <View className={cx(css.tab_box, "mybricks-tabs")}>
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


        {/* 滚动显示 */}
        {data.contentShowType === ContentShowType.Roll &&
          <ScrollView
            scrollY
            scrollIntoView={innerScrollId}
            onScroll={innerOnScroll}
            style={{ ...scrollStyle }}
          >{RollContent}
          </ScrollView>}

        {/* 切换显示 */}
        {(data.contentShowType === ContentShowType.Switch || !data.contentShowType)&& !data?.hideContent && SwitchContent}
      </View>
    )
  );
}
