## 基础折线图示例代码

要点

- 使用*line*方法来绘制折线。
- 针对移动端屏幕，配置较小的*tickCount*时文字不会挤在一起。

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Line } from "f2-for-taro";

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    chart.clear();

    const data = [{
      date: '2017-06-05',
      value: 116
    }, {
      date: '2017-06-06',
      value: 129
    }, {
      date: '2017-06-07',
      value: 135
    }];

    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0
      },
      date: {
        type: 'timeCat',
        range: [ 0, 1 ],
        tickCount: 3 // 日期太长，只展示三个
      }
    });

    chart.line().position('date*value');
    chart.render();

  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart}>
      <Line env={env} onInit={(ref) => setChart(ref)} />
    </View>
  );
}, {
  type: 'main',
  title: '基础折线图'
});
```

## 对比折线图示例代码

场景：常常在多条数据做对比时使用。
要点：

- 多条对比数据最终都汇总到一个数组里，用不同的*维度*指标作区分，比如下方代码就用*type*区分不同维度的线。

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Line } from "f2-for-taro";

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    const data = [
      {
        date: '2017-06-05',
        type: '预期收益率',
        value: 100
      }, {
        date: '2017-06-05',
        type: '实际收益率',
        value: 116
      }, {
        date: '2017-06-06',
        type: '预期收益率',
        value: 129
      }, {
        date: '2017-06-06',
        type: '实际收益率',
        value: 135
      }
    ];

    chart.source(data, {
      value: {
        min: 0 // y轴从0开始绘制
      },
      date: {
        type: 'timeCat',
        range: [0, 1],
        tickCount: 3
      }
    });
    chart.line()
      .position('date*value')
      .color('type'); // 用type作为维度来绘制不同的线
    chart.render();

  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart}>
      <Line env={env} onInit={(ref) => setChart(ref)} />
    </View>
  );
}, {
  type: 'main',
  title: '对比折线图'
});
```

```less file="style.less"
.canvas{
  width: 100%;
  height: 100%;
}
```

## 折线图支持横滑、平移展示更多数据示例代码
场景：常常在数据较多，屏幕无法完整展示所有数据时使用。
要点
- 使用 ```chart.interaction('pan')``` 插件实现，而不是使用```ScrollView```

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Line } from "f2-for-taro";

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    chart.clear();

    const data = [{
      date: '2017-06-05',
      value: 116
    }, {
      date: '2017-06-06',
      value: 129
    }, {
      date: '2017-06-07',
      value: 135
    }];

    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0
      },
      date: {
        type: 'timeCat',
        range: [ 0, 1 ],
        tickCount: 3
      }
    });

    chart.interaction('pan');
    // 定义进度条
    chart.scrollBar({
      mode: 'x',
      xStyle: {
        offsetY: -5
      }
    });

    chart.line().position('date*value');
    chart.render();
  }, [chart, data.dataSource]);

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
