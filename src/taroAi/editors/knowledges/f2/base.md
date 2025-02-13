
## f2-for-taro 示例

要点

- 必须引入 @tarojs/components 类库的*View*组件
- 引入*f2-for-taro*对应的图表组件
- 使用*onInit*方法获取图表实例
- 使用图表实例绘制图形

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { useEffect, useState, useRef } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Line } from "f2-for-taro";

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [chart, setChart] = useState(null);

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

    chart.scale('date', {
      min: 0,
      type: 'timeCat',
    });

    chart.scale('value', {
      min: 0,
    });

    chart.line().position('date*value');
    chart.render();

  }, [chart, dataSource]);

  return (
    <View className={css.myChart}>
      <Line env={env} onInit={(ref) => setChart(ref)} />
    </View>
  );
}, {
  type: "main"
  title: "组件",
});
```

```less file="style.less"
.myChart {
  width: 100%;
  height: 100%;
}

.canvas{
  width: 100%;
  height: 100%;
}
```

## f2-for-taro 基础 API 用法

### 数据

数据是绘制一张图表最基本的部分。F2 支持的数据格式及装载数据的方法如下：

```
// 数据
const data = [
  { year: 2010, sales: 40 },
  { year: 2011, sales: 30 },
  { year: 2012, sales: 50 },
  { year: 2013, sales: 60 },
  { year: 2014, sales: 70 },
  { year: 2015, sales: 80 },
  { year: 2016, sales: 80 },
  { year: 2017, sales: 90 },
  { year: 2018, sales: 120 }
];

// 装载数据
chart.source(data);
```

**特殊图表的数据说明**
饼图：绘制饼图时，数据集中的每一条记录中必须包含一个常量字段（并且必须是字符串类型），如下所示：

```
const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.2, a: '1' },
  { name: '机器之血', percent: 0.18, a: '1' },
  { name: '心理罪', percent: 0.15, a: '1' },
  { name: '寻梦环游记', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' }
];
```

区间柱状图：当 x 轴或者 y 轴的数据为数组时，我们默认会将映射为一段区间，进而绘制为区间柱状图。如下数据格式：

```
const data = [
  { x: '分类一', y: [ 76, 100 ] },
  { x: '分类二', y: [ 56, 108 ] },
  { x: '分类三', y: [ 38, 129 ] },
  { x: '分类四', y: [ 58, 155 ] },
  { x: '分类五', y: [ 45, 120 ] },
  { x: '分类六', y: [ 23, 99 ] },
  { x: '分类七', y: [ 18, 56 ] },
  { x: '分类八', y: [ 18, 34 ] },
];
```

股票图：股票图的 Y 轴数据由收盘价、开盘价、最高价和最低价组成，所以在绘制时，需要将 Y 轴对应的数据构造成一个数组（不用进行排序），如下所示：

```
const data = [
  { time: '2015-09-02', range: [ 6.2, 5.99, 6.84, 5.98 ], trend:1 },
  { time: '2015-09-07', range: [ 6.19, 6.2, 6.45, 6.09 ], trend: 0 },
  { time: '2015-09-08', range: [ 6.26, 6.64, 6.7, 6.01 ], trend: 0 },
  { time: '2015-09-09', range: [ 6.76, 6.93, 7.03, 6.65 ], trend: 0 },
  { time: '2015-09-10', range: [ 6.7, 6.86, 7.17, 6.65 ], trend: 0 },
  { time: '2015-09-11', range: [ 6.87, 6.81, 7.01, 6.68 ], trend: 1 }
];
```

### 度量

度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。

根据数据的类型，F2 支持以下几种度量类型：

- identity，常量类型的数值，也就是说数据的某个字段是不变的常量；
- linear，连续的数字 [1, 2, 3, 4, 5]；
- cat，分类, ['男','女']；
- timeCat，时间类型；

在 f2-for-taro 的使用中，我们主要通过列定义操作来接触度量：

```
chart.scale('fieldName', {
  min: 0,
  ticks: [ 0, 50, 100, 150, 200, 300, 500 ],
  alias: 'AQI(空气质量指数)',
  // 各个属性配置
});
```

**通用属性**
| 属性名 | 类型 | 说明 |
|----|----|----|
| type | String | 指定不同的度量类型，支持的 type 为 identity、linear、cat、time、ecat。 |
| formatter | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示。 |
| range | Array | 输出数据的范围，数值类型的默认值为[0, 1]，格式为[min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| alias | String | 该数据字段的显示别名，一般用于将字段的英文名转换成中文名。 |
| tickCount | Number | 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值。 |
| ticks | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |

#### Scale 类型对应的属性

**linear**
| 属性名 | 类型 | 说明 |
|----|----|----|
| nice | Boolean | 默认为 true，用于优化数值范围，使绘制的坐标轴刻度均匀分布。例如原始数据的范围为[3, 97]，如果 nice 为 true，那么就会将数值范围调整为[0, 100]。 |
| min | Number | 定义数值范围的最小值。 |
| max | Number | 定义数值范围的最大值。 |
| tickInterval | Number | 用于指定坐标轴各个标度点之间的间距，是原始数据之间的间距值，tickCount 和 tickInterval 不可以同时声明。 |

**cat**
| 属性名 | 类型 | 说明 |
|----|----|----|
| values | Array | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系。 |
| isRounding | Boolean | 默认值为 false，在计算 ticks 的时候是否允许取整以满足刻度之间的均匀分布，取整后可能会和用户设置的 tickCount 不符合。 |

values 属性常用于 2 个场景：

1. 需要制定分类的顺序时，例如：c 字段有'最大','最小'和'适中'3 种类型，我们想指定这些数值在坐标轴或者图例上的显示顺序时：

```
const defs = {
  c: {
    type: 'cat',
    values: [ '最小','适中','最大' ]
  }
};
```

2. 数据字段中的数据是数值类型，但是需要转换成分类类型，这个时候需要注意原始数据必须是索引值。

```
const data = [
  { month: 0, tem: 7, city: 'Tokyo' },
  { month: 1, tem: 6.9, city: 'Tokyo' },
  { month: 2, tem: 9.5, city: 'Tokyo' },
  { month: 3, tem: 14.5, city: 'Tokyo' },
  { month: 4, tem: 18.2, city: 'Tokyo' },
  { month: 5, tem: 21.5, city: 'Tokyo' },
  { month: 6, tem: 25.2, city: 'Tokyo' }
];

