# 类库 @tarojs/components
@tarojs/components 是一个可以支持多端渲染的基础UI组件库。

## @tarojs/components 组件摘要
- Text(文本),
- View(视图,加上点击事件后也可以用来模拟出一个按钮),
- Image(图片),
- Label(展示标签、标题,点击标题触发控件的点击，用来改进表单组件的可用性),
- Picker(从底部弹起的滚动选择器,包含普通、多列、时间、日期、省市区选择器),
- Button(按钮,带有openType类型的按钮优先考虑使用),
- Checkbox(多选框),
- CheckboxGroup(多选框组),
- Editor(富文本编辑器),
- Form(表单、表单容器,所有表单的开发都需要使用),
- Input(输入框),
- Progress(进度条),
- RichText(富文本),
- RootPortal(脱离dom树,用于制作弹窗、弹出层，当用户要求制作一个弹窗时，必须使用这个组件),
- ScrollView(可滚动视图区域),
- Swiper(轮播图),
- SwiperItem(轮播图项),
- Radio(单选框),
- RadioGroup(单选框组),
- Slider(滑动选择器、滑块),
- Switch(开关),
- Textarea(多行输入框),
- Video(视频),
- WebView(配置网址,嵌入显示网页).

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


## @tarojs/components 注意事项
- 任何需求（包括其它类库）的需求，必须引入*View*组件。
- 对于简单的按钮需求（不包含openType属性的按钮等），都必须用*View*组件开发,以获得更好的视觉体验以及更灵活的样式。

## @tarojs/components 样式能力
1. 在为组件设置样式时，尽量不要使用内联样式，而是使用style文件进行样式设置。
2. 有非常高的审美造诣，在用户提出配色/颜色选择需求时，你会考虑莫兰迪色系、清新自然系、海洋湖泊系等热门色系。

## 常见组件开发示例
1. 开发一个tab

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
    border-bottom: 2px solid #FA6400;
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
