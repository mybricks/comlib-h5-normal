## 基础面积图示例代码

```render
import { comRef } from 'mybricks';
import { useEffect } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import useF2, { Area } from "useF2";

export default comRef(({ data, env }) => {
  const { chart, Canvas, ...props } = useF2(env);

  useEffect(() => {
    if (!chart) {
      return;
    }

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
      <Canvas className={css.canvas} {...props} />
    </View>
  );
}, {
  type: 'main',
  title: '示例图表'
});
```
