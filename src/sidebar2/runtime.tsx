import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View, ScrollView } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import { TreeSelect } from "brickd-mobile";
import { isDesigner } from "../utils/env";
import * as Taro from "@tarojs/taro";

const rowKey = "_itemKey";

function getDefaultCurrTabId(tabs) {
  if (tabs.length > 0) {
    return tabs[0]._id || "";
  }
  return "";
}
interface Tab {
  _id: string;
  tabName: string;
  top?: number;
  height?: number;
}

//侧边栏展示类型
enum ContentShowType {
  Roll = "roll",
  Switch = "switch",
}

//侧边栏标签数据类型
enum SidebarDataType {
  Static = "static",
  Dynamic = "dynamic",
}

//随机数6位
const getRandomId = () => {
  return Math.random().toString(36).slice(-6);
};

export default function ({ data, inputs, outputs, title, slots, env }) {
  const [updatedTabs, setUpdatedTabs] = useState<Tab[]>([]);
  const [topSlotHeight, setTopSlotHeight] = useState(0);
  const [innerScrollId, setInnerScrollId] = useState("");
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [inClickType, setInClickType] = useState(false);
  const [safeAreaHeight, setSafeAreaHeight] = useState(0);
  const [currentTabId, setCurrentTabId] = useState(
    getDefaultCurrTabId(data.tabs)
  );
  const [pxDelta, setPxDelta] = useState(0);
  const [tabNameKey, setTabNameKey] = useState(data.tabNameKey)

  useEffect(() => {
    //TODO 暂时搭建态使用默认 tabKey，防止显示为空；这里更好是直接把默认的列表 tabKey 也修改一下
    if (env.edit) {
      setTabNameKey("tabName")
    } else {
      setTabNameKey(data.tabNameKey)
    }
  }, [data.tabNameKey, env])

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

  useEffect(()=>{
    inputs["getActiveTabId"]?.((_, relOutputs) => {
      relOutputs["activeTabId"]?.({
        id:currentTabId,
        title: data.tabs.find((tab) => tab._id == currentTabId)
          ?.tabName,
        index: data.tabs.findIndex((tab) => tab._id == currentTabId),
      });
    });
  },[currentTabId])

  //动态配置侧边选项
  useMemo(() => {
    inputs["setSidebarData"]?.((val, relOutputs) => {
      data.tabs = val.map((t) => { return { ...t, _id: getRandomId() } })
      setCurrentTabId(data.tabs[0]._id)
      relOutputs["afterSetSidebarData"]?.(val)
    })
  }, [inputs, data])

  //判断是否是真机运行态
  const isRelEnv = () => {
    if (env.runtime.debug || env.edit) {
      return false;
    } else {
      return true;
    }
  };

  //判断是否有tabbar
  const ifHasTabbar = () => {
    if (!isRelEnv()) return false;
    if (env.useTabBar) {
      return true;
    } else {
      return false;
    }
  };


  useEffect(() => {
    //判断data.contentShowType是否为空，如果为空，则默认为roll
    if (!data.contentShowType) {
      data.contentShowType = ContentShowType.Roll;
    }
  }, [data.contentShowType]);

  useEffect(() => {
    //真机运行时，获取侧边栏距离顶部的高度
    if (isRelEnv()) {
      const query = Taro.createSelectorQuery();
      query
        .select("#treeSelect")
        .boundingClientRect()
        .exec((res) => {
          const rect = res[0];
          if (rect) {
            setTopSlotHeight(rect.top);
          }
        });
    }

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

  // 通过setValue来切换条件
  useEffect(() => {
    inputs["activeTabName"]?.((bool, relOutputs) => {
      const item = data.tabs.find((t) => t.tabName === bool);
      if (!item) {
        return;
      }
      _setCurrentTabId(item._id);
    });
  }, [data.useDynamicTab]);

  //真机运行时，计算出每个tab的顶部距离和高度
  useEffect(() => {
    console.log("data.tabs", data.tabs, data.useDynamicTab);
  
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
  }, [data.tabs, data.useDynamicTab]);
  
  

  const _setCurrentTabId = useCallback(
    (currentTabId) => {
      setCurrentTabId(currentTabId);
      const index = data.tabs.findIndex((tab) => tab._id == currentTabId);
      if (index === -1) {
        return;
      }
      const findItem = data.tabs[index];

      //触发标签对应的output
      outputs[`changeTab_${findItem._id}`]?.({
        id: findItem._id,
        title: findItem.tabName,
        index,
      });

      //切换标签事件
      outputs.changeTab?.({
        id: findItem._id,
        title: findItem.tabName,
        index,
      });
    },
    [data.tabs, env.runtime]
  );

  const _scrollToTab = useCallback(
    (currentTabId) => {
      // 设置点击标志，用于判断是否是点击触发的滚动
      setInClickType(true);
      env.runtime && _setCurrentTabId(currentTabId);
      if (ContentShowType.Switch === data.contentShowType) {
        //切换页面显示的时候，需要延迟设置innerScrollId，否则无法滚动置顶页面
        setTimeout(() => {
          env.runtime && setInnerScrollId(currentTabId);
        }, 0);
      } else {
        //滚动显示的时候，innerScrollId必须和上一次不一致，否则scroll不生效，无法滚动到对应位置
        env.runtime && setInnerScrollId("");
        setTimeout(() => {
          env.runtime && setInnerScrollId(currentTabId);
        }, 0);
      }
    },
    [env.runtime,data.contentShowType]
  );

  const emptyView = useMemo(() => {
    if (env.edit && data.tabs.length === 0) {
      return <View className={css.empty}>暂无内容，请配置标签项</View>;
    } else {
      return null;
    }
  }, [env.edit, data.tabs]);

  const treeSelectCx = useMemo(() => {
    return cx({
      [css.treeSelect]: true,
      [css.edit]: isDesigner(env),
    });
  }, [env]);

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
            (windowHeight - topSlotHeight - safeAreaHeight - 54) / pxDelta,
        };
      } else {
        return {
          height: (windowHeight - topSlotHeight) / pxDelta,
        };
      }
    } else {
      //pc端调试态
      return {
        height: "max-content",
      };
    }
  }, [windowHeight, windowWidth, env, topSlotHeight, pxDelta, safeAreaHeight]);

  const innerOnScroll = (e) => {
    if (ContentShowType.Switch === data.contentShowType) {
      return;
    }
    //更新index到侧边栏之前，判断是否是点击触发的滚动；这里主要防止最后一个tab内容高度不足时导致的闪动
    if (inClickType) {
      setInClickType(false);
      return;
    }
    const scrollTop = e.detail.scrollTop;

    const findItem = updatedTabs.find((item) => {
      // 计算tab的底部位置
      const itemBottom = item.top + item.height;
      // 检查滚动位置是否在tab的顶部和底部之间
      return (
        scrollTop + topSlotHeight >= item.top &&
        scrollTop + topSlotHeight < itemBottom
      );
    });
    if (findItem) {
      _setCurrentTabId(findItem._id);
    }
  };

  const RollItems = useMemo(() => {
    //非动态标签的情况
    if (!data.useDynamicTab) {
      return data.tabs.map((tab) => {
        return (
          <View id={tab._id} key={`slot_${tab._id}`}>
            {data.hideContent
              ? null
              : slots[tab._id]?.render?.()}
          </View>
        );
      });
    }
    //动态标签页
    if (data.useDynamicTab) {
      return data.tabs.map((tab, _idx) => {
        return (
          <View id={tab._id} key={`slot_${tab._id}`}
            className=
            {cx({
              ["disabled-area"]: env.edit && _idx > 0,
              [css.disabled_area]: env.edit && _idx > 0
            })}
          >
            {data.hideContent
              ? null
              : slots['tabItem']?.render?.({
                inputValues: {
                  itemData: tab,
                  index: _idx
                },
              })}
          </View>
        );
      });
    }

  }, [data.tabs, data.hideContent, slots, data.useDynamicTab]);

  const SwitchItems = useMemo(() => {
    if (!data.useDynamicTab) {
      return data.tabs.map((tab, _idx) => {
        const isActived = env.edit
          ? tab._id === data.edit.currentTabId
          : tab._id === currentTabId;

        if (isActived) {
          return (
            <View key={`slot_${tab._id}`}>
              {data.hideContent
                ? null
                : slots[tab._id]?.render?.()}
            </View>
          );
        } else {
          return null;
        }
      });
    }
    if (data.useDynamicTab) {
      return data.tabs.map((tab, _idx) => {
        const isActived = env.edit
          ? tab._id === data.edit.currentTabId
          : tab._id === currentTabId;

        if (isActived) {
          return (
            <View key={`slot_${tab._id}`}>
              {data.hideContent
                ? null
                : slots["tabItem"]?.render?.({
                  inputValues: {
                    itemData: tab,
                    index: _idx
                  },
                })}
            </View>
          );
        } else {
          return null;
        }
      });
    }


  }, [
    data.tabs,
    data.hideContent,
    slots,
    env.edit,
    data.edit.currentTabId,
    currentTabId,
    data.useDynamicTab
  ]);

  const tabValue = useMemo(() => {
    if (env.edit) {
      return data.edit.currentTabId || data.tabs[0]._id;
    } else {
      return currentTabId || data.tabs[0]._id;
    }
  }, [env.edit, data.edit.currentTabId, currentTabId]);

  if (emptyView) {
    return emptyView;
  }

  return (
    <View>
      <View className="topSlot">
        {data.useTopSlot && slots["topSlot"]?.render?.()}
      </View>
      <TreeSelect
        className={treeSelectCx}
        tabValue={tabValue}
        onTabChange={_scrollToTab}
        style={scrollStyle}
      >
        {data.tabs.map((tab) => {
          return (
            <TreeSelect.Tab key={tab._id} title={tab[tabNameKey || "tabName"]} value={tab._id}>
              <ScrollView
                scrollY
                scrollIntoView={innerScrollId}
                onScroll={innerOnScroll}
                style={scrollStyle}
              >
                <View>
                  {/* 滚动式显示 */}
                  {data.contentShowType === ContentShowType.Roll && RollItems}

                  {/* 切换显示 */}
                  {data.contentShowType === ContentShowType.Switch && SwitchItems}
                </View>
              </ScrollView>
            </TreeSelect.Tab>
          );
        })}
      </TreeSelect>
    </View>
  );
}
