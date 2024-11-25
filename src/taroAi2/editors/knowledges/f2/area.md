## 基础面积图示例代码

```render
import { comRef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Area } from "f2-for-taro";

export default comRef(({ data, env }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    chart.clear();

    const data = [{
      time: 'Jan.',
      tem: 1000
    }, {
      time: 'Feb.',
      tem: 2200
    }, {
      time: 'Mar.',
      tem: 2000
    }];

    chart.source(data);
    chart.area().position('time*tem');
    chart.line().position('time*tem');
    chart.render();

  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart}>
      <Area env={env} onInit={(ref) => setChart(ref)} />
    </View>
  );
}, {
  type: 'main',
  title: '面积图'
});
```

```style
.canvas{
  width: 100%;
  height: 100%;
}
```
