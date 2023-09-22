import { uuid } from '../utils';
import { Data, InputIds, OutputIds, Schemas } from './constants';

const ICON_MAP = {
  success: '成功',
  error: '错误',
  loading: '加载',
  none: '无'
};

const setDescByData = ({ data, setDesc }) => {
  let icon = data.dynamic ? "动态" : ICON_MAP[data.icon];
  let title = data.dynamic ? "动态" : data.title;

  const info = [`图标：${icon}`, `提示内容：${title}`];
  setDesc(info.join('\n'));
};

export default {
  '@init': ({ data, setDesc }) => {
    data.id = uuid();
    console.error(data);
    setDescByData({ data, setDesc });
  },
  ":root": [
    {
      ifVisible: ({ data }) => {
        return !data.dynamic;
      },
      title: "提示内容",
      type: "text",
      value: {
        get({ data }) {
          return data.title;
        },
        set({ data, setDesc }, value: string) {
          data.title = value;
          setDescByData({ data, setDesc });
        }
      }
    },
    {
      ifVisible: ({ data }) => {
        return !data.dynamic;
      },
      title: '图标',
      type: 'select',
      options: [
        { label: '成功', value: 'success' },
        { label: '错误', value: 'error' },
        { label: '加载', value: 'loading' },
        { label: '无', value: 'none' },
      ],
      value: {
        get({ data }) {
          return data.icon;
        },
        set({ data, setDesc }, value: string) {
          data.icon = value;
          setDescByData({ data, setDesc });
        }
      }
    },
    {
      ifVisible: ({ data }) => {
        return !data.dynamic;
      },
      title: '提示的持续时间(ms)',
      description: "输入「0」则一直持续",
      type: 'text',
      options: {
        type: 'number'
      },
      value: {
        get({ data }) {
          return data.duration;
        },
        set({ data }, value: string) {
          console.log(value);
          data.duration = parseInt(`${value}`, 10) || 0;
        }
      }
    },

    {
      ifVisible: ({ data }) => {
        return !data.dynamic;
      },
      title: '是否显示透明蒙层',
      description: "透明蒙层显示时用户将无法操作页面内的其他元素",
      type: 'Switch',
      value: {
        get({ data }) {
          return data.mask;
        },
        set({ data }, value: boolean) {
          data.mask = value;
        }
      }
    },
    {
      title: "动态输入",
      type: "Switch",
      value: {
        get({ data }) {
          return data.dynamic;
        },
        set({ data, input, setDesc }, value: boolean) {
          data.dynamic = value;
          setDescByData({ data, setDesc });

          if (value) {
            input.add(InputIds.Dynamic, '动态输入', Schemas.Dynamic);
            input.remove(InputIds.Trigger);
          } else {
            input.remove(InputIds.Dynamic);
            input.add(InputIds.Trigger, '触发', Schemas.Follow);
          }
        }
      }
    },
  ],
};