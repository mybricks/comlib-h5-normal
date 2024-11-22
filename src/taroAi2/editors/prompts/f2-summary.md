# 类库 useF2

useF2 是一个基于@antv/f2 的封装库，可以更方便地在 React 项目中使用@antv/f2。

- 擅长处理数据可视化需求，可以把用户的业务需求转化成合适、漂亮的图表。
- 解各类行业数据，能通过用户给出的业务需求和图表类型来模拟数据。
- 依赖库：@antv/f2 的 3.8.12 版本

## useF2 组件摘要

- 折线图（Line）：用于展现数据随时间或有序类别的变化趋势，通过点和线的连接，清晰地展示数据的上升、下降或平稳趋势，包含折线图、对比折线图。
- 面积图（Area）：适用于展示数据的累积变化情况，类似于折线图，但通过填充线下的区域来强调总量的变化，包含面积图、堆叠面积图。
- 柱状图（Column）：一系列垂直的柱状图形，适用于比较不同类别之间的数值大小，通常用于展示离散数据，包含柱状图、堆叠柱状图、分组柱状图。
- 条形图（Bar）：柱状图的变体，通常用于显示类别较多或类别名称较长的数据。条形图的条形是水平排列的，便于在有限的垂直空间内展示信息。
- 饼图（Pie）：适用于展示各部分占总体的比例关系，包含饼图、环形图、扇形图、南丁格尔图、玫瑰图。
- 雷达图（Radar）：常常用来展示多维度的数据对比情况，包含雷达图、圆形雷达图。
- 漏斗图（Funnel）：用于展示数据的层级关系和转化过程中的流失率，包含漏斗图。
- 热力图（Heatmap）：通过颜色变化展示数据的密集度和分布，包含热力图、日历热力图、地图热力图。

## useF2 注意事项

- 引用 useF2 时，import 代码中除了要引入`useF2`之外，也一定要引入所使用的图表类型，比如`import useF2, { Line, Pie } from 'useF2'`则代表引入了 Line、Pie 两种类型的图表。
- 使用 useF2 时，必须引入@tarojs/components 类库的*View*组件。
- 使用 useF2 时，代码可参考`const { chart, Canvas, events, ...props } = useF2(env);` 特别注意：useF2 函数的 env 参数是必须的，不可省略。

## useF2 示例

```render
import { comRef } from 'mybricks';
import { useEffect } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components"; // 特别注意：必须引入 @tarojs/components 类库的*View*组件
import useF2, { Line } from "useF2";

export default comRef(({ data, env }) => {
  const { chart, Canvas, events, ...props } = useF2(env); // 特别注意：useF2函数的env参数是必须的，不可省略

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
    <View className={css.myChart} {...events}>
      <Canvas className={css.canvas} {...props} />
    </View>
  );
}, {
  type: 'main',
  title: '折线图'
});
```

```style
.myChart {
  width: 100%;
  height: 100%;
}

.canvas{
  width: 100%;
  height: 100%;
}
```

## API 
