## 基础饼图示例代码

要点

- 绘制饼图时，数据集中的每一条记录中必须包含一个常量字段（并且必须是字符串类型），用来当作*position*方法的第一个字段，如下面的字段*a*所示：

```json file="model.json"
{"dataSource": [
    { name: '芳华', percent: 0.4, a: '1' },
    { name: '妖猫传', percent: 0.2, a: '1' },
    { name: '机器之血', percent: 0.18, a: '1' },
    { name: '心理罪', percent: 0.15, a: '1' },
    { name: '寻梦环游记', percent: 0.05, a: '1' },
    { name: '其他', percent: 0.02, a: '1' }
  ]
}
```

- 配置*coord*极坐标，关闭*axis*直角坐标
- 为了查看和交互更直观，常常关闭*tooltip*能力，直接地用*legend*来展示百分比数据
- 添加*animate*效果让展示更丝滑

```jsx file="runtime.jsx"
import { comDef } from 'mybricks';
import { useEffect, useState } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import { Pie } from "f2-for-taro";

export default comDef(({ data, env, inputs, outputs, slots }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    chart.clear();

    const map = {
      芳华: '40%',
      妖猫传: '20%',
      机器之血: '18%',
      心理罪: '15%',
      寻梦环游记: '5%',
      其他: '2%'
    };

    chart.source(data.dataSource);

    chart.scale('percent', {
      formatter: function formatter(val) {
        return val * 100 + '%';
      }
    });

    chart.coord('polar', {
      transposed: true,
      radius: 0.85
    });

    chart.axis(false);

    chart.legend({
      position: 'right',
      itemFormatter: function itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });

    chart.tooltip(false);

    chart.interval()
      .position('a*percent')
      .color('name')
      .adjust('stack')
      .style({ // 给每个扇形都增加1px的白线当作间距
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      });

    chart.animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });

    chart.render();
  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart}>
      <Pie env={env} onInit={(ref) => setChart(ref)} />
    </View>
  );
}, {
  type: "main"
  title: "组件",
});
```

```less file="style.less"
.myChart{
  width: 100%;
  height: 100%;
}
.canvas{
  width: 100%;
  height: 100%;
}
```
