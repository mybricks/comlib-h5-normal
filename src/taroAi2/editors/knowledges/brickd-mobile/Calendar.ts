export default {
  description: `日历`,
  editors: {
    // ':root': {
    //   title: '日历',
    //   items: [
    //     {
    //       title: '样式',
    //       type: 'style',
    //       options: ['background'],
    //     }
    //   ]
    // },
    '.taroify-calendar__header-subtitle': {
      title: '日历头',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['background'],
        }
      ]
    },
    '.taroify-calendar__weekday': {
      title: '星期',
      items: [
        {
          title: '样式',
          type: 'style',
          // options: ['background', 'font'],
        }
      ]
    }
  },
  docs: require("./Calendar.md").default,
};
