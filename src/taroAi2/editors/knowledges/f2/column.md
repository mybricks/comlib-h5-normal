## 基础柱状图示例代码
```render
import { comRef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Column } from "f2-for-taro";

export default comRef(({ data, env }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    const data = [{
      year: '1951 年',
      sales: 38
    }, {
      year: '1952 年',
      sales: 52
    }];

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.interval().position('year*sales');
    chart.render();

  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart}>
      <Column env={env} onInit={(ref) => setChart(ref)} />
    </View>
  );
}, {
  type: 'main',
  title: '示例图表'
});
```