const defs = {
  month: {
    type: 'cat',
    values: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月' ] // 这时候 month 的原始值是索引值
  }
};
```

**timeCat**
时间分类类型，默认会对数据做排序。

| 属性名     | 类型    | 说明                                                                                                                 |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| nice       | Boolean | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据。                              |
| mask       | String  | 数据的格式化格式，默认：'YY - MM - DD'。                                                                             |
| values     | Array   | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系。                                                             |
| isRounding | Boolean | 默认值为 false，在计算 ticks 的时候是否允许取整以满足刻度之间的均匀分布，取整后可能会和用户设置的 tickCount 不符合。 |

注意：mask 和 formatter 这两个属性不可共用，如果同时设置了，会根据 formatter 进行格式化，mask 属性将不生效。

### 坐标轴

axis 坐标轴配置。

```
chart.axis(false)
```

不渲染坐标轴。

```
chart.axis(field, false)
```

关闭 field 对应的坐标轴。
field 代表坐标轴对应的数据字段名。

```
chart.axis(field, config)
```

为 field 对应的坐标轴进行配置。
field 代表坐标轴对应的数据字段名。

config 坐标轴的配置信息，可对坐标轴的各个组成元素进行配置，config 是由以下参数组成的对象：

| 属性        | 类型                 | 使用说明                                                                                                                                                                                                                                      |
| ----------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| line        | Object/null          | 坐标轴的配置信息，设置 null 时不显示，支持所有的 canvas 属性，参考绘图属性，如需调整显示层级，可设置 top: true 展示在最上层图形或者 top: false 展示在最下层图形。                                                                             |
| labelOffset | Number               | 坐标轴文本距离                                                                                                                                                                                                                                |
| grid        | Object/Function/null | 坐标轴网格线的样式配置，设置 null 时不显示，支持所有的 canvas 属性，参考绘图属性，支持回调函数，另外在极坐标下，可以通过配置 type: 'arc'将其绘制为圆弧；如需调整显示层级，可设置 top: true 展示在最上层图形或者 top: false 展示在最下层图形。 |
| tickLine    | Object/null          | 坐标轴刻度线的配置项，设置 null 时不显示，支持所有的 canvas 属性，参考绘图属性，支持回调函数，如需调整显示层级，可设置 top: true 展示在最上层图形或者 top: false 展示在最下层图形。                                                           |
| label       | Object/Function/null | 坐标轴文本配置，设置 null 时不显示，支持所有的 canvas 属性，参考绘图属性，支持回调函数，如需调整显示层级，可设置 top: true 展示在最上层图形或者 top: false 展示在最下层图形。                                                                 |
| position    | String               | 坐标轴显示位置，x 轴默认位于底部'bottom'，y 轴可设置 position 为'left'、'right'                                                                                                                                                               |

注意: grid 和 label 为回调函数时，返回值必须是对象。
