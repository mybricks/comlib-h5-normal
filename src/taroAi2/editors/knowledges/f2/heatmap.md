## 基础热力图示例代码
```render
import { comRef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Heatmap } from "f2-for-taro";

export default comRef(({ data, env }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    const data = [
      [ 0, 0, 10 ],
      [ 0, 1, 19 ],
      [ 0, 2, 8 ],
      [ 0, 3, 24 ],
      [ 0, 4, 67 ],
    ];
    const source = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const obj = {};
      obj.name = item[0];
      obj.day = item[1];
      obj.sales = item[2];
      source.push(obj);
    }
   
    chart.source(source, {
      name: {
        type: 'cat',
        values: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ]
      },
      day: {
        type: 'cat',
        values: [ 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.' ]
      }
    });

    chart.polygon()
      .position('name*day')
      .color('sales', '#BAE7FF-#1890FF-#0050B3')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      })
      .animate({
        appear: {
          animation: 'fadeIn',
          duration: 800
        }
      });
    chart.render();


  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart}>
      <Heatmap env={env} onInit={(ref) => setChart(ref)} />
    </View>
  );
}, {
  type: 'main',
  title: '基础热力图'
});
```

```style
.canvas{
  width: 100%;
  height: 100%;
}
```