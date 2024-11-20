# 类库 useF2

useF2 是一个基于@antv/f2 的封装库，可以更方便地在 React 项目中使用@antv/f2。

- 擅长处理数据可视化需求，可以把用户的业务需求转化成合适、漂亮的图表。
- 解各类行业数据，能通过用户给出的业务需求和图表类型来模拟数据。
- 依赖库：@antv/f2 的 3.8.12 版本

## useF2 组件摘要

- 折线图（line）：用于展现数据随时间或有序类别的变化趋势。
- 面积图（area）：用于展现数据随时间或有序类别的变化趋势。
- 柱状图（interval1）：适合比较不同类别的数据量。
- 条形图（interval2）：适合比较不同类别的数据量。
- 饼图（pie）：适用于展示各部分占总体的比例关系，包含饼图、环形图、扇形图、南丁格尔图、玫瑰图。
- 雷达图（radar）：常常用来展示多维度的数据对比情况，包含雷达图、圆形雷达图。
- 漏斗图（funnel）：用于展示数据的层级关系和转化过程中的流失率，包含漏斗图。
- 热力图（polygon）：通过颜色变化展示数据的密集度和分布，包含热力图、日历热力图、地图热力图。

## useF2 注意事项
- ```const { chart, Canvas, ...props } = useF2(env);``` 特别注意：useF2函数的env参数是必须的，不可省略
- 如果需要对 Canvas 进行尺寸调整，需要同时设置内联、外联样式，并且尽量给到 Canvas 一个默认的尺寸，比如{width: "100%", height: "100%"}。

## useF2 示例

```render
import { comRef } from 'mybricks';
import { useEffect } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import useF2 from "useF2";

export default comRef(({ data, env }) => {
  const { chart, Canvas, ...props } = useF2(env); // 特别注意：useF2函数的env参数是必须的，不可省略

  const dataSource = [{
    date: '2017-06-05',
    value: 116
  }, {
    date: '2017-06-06',
    value: 129
  }];

  useEffect(() => {
    if (!chart) {
      return;
    }

    chart.clear();

    chart.source(dataSource);

    chart.line().position('date*value');
    chart.render();

  }, [chart, dataSource]);

  return (
    <View className={css.myChart}>
      <Canvas {...props} />
    </View>
  );
}, {
  type: 'main',
  title: '折线图'
});
```