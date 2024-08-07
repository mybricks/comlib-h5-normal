import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "@tarojs/components";
import css from "./style.less";

export default function ({ env, data, slots, inputs, outputs }) {
  const [innputId, setInputId] = useState(data.defaultActiveId);
  const [bool, setBool] = useState();

  const comRef = useRef(null);
  const conditionRef = useRef(null);

  const artboard = useMemo(() => {
    let canvasElement = env.canvasElement; //
    let artboard = canvasElement.querySelector(
      `div[data-mybricks-artboard=${env.canvas.id}]`
    );
    return artboard;
  }, []);

  useEffect(() => {
    // artboard 是一个 dom
    // 期望在这个 dom 下面找到 comRef 这个 dom
    // 并且在这个dom 的右边水平位置，添加一个按钮

    if (!artboard) {
      return;
    }

    const comDom = comRef.current;
    const btn = document.createElement("button");
    btn.innerText = "点击";
    btn.onclick = () => {
      console.log("点击");
    };
    artboard.appendChild(btn);

    const rect = comDom.getBoundingClientRect();
    const artboardRect = artboard.getBoundingClientRect();

    const left = rect.left - artboardRect.left;
    const top = rect.top - artboardRect.top;
    btn.style.position = "fixed";
    btn.style.left = left + "px";
    btn.style.top = top + "px";

    return () => {
      artboard.removeChild(btn);
    };
  }, [artboard]);

  const activeId = useMemo(() => {
    if (env.edit) {
      return data._editSelectId_ ?? data.items?.[0]?.id;
    }
    return innputId;
  }, [data.items, data._editSelectId_, innputId]);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    // 通过setValue来切换条件
    inputs["setValue"]?.((bool, relOutputs) => {
      const item = data.items.find((t) => t.title === bool);
      if (!item) {
        return;
      }
      setInputId(item.id);
      setBool(bool);
      relOutputs["setValueDone"]?.(bool);
    });

    //通过连线来切换条件
    data.items.forEach((item) => {
      inputs[item.id]?.((bool, relOutputs) => {
        if (item.id === activeId) {
          slots[item.id]?.inputs["itemData"]?.(bool);
          setBool(bool);
          relOutputs["changeDone"]?.(bool);
          return;
        }

        setInputId(item.id);
        setBool(bool);
        relOutputs["changeDone"]?.(bool);
      });
    });
  }, [data.items, activeId]);

  const renderMode = useMemo(() => {
    if (env.edit) {
      return "lazy"; // 其他模式容易让设计器拿不到真实的widthFact heightFact，所以搭建态不能切换
    }
    return data.renderMode ?? "lazy";
  }, [data.renderMode]);

  return (
    <View className={css.condition} ref={comRef}>
      <View className={css.switch} ref={conditionRef}>点击</View>

      {data.items.map((item) => {
        if (activeId !== item.id) {
          return null;
        }
        return (
          <View className={css.content} key={`${renderMode}${item.id}`}>
            {slots[item.id]?.render({
                key:item.id
            })}
          </View>
        );
      })}
    </View>
  );
}
