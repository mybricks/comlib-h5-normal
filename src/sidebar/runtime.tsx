import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View, ScrollView } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import { TreeSelect } from "brickd-mobile";
import { isDesigner } from "../utils/env";
import * as Taro from "@tarojs/taro";

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

  //判断data.contentShowType是否为空，如果为空，则默认为roll
  useEffect(() => {
    if (!data.contentShowType) {
      data.contentShowType = ContentShowType.Roll;
    }
  }, [data]);

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
        console.log("Taro.getSystemInfo", res);
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
  }, []);

  //真机运行时，计算出每个tab的顶部距离和高度
  useEffect(() => {
    const updateTabsData = async () => {
      const promises = data.tabs.map(
        (item) =>
          new Promise((resolve) => {
            const query = Taro.createSelectorQuery();
            query
              .select(`#${item._id}`)
              .boundingClientRect()
              .exec((res) => {
                const { top, height } = res[0];
                resolve({ ...item, top, height }); // 将原始的item对象和新的top属性结合起来
              });
          })
      );

      const results = await Promise.all(promises);
      setUpdatedTabs(results);
    };

    if (isRelEnv()) {
      updateTabsData();
    }
  }, [data.tabs]);

  const _setCurrentTabId = useCallback((currentTabId) => {
    setCurrentTabId(currentTabId);
    const index = data.tabs.findIndex((tab) => tab._id == currentTabId);
    if (index === -1) {
      return;
    }
    const findItem = data.tabs[index];
    outputs.changeTab?.({
      id: findItem._id,
      title: findItem.tabName,
      index,
    });
  }, []);

  const _scrollToTab = useCallback((currentTabId) => {
    // 设置点击标志，用于判断是否是点击触发的滚动
    setInClickType(true);
    _setCurrentTabId(currentTabId);

    if (ContentShowType.Switch === data.contentShowType) {
      //切换页面显示的时候，需要延迟设置innerScrollId，否则无法滚动置顶页面
      setTimeout(() => {
        setInnerScrollId(currentTabId);
      }, 0);
    } else {
      //滚动显示的时候，innerScrollId必须和上一次不一致，否则scroll不生效，无法滚动到对应位置
      setInnerScrollId("");
      setTimeout(() => {
        setInnerScrollId(currentTabId);
      }, 0);
    }
  }, [env.edit]);

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

  return (
    emptyView || (
      <View>
        <View id="topSlot">
          {data.useTopSlot && slots["topSlot"]?.render?.()}
        </View>
        <TreeSelect
          id="treeSelect"
          className={treeSelectCx}
          tabValue={
            env.edit
              ? data.edit.currentTabId
                ? data.edit.currentTabId
                : data.tabs[0]._id
              : currentTabId
          }
          onTabChange={_scrollToTab}
          style={scrollStyle}
        >
          {data.tabs.map((tab) => {
            return (
              <TreeSelect.Tab key={tab._id} title={tab.tabName} value={tab._id}>
                <ScrollView
                  scrollY
                  scrollIntoView={innerScrollId}
                  onScroll={innerOnScroll}
                  style={scrollStyle}
                >
                  <View>
                    {/* 滚动式显示 */}
                    {data.contentShowType === ContentShowType.Roll &&
                      data.tabs.map((tab) => {
                        return (
                          <>
                            <View id={tab._id} key={`slot_${tab._id}`}>
                              {data.hideContent
                                ? null
                                : slots[tab._id]?.render?.({
                                    inputValues: {
                                      itemData: tab,
                                    },
                                  })}
                            </View>
                          </>
                        );
                      })}

                    {/* 切换显示 */}
                    {data.contentShowType === ContentShowType.Switch &&
                      data.tabs.map((tab) => {
                        return (
                          <View
                            id={tab._id}
                            key={`slot_${tab._id}`}
                            style={{
                              display:
                                tab._id === currentTabId ? "block" : "none",
                            }}
                          >
                            {data.hideContent
                              ? null
                              : slots[tab._id]?.render?.({
                                  inputValues: {
                                    itemData: tab,
                                  },
                                })}
                          </View>
                        );
                      })}
                  </View>
                </ScrollView>
              </TreeSelect.Tab>
            );
          })}
        </TreeSelect>
      </View>
    )
  );
}
