## 基雷达图示例代码
```render
import { comRef } from 'mybricks';
import { useEffect } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import useF2, { Radar } from "useF2";

export default comRef(({ data, env }) => {
  const { chart, Canvas, events, ...props } = useF2(env);

  useEffect(() => {
    if (!chart) {
      return;
    }

    chart.clear();

    const data = [{
      item: 'Design',
      user: '用户 A',
      score: 70
    }, {
      item: 'Design',
      user: '用户 B',
      score: 30
    }, {
      item: 'Development',
      user: '用户 A',
      score: 60
    }, {
      item: 'Development',
      user: '用户 B',
      score: 70
    }, {
      item: 'Marketing',
      user: '用户 A',
      score: 50
    }, {
      item: 'Marketing',
      user: '用户 B',
      score: 60
    }, {
      item: 'Users',
      user: '用户 A',
      score: 40
    }, {
      item: 'Users',
      user: '用户 B',
      score: 50
    }, {
      item: 'Test',
      user: '用户 A',
      score: 60
    }, {
      item: 'Test',
      user: '用户 B',
      score: 70
    }, {
      item: 'Language',
      user: '用户 A',
      score: 70
    }, {
      item: 'Language',
      user: '用户 B',
      score: 50
    }, {
      item: 'Technology',
      user: '用户 A',
      score: 70
    }, {
      item: 'Technology',
      user: '用户 B',
      score: 40
    }, {
      item: 'Support',
      user: '用户 A',
      score: 60
    }, {
      item: 'Support',
      user: '用户 B',
      score: 40
    }];
 
    chart.coord('polar');
    chart.source(data, {
      score: {
        min: 0,
        max: 120,
        nice: false,
        tickCount: 4
      }
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.forEach(function(item) {
          map[item.name] = item;
        });
        tooltipItems.forEach(function(item) {
          const name = item.name;
          const value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(Object.values(map));
      },
      onHide: function onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    chart.axis('score', {
      label: function label(text, index, total) {
        if (index === total - 1) {
          return null;
        }
        return {
          top: true
        };
      },
      grid: {
        lineDash: null,
        type: 'arc' // 弧线网格
      }
    });
    chart.axis('item', {
      grid: {
        lineDash: null
      }
    });
    chart.line().position('item*score').color('user');
    chart.point().position('item*score').color('user')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.render();

  }, [chart, data.dataSource]);

  return (
    <View className={css.myChart} {...events}>
      <Canvas className={css.canvas} {...props} />
    </View>
  );
}, {
  type: 'main',
  title: '示例图表'
});
```

```style
.canvas{
  width: 100%;
  height: 100%;
}
```