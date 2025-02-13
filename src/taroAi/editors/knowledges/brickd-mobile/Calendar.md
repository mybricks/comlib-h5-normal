# Calendar 日历

### 介绍

日历组件用于选择日期或日期区间。按月份的日历形式平铺展示，支持上下滚动。

## 代码演示

### 选择单个日期

下面演示了使用日历组件选择单个日期的用法，日期选择完成后会触发 `onConfirm` 事件。

要点：
- 需要给日历组件配置高度，可以是*固定高度*，如果父级元素有高度也可以配置*100%*。

```tsx
function SingleCalendar() {
  const [value, setValue] = useState<Date>()

  return (
    <Calendar
      className={css.calendar}
      type="single"
      value={value}
      onChange={setValue}
      onConfirm={(newValue) => {
        console.log(newValue)
      }}
    >
    </Calendar>
  )
}
```

```less
.calendar {
  height: 400px;
}
```

### 选择日期范围

使用日历组件选择日期范围，选择完成后会触发 `onConfirm` 事件。

要点：
- 需要给日历组件配置高度，可以是*固定高度*，如果父级元素有高度也可以配置*100%*。

```tsx
function RangeCalendar() {
  const [value, setValue] = useState<Date[]>()

  return (
    <Calendar
      className={css.calendar}
      type="range"
      value={value}
      onChange={setValue}
      onConfirm={(newValue) => {
        console.log(newValue)
      }}
    >
    </Calendar>
  )
}
```

```less
.calendar {
  height: 400px;
}
```

### 通过formatter给日期加上特殊样式和内容

要点：
- 使用`formatter`配置对特殊日期，通过*className*修改样式，通过*children*、*top* 和 *bottom* 来修改内容。

```tsx
function SingleCalendar() {
  const [value, setValue] = useState<Date>()

  return (
    <Calendar
      className={css.calendar}
      type="single"
      value={value}
      onChange={setValue}
      onConfirm={(newValue) => {
        console.log(newValue)
      }}
      formatter={(day) => {
        if (day.value.getDate() === 1) {
          // 给每个月的1号，展示「月初」文本，同时在下方添加「充值」文本的提醒
          return {
            ...day,
            children: day.children + '号', // 主要内容
            bottom: '充值', // children下方的小字提醒
            className: css.day
          }
        }
        return day
      }}
    >
    </Calendar>
  )
}
```

```less
.calendar {
  height: 400px;
}
.day {
  color: blue;
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 选择类型:<br>`single` 表示选择单个日期，<br>`multiple` 表示选择多个日期，<br>`range` 表示选择日期区间 | _string_ | `single` |
| defaultValue | 默认选中的日期，`type` 为 `multiple` 或 `range` 时为数组，传入 `null` 表示默认不选择 | _Date \| Date[] \| null_ | 今天 |
| value | 选中的日期，`type` 为 `multiple` 或 `range` 时为数组，传入 `null` 表示默认不选择 | _Date \| Date[] \| null_ | 今天 |
| formatter | 日期格式化函数 | _(day: Calendar.DayObject) => Calendar.DayObject_ | - |
| title | 日历标题 | _string_ | `日期选择` |
| subtitle | 是否展示日历副标题（年月） | _boolean_ | `true` |
| min | 可选择的最小日期 | _Date_ | 当前日期 |
| max | 可选择的最大日期 | _Date_ | 当前日期的六个月后 |
| readonly | 是否为只读状态，只读状态下不能选择日期 | _boolean_ | `false` |
| firstDayOfWeek | 设置周起始日 | _0-6_ | `0` |

### Calendar.DayObject 数据结构

日历中的每个日期都对应一个 Day 对象，通过`formatter`属性可以自定义 Day 对象的内容

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| value | 日期对应的 Date 对象 | _Date_ |
| type | 日期类型，可选值为 `active` `start` `middle` `end` `disabled` | _string_ |
| children | 中间显示的文字 | _string_ |
| top | 上方的提示信息 | _string_ |
| bottom | 下方的提示信息 | _string_ |
| className | 额外类名 | _string_ |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onChange | 点击并选中任意日期时触发 | _value: Date \| Date[]_ |
| onConfirm | 日期选择完成后触发，若使用 `Calendar.Button` 组件，则点击确认按钮后触发 | _value: Date \| Date[]_ |
