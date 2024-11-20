## 基础饼图示例代码
```render
import { comRef } from 'mybricks';
import { useEffect } from 'react';
import css from 'style.less';
import { View } from "@tarojs/components";
import useF2 from "useF2";

export default comRef(({ data, env }) => {
  const { chart, Canvas, ...props } = useF2(env);

  useEffect(() => {
    if (!chart) {
      return;
    }

    const map = {
      芳华: '40%',
      妖猫传: '20%',
      机器之血: '18%',
      心理罪: '15%',
      寻梦环游记: '5%',
      其他: '2%'
    };
    const data = [{
      name: '芳华',
      percent: 0.4,
      a: '1'
    }, {
      name: '妖猫传',
      percent: 0.2,
      a: '1'
    }, {
      name: '机器之血',
      percent: 0.18,
      a: '1'
    }, {
      name: '心理罪',
      percent: 0.15,
      a: '1'
    }, {
      name: '寻梦环游记',
      percent: 0.05,
      a: '1'
    }, {
      name: '其他',
      percent: 0.02,
      a: '1'
    }];

    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'right',
      itemFormatter: function itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85
    });
    chart.axis(false);
    chart.interval()
      .position('a*percent')
      .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0' ])
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      })
      .animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });

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