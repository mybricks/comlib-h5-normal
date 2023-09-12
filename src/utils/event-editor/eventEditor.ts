import { EVT_TYPE } from './const';

const jumpEventEditor = {
  title: '跳转链接',
  type: 'text',
  options: {
    placeholder: '目前支持http、https、kwai链接',
  },
  ifVisible: ({ data }) => {
    return data.evtType === EVT_TYPE.JUMP;
  },
  value: {
    get({ data }) {
      return data.jumpUrl;
    },
    set({ data }, value) {
      data.jumpUrl = value;
    },
  },
};

const EVENT_TYPE_OPTIONS = {
  // { label: '无', value: EVT_TYPE.NONE },
  [EVT_TYPE.JUMP]: { label: '跳转', value: EVT_TYPE.JUMP },
  [EVT_TYPE.BACK]: { label: '返回上一级', value: EVT_TYPE.BACK },
  [EVT_TYPE.SHARE]: { label: '分享', value: EVT_TYPE.SHARE },
  // { label: '关闭', value: EVT_TYPE.CLOSE },
  [EVT_TYPE.CUSTOM]: { label: '自定义', value: EVT_TYPE.CUSTOM },
};

export const eventTypeEditor = [
  {
    title: '点击',
    type: 'select',
    // type: 'radio',
    options: Object.values(EVENT_TYPE_OPTIONS),
    value: {
      get({ data }) {
        return data.evtType;
      },
      set({ data }, value) {
        data.evtType = value;
      },
    },
  },
  jumpEventEditor,
];

export const eventOutputEditor = {
  title: '流程',
  type: 'event',
  ifVisible: ({ data }) => {
    return data.evtType === EVT_TYPE.CUSTOM;
  },
  options: {
    outputId: 'click',
  },
};

export const customEventTypeEditor = (specifiedList) => {
  const editor = [
    {
      title: '点击',
      type: 'select',
      options: specifiedList.map((item) => EVENT_TYPE_OPTIONS[item]),
      value: {
        get({ data }) {
          return data.evtType;
        },
        set({ data }, value) {
          data.evtType = value;
        },
      },
    },
    jumpEventEditor,
  ];
  return editor;
};
