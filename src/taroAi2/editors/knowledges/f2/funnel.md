## 基漏斗图示例代码
```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Funnel } from "f2-for-taro";

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    chart.clear();

    const data = [
      { action: '浏览网站', pv: 50000, percent: 1 },
      { action: '放入购物车', pv: 35000, percent: 0.7 },
      { action: '生成订单', pv: 25000, percent: 0.5 },
      { action: '支付订单', pv: 15000, percent: 0.3 },
      { action: '完成交易', pv: 8000, percent: 0.16 }
    ];

    chart.source(data);
    chart.axis(false);
    chart.coord({
      transposed: true,
      // 旋转向下
      scale: [ 1, -1 ]
    });
    chart.legend(true);
    chart.intervalLabel({
      offsetX: 10,
      label: (data, color) => {
        return {
          text: data.action,
          fill: color
        };
      },
      guide: data => {
        return {
          text: (data.percent * 100).toFixed(0) + '%',
          fill: '#fff'
        };
      }
    });


    chart.interval()
      .position('action*percent')
      .color('action', [ '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF' ])
      .adjust('symmetric')
      .shape('funnel');
    chart.render();


  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart}>
      <Funnel env={env} onInit={(ref) => setChart(ref)} />
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