


export enum FormatType {
  NONE = 'NONE',
  KEYMAP = 'KEYMAP',
  TIME_TEMPLATE = 'TIME_TEMPLATE',
  TIME_CUSTOM = 'TIME_CUSTOM',
  // PRICE_CUSTOM = 'PRICE_CUSTOM'
}

const builtInFormatters = {
  [FormatType.NONE]: {
    label: '保持原值',
    name: FormatType.NONE,
  },
  [FormatType.KEYMAP]: {
    label: '枚举映射',
    name: FormatType.KEYMAP,
    genEditor() {
      return {
        type: 'map'
      }
    },
  },
  [FormatType.TIME_TEMPLATE]: {
    label: '时间戳转化',
    name: FormatType.TIME_TEMPLATE,
    genEditor(options) {
      return {
        type: 'select',
        description: '待转换数据格式为字符串或数字型时间戳',
        options: {
          options: [
            {
              label: '年-月-日 时:分:秒',
              value: 'YYYY-MM-DD HH:mm:ss'
            },
            {
              label: '月-日 时:分:秒',
              value: 'MM-DD HH:mm:ss'
            },
            {
              label: '年-月-日',
              value: 'YYYY-MM-DD'
            },
            {
              label: '月-日',
              value: 'MM-DD'
            },
            {
              label: '时:分:秒',
              value: 'HH:mm:ss'
            }
          ],
          ...options
        }
      };
    },
  },
  [FormatType.TIME_CUSTOM]: {
    label: '自定义时间戳转化',
    name: FormatType.TIME_CUSTOM,
    genEditor(options) {
      return {
        type: 'text',
        description: '待转换数据格式为字符串或数字型时间戳',
        options: {
          placeholder: 'YYYY-MM-DD HH:mm:ss',
          ...options
        }
      };
    },
  }
}

const createFormatterSelector = (formatters, accessor) => {
  return {
    title: '格式化类型',
    type: 'select',
    options: formatters.map((item) => ({
      label: item.label,
      value: item.name
    })),
    value: {
      get(info) {
        let data = accessor?.get(info) || {}
        return data?.formatterName || FormatType.NONE
      },
      set(info, v) {
        const data = accessor?.get(info) || {}
        // 设置当前格式化方法
        data.formatterName = v
        accessor.set(info, data)
      }
    }
  }
}


export const createDataFormatEditor = ({ title, value, formatters }) => {

  const editors = (formatters ?? []).map(item => {
    const findFormatter = builtInFormatters[item.formatter];

    const name = item.formatter;
    const accessor = value;
    const defaultValue = item.defaultValue;

    if (!findFormatter?.genEditor) {
      return null
    }
    
    return {
      title: '格式化参数配置',
      ifVisible(info) {
        const data = value.get(info)
        return data?.formatterName === name;
      },
      value: {
        get(info) {
          // 获取到存储在组件上当前格式器的数据
          const values = accessor?.get(info)?.values || {}
          if (typeof values?.[name] === 'undefined') {
            values[name] = defaultValue
          }
          return values[name]
        },
        set(info, value) {
          const data = accessor?.get(info) || {};
          if (!data.values) {
            data.values = {};
          }
          const values = data.values
          // 设置当前格式器的数据
          values[name] = value

          console.warn('name', name)
          // 设置当前格式化方法
          accessor.set(info, data)
        }
      },
      ...findFormatter?.genEditor(item.options ?? {}),
    };
  }).filter(t => !!t)

  return {
    title,
    items: [
      {
        title: '空值处理',
        type: 'Switch',
        description: '开启后，可将输入值为undefined、null、空字符串转换成预期值',
        value: {
          get(info) {
            const values = value?.get(info) || {}
            return values?.['voidHandle'] || false;
          },
          set(info, switchValue: boolean) {
            const values = value?.get(info) || {}
            values['voidHandle'] = switchValue
            value.set(info, values)
          }
        }
      },
      {
        title: '空值替代字符',
        type: 'Text',
        description: '将空值用配置的字符替代',
        ifVisible(info) {
          const values = value?.get(info) || {}
          return values?.['voidHandle'] || false;
        },
        value: {
          get(info) {
            const values = value?.get(info) || {}
            if (typeof values?.['voidTo'] === 'undefined') {
              values['voidTo'] = '';
            }
            return values?.['voidTo'];
          },
          set(info, textValue: string) {
            const values = value?.get(info) || {}
            values['voidTo'] = textValue
            value.set(info, values)
          }
        }
      },
      createFormatterSelector((formatters ?? []).map(item => builtInFormatters[item.formatter]), value),
      ...editors,
    ]
  }
}