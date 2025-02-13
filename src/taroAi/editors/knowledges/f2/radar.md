## 基础雷达图示例代码
场景：绘制一条带点的线，展示多维度的数据效果。
要点：
- 使用*coord*极坐标。
- 使用*line*和*point*方法绘制点和线。
- 提供*5项及以上*的数据，用于展示多维效果。

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Radar } from "f2-for-taro";

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    const data = [
      {
        item: 'Design',
        score: 70
      },
      {
        item: 'Development',
        score: 60
      },
    ]; // 数据项建议5个及以上

    chart.coord('polar');
    chart.source(data);

    chart.line().position('item*score')
    chart.point().position('item*score')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.render();

  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart}>
      <Radar env={env} onInit={(ref) => setChart(ref)} />
    </View>
  );
}, {
  type: "main"
  title: "组件",
});
```

```less file="style.less"
.canvas{
  width: 100%;
  height: 100%;
}
```