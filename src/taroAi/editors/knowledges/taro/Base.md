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

如何引入,例如:`import { View, Text } from '@tarojs/components';`

1. 在为组件设置样式时，尽量不要使用内联样式，而是使用 style 文件进行样式设置。
2. 有非常高的审美造诣，在用户提出配色/颜色选择需求时，你会考虑莫兰迪色系、清新自然系、海洋湖泊系等热门色系。
3. 简单的列表滚动不需要引入 *ScrollView* 组件，直接使用 *View* 组件即可。通过给外层View配置 CSS: overflow-y: scroll; 属性，即可实现滚动。

## @tarojs/taro API能力

注意，引入的时候必须用这个方式: `import * as Taro from '@tarojs/taro';`

1. 可以用来判断当前的环境，如: `Taro.getEnv()` ,可以用来判断当前环境是小程序，还是H5（小程序的枚举值-区分大小写：WEAPP，weapp2「这两个枚举值有一个命中了即是小程序」；H5的枚举值-区分大小写：WEB）

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
      "id":"tab1",
      "title": "标签1"
    },
    {
      "id":"tab2",
      "title": "标签2"
    },
    {
      "id":"tab3",
      "title": "标签3"
    }
  ],
  "activeIndex": 0
}
```

```jsx file="runtime.jsx"
import css from 'style.less';
import { comDef } from 'mybricks';
import { View, Text } from '@tarojs/components';
import { useState } from 'react';
export default comDef(({
  data,
  slots
}) => {
  const [activeIndex, setActiveIndex] = useState(data.activeIndex);
  return (<View className={css.tabContainer}>
    <View className={css.tabs}> 
      {data.tabs.map((tab, index) => <Text key={index} className={`${css.tab} ${activeIndex === index ? css.activeTab : ''}`} onClick={() => {
        setActiveIndex(index);
      }}>    
        {tab.title}
      </Text>)}
    </View>

    {data.tabs.map((tab, index) => {  //必须用这种方式来渲染列表项
      const isActive = index === activeIndex  //判断当前项是否为激活状态
      return (
        <View className={css.tabContent}
              style={{
                display: isActive ? "block" : "none" //如果当前列表项为激活，则显示出来
                }}
        >
        {slots[tab.id]?.render({  //tab内容项必须是插槽，这样用户才可以往里面拖放组件
          key: tab.id
        })}
      </View>
      )
    })}
  </View>)
}, {
  title: 'Tab 组件',
  inputs: [],
  outputs: [],
  slots: [{
    id: 'tab1',
    title: '标签1内容'
  }, {
    id: 'tab2',
    title: '标签2内容'
  }, {
    id: 'tab3',
    title: '标签3内容'
  }]
});

```


2. 开发一个列表，支持触底加载更多

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

3. 开发一个列表，支持上下滚动
> 注意：一般简单的滚动不需要引入 *ScrollView* 组件，直接使用 *View* 组件即可。通过给外层View配置 CSS: overflow-y: scroll; 属性，即可实现滚动。

```less file="style.less"
.listContainer {
  overflow-y: scroll; // 通过这个来使列表可以上下滚动
  width: 100%;
  height: 100%;
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

return (
  <View className={css.listContainer}>
      {data.items.map(item => <View className={css.item} key={item.id}}>
          <Text className={css.title}>{item.title}</Text>
          <Text className={css.description}>{item.description}</Text>
        </View>)}
    </View>
    )
},{
title: '滚动列表',
})

```


4. 开发一个图片上传组件
> 注意：要兼容好小程序和H5不同环境的上传。小程序的上传是通过 *wx.chooseImage* 实现的，H5的上传是通过 *input* 元素实现的。当用户要开发一个图片上传组件时，要完完整整地按照下面的示例，给出全功能的组件（不能只是简单的定义了点击的输出事件，而没有给出图片上传的功能）
> 注意：小程序的文件上传也同理，可以通过 *Taro.chooseMessageFile* 实现

```less file="style.less"
.uploadContainer {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.uploadArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #eee;
  border-radius: 12px;
  padding: 30px 15px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
}

.uploadBtn {
  width: 120px;
  height: 40px;
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  border-radius: 6px;
  margin: 12px 0;
}

.tips {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

.fileList {
  width: 100%;
}

.fileItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 10px;
}

.fileInfo {
  display: flex;
  align-items: center;
}

.fileName {
  font-size: 14px;
  color: #333;
  margin-left: 10px;
}

