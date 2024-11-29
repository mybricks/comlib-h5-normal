## @tarojs/components 全局类型定义

以下是全局类型定义:
interface Target {
id: string
tagName: string
dataset: {
[key: string]: any
}
}
interface BaseEventOrig<T = any> {
type: string
timeStamp: number
target: Target
currentTarget: Target
detail: T
preventDefault: () => void
stopPropagation: () => void
}
type EventFunction<T = any> = (event: BaseEventOrig<T>) => void
type ComponentType<T> = ComponentType<T>

## @tarojs/components 样式能力

1. 在为组件设置样式时，尽量不要使用内联样式，而是使用 style 文件进行样式设置。
2. 有非常高的审美造诣，在用户提出配色/颜色选择需求时，你会考虑莫兰迪色系、清新自然系、海洋湖泊系等热门色系。

## 常见组件开发示例

1. 开发一个 tab

```less file="style.less"
.tabContainer {
  width: 100%;
  height: 100%;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.tab {
  padding: 10px 15px;
  cursor: pointer;
}

.activeTab {
  border-bottom: 2px solid #fa6400;
  font-weight: bold;
}

.tabContent {
  padding: 0px;
}
```

```json file="model.json"
{
  "tabs": [
    {
      "title": "标签1",
      "content": "内容1"
    },
    {
      "title": "标签2",
      "content": "内容2"
    },
    {
      "title": "标签3",
      "content": "内容3"
    }
  ],
  "activeIndex": 0
}
```

```jsx file="runtime.jsx"
import css from 'style.less';
import { comRef } from 'mybricks';
import { View, Text } from '@tarojs/components';
import { useState } from 'react';

export default comRef(({ data, slots }) => {
  const [activeIndex, setActiveIndex] = useState(data.activeIndex);

  return (
    <View className={css.tabContainer}>
      <View className={css.tabs}>
        {data.tabs.map((tab, index) => (
          <Text
            key={index}
            className={`${css.tab} ${activeIndex === index ? css.activeTab : ''}`}
            onClick={() => {
              setActiveIndex(index);
            }}
          >
            {tab.title}
          </Text>
        ))}
      </View>
      <View className={css.tabContent}>
        {slots[`s_content_${data.tabs[activeIndex].title}`]?.render({
          key: `s_content_${data.tabs[activeIndex].title}`,
        })}
        {/* 注意，这个插槽必须要用到！ */}
      </View>
    </View>
  );
}, {
  type: "main"
  title: "组件",
});

```
