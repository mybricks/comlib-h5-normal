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


1. 开发一个列表，支持触底加载更多

```less file="style.less"
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.description {
  font-size: 14px;
  color: #666;
}

.loading {
  text-align: center;
  padding: 10px;
  color: #999;
}


```

```json file="model.json"
{
  "items": [
    {
      "id": "1",
      "title": "列表项1",
      "description": "描述1"
    },
    {
      "id": "2",
      "title": "列表项2",
      "description": "描述2"
    },
    {
      "id": "3",
      "title": "列表项3",
      "description": "描述3"
    }
  ],
  "isLoading": false
}
```

```jsx file="runtime.jsx"
import css from 'style.less';
import { comDef } from 'mybricks';
import { View, Text } from '@tarojs/components';
import { useEffect, useCallback, useMemo } from 'react';

export default comDef(({
  env,
  data,
  inputs,
  outputs
}) => {
  // 加载更多逻辑
  const loadMore = useCallback(() => {
    if (!data.isLoading) { //这个是必须要的。当组件加载中的状态，不可触发加载更多。不然会多次重复触发。
      data.isLoading = true; // 进入loading状态
      outputs['loadMore']();
    }
  }, [data.enableLoadMore, data.isLoading, outputs]);

  // 监听触底事件，每次用户提及要触底加载更多时，必须按照下面这个函数的范式进行识别。其他自由发挥的不生效。
  useEffect(() => {
    const offset = 50; // 预触底偏移值
    const checkScroll = () => {
      env?.rootScroll?.getBoundingClientRect?.().then(({
        height
      }) => {
        const clientHeight = height || 750;
        env?.rootScroll?.onScroll?.(({
          detail
        }) => {
          const {
            scrollTop,
            scrollHeight
          } = detail;
          if (scrollTop + clientHeight + offset > scrollHeight) {
            loadMore();
          }
        });
      });
    };
    checkScroll();
  }, [loadMore, env]);

  // 监听输入项「初始化数据源」
  useMemo(() => {
    inputs['initData'](initialItems => {
      if (initialItems && Array.isArray(initialItems)) {
        data.items = initialItems; // 初始化数据
      }
    });
  }, [inputs, data]);

  // 监听输入项「追加数据」
  useMemo(() => {
    inputs['appendData']((newItems, outputRels) => {
      if (newItems && Array.isArray(newItems)) {
        data.items = [...data.items, ...newItems]; // 追加新数据
        data.isLoading = false; // 退出loading状态
        outputRels?.['appendDataDone'](newItems);
      }
    });
  }, [inputs, data]);


  return <View className={css.listContainer}>
      {data.items.map(item => <View className={css.item} key={item.id}}>
          <Text className={css.title}>
            {item.title}
          </Text>
          <Text className={css.description}>
            {item.description}
          </Text>
        </View>)}
         {data.isLoading && <View className={css.loading}>
          <Text>加载中...</Text>
        </View>}
    </View>;
}, {
  title: '列表',
  inputs: [{
    id: 'initData',
    title: '初始化数据源',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          description: {
            type: 'string'
          }
        }
      }
    },
    rels: ["initDataDone"]
  },{
    id: 'appendData',
    title: '追加数据',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          description: {
            type: 'string'
          }
        }
      }
    },
    rels: ["appendDataDone"]
  }],
  outputs: [{
    id: 'loadMore',
    title: '加载更多',
    schema: {
      type: 'void'
    }
  },{
    id: 'initDataDone',
    title: '初始化数据完成',
    schema: {
      type: 'void'
    }
  },{
    id: 'appendDataDone',
    title: '追加数据完成',
    schema: {
      type: 'void'
    }
  }]
});
```
