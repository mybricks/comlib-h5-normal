import html2nodes from "./Parser";
import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import css from "./index.less";
import Taro from "@tarojs/taro";
import { View, Text, Image, RichText, ImageProps } from "@tarojs/components";
import SkeletonImage from "./../skeleton-image";
import { isH5 } from "../../utils/env";

function styleStringToCSSProperties(styleString) {
  if (typeof styleString !== "string") {
    return {};
  }
  const styleArray = styleString.split(";");
  const cssProperties = {};
  for (let i = 0; i < styleArray.length; i++) {
    const style = styleArray[i].split(":");
    if (style.length === 2) {
      let key = style[0].trim();
      
      key = key.replace(/-(\w)/g, function (all, letter) {
        return letter.toUpperCase();
      });

      const value = style[1].trim();
      cssProperties[key] = value;
    }
  }

  return cssProperties;
}

const Element = ({ item }) => {
  const handlePreviewImage = (src) => {
    if (!src) {
      return;
    }
    Taro.previewImage({
      current: src,
      urls: [src],
    });
  };

  if (item.name === "br") {
    return <View style={{ width: "100%" }} />;
  }

  if (item.name === "img") {
    const { style, src } = item?.attrs ?? {};
    const cssStyle = styleStringToCSSProperties(style);
    const mode =
      !cssStyle?.height || cssStyle?.height === "auto"
        ? "widthFix"
        : "scaleToFill";
    return (
      <SkeletonImage
        skeleton
        src={src}
        style={cssStyle}
        showMenuByLongpress
        onClick={() => handlePreviewImage(src)}
        mode={mode}
      />
    );
  }

  if (item.type === "text") {
    if (!item.decode) {
      const cssStyle = styleStringToCSSProperties(item?.attrs?.style);
      return (
        <Text decode style={cssStyle}>
          {item.text}
        </Text>
      );
    }

    return <RichText style={{ display: "inline-block" }} nodes={[item]} />;
  }

  return <RichText style={{ display: "inline-block" }} nodes={[item]} />;
};

const Level = ({ node }) => {
  // if (!node.continue || node.name == 'a') {
  //   return <Element item={node} />
  // }

  if (!Array.isArray(node.children) || node.children.length === 0) {
    return <Element item={node} />;
  }

  return (
    <View
      className={node.name}
      style={styleStringToCSSProperties(node?.attrs?.style)}
    >
      {node.children.map((item) => {
        return <Level node={item} />;
      })}
    </View>
  );
};

export default ({
  className,
  content,
  selectable = true,
  imageMenuPrevent = true,
  imagePreview = true,
}) => {
  const [root, setRoot] = useState({ children: [] });
  const [controls, setControls] = useState({});

  useEffect(() => {
    html2nodes(content, {}).then((res) => {
      setRoot({ children: res.nodes });
    });
  }, [content]);

  return (
    <View className={`${css.richText} ${className}`}>
      {isH5() ? (
        <RichText
          className={"taro_html"}
          selectable={true}
          nodes={content}
          preview={"true"}
        />
      ) : (
        <Level node={root} />
      )}
    </View>
  );
};