.deleteBtn {
  color: red;
  font-size: 14px;
}
```

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { View, Text } from '@tarojs/components';
import * as Taro from '@tarojs/taro';
import { useRef, useState } from 'react';
import css from 'style.less';
export default comDef(({
  data,
  env
}) => {
  const inputRef = useRef(null);
  const [fileList, setFileList] = useState(data.files || []);
  const handleUpload = () => {
    if (data.isUploading) return;
    const envType = Taro.getEnv();
    if (envType === 'WEB' || envType === 'H5') {
      // H5环境下触发input点击
      if (inputRef.current) {
        inputRef.current.click();
      }
    } else {
      // 小程序环境
      Taro.chooseImage({
        count: 9,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          handleFiles(res.tempFiles);
        }
      });
    }
  };
  const handleFileChange = e => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file
      }));
      handleFiles(files);
    }
  };
  const handleFiles = files => {
    const validFiles = files.filter(file => {
      if (file.size > data.maxSize * 1024 * 1024) {
        Taro.showToast({
          title: `${file.name}超过大小限制`,
          icon: 'none'
        });
        return false;
      }
      if (!file.type.match('image.*')) {
        Taro.showToast({
          title: `${file.name}格式不支持`,
          icon: 'none'
        });
        return false;
      }
      return true;
    });
    if (validFiles.length > 0) {
      data.isUploading = true;
      setFileList(prev => [...prev, ...validFiles]);
      data.files = [...fileList, ...validFiles];
      setTimeout(() => {
        data.isUploading = false;
      }, 1000);
    }
  };
  const handleDelete = index => {
    const newFiles = [...fileList];
    newFiles.splice(index, 1);
    setFileList(newFiles);
    data.files = newFiles;
  };
  return <View className={css.uploadContainer} data-com-id="_tarojs_components/View/Xct">
      <View className={css.uploadArea} data-com-id="_tarojs_components/View/em6">
        {Taro.getEnv() === 'WEB' || Taro.getEnv() === 'H5' ? <input ref={inputRef} type="file" multiple accept={data.accept} onChange={handleFileChange} style={{
        display: 'none'
      }} /> : null}
        <View className={css.uploadBtn} onClick={handleUpload} data-com-id="_tarojs_components/View/VlN">
          {data.isUploading ? '上传中...' : data.uploadText}
        </View>
        <Text className={css.tips} data-com-id="_tarojs_components/Text/Xzi">{data.tips}</Text>
      </View>
      
      <View className={css.fileList} data-com-id="_tarojs_components/View/NwT">
        {fileList.map((file, index) => <View key={index} className={css.fileItem} data-com-id={"_tarojs_components/View/lRT" + index}>
            <View className={css.fileInfo} data-com-id="_tarojs_components/View/nH9">
              <Text className={css.fileName} data-com-id="_tarojs_components/Text/I3z">
                {file.name}
              </Text>
            </View>
            <Text className={css.deleteBtn} onClick={() => handleDelete(index)} data-com-id="_tarojs_components/Text/HOR">
              删除
            </Text>
          </View>)}
      </View>
    </View>;
}, {
  title: '文件上传组件',
  inputs: [],
  outputs: []
});
```

5. 开发一个翻转卡片
> 实现点击按钮（或做其他操作）后，卡片翻转到背面进行内容的显示
> 
```less file="style.less"
.cardContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cardWrapper {
  flex: 1;
  perspective: 1000px;
}

.card {
  width: 100%;
  height: 104px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.cardFace {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  backface-visibility: hidden;
}

.cardBack {
  transform: rotateY(180deg);
}

.flipped {
  transform: rotateY(180deg);
}

.title {
  font-size: 18px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 12px;
}

.content {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
}

.flipButton {
  margin-top: 2px;
  background-color: #1890ff;
  color: #ffffff;
  border-radius: 8px;
  padding: 12px 0;
  text-align: center;
  font-size: 16px;
}

.cardFace:nth-child(1) {
  height: 91px;
}

.cardFace:nth-child(2) {
  height: 93px;
}
```

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import css from 'style.less';
export default comDef(({
  data
}) => {
  const [isFlipped, setIsFlipped] = useState(data.isFlipped);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    data.isFlipped = !isFlipped;
  };
  return <View className={css.cardContainer}>
      <View className={css.cardWrapper}>
        <View className={`${css.card} ${isFlipped ? css.flipped : ''}`} >
          <View className={css.cardFace}>
            <Text className={css.title}>{data.frontTitle}</Text>
            <Text className={css.content}>{data.frontContent}</Text>
              <View className={css.flipButton} onClick={handleFlip}>  //具体形式不一定是个按钮，请以用户实际需求为准
                <Text>{data.buttonText}</Text>
              </View>
          </View>
          <View className={`${css.cardFace} ${css.cardBack}`}>
            <Text className={css.title}>{data.backTitle}</Text>
            <Text className={css.content}>{data.backContent}</Text>
              <View className={css.flipButton} onClick={handleFlip}>   //具体形式不一定是个按钮，请以用户实际需求为准
                 <Text>{data.buttonText}</Text>
               </View>
          </View>
        </View>
      </View>

    </View>;
}, {
  title: '可翻转卡片',
  inputs: [],
  outputs: [],
  slots: []
});
```


