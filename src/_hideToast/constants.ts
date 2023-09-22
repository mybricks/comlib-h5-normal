export const InputIds = {
  Dynamic: 'onDynamic',
  Trigger: 'onTrigger',
  Cancel: 'onCancel'
};

export const OutputIds = {
  Trigger: 'trigger'
};

export const Schemas = {
  Follow: {
    type: 'follow'
  },
  Any: {
    type: 'any'
  },
  Dynamic: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: '提示的内容'
      },
      duration: {
        type: 'number',
        title: '提示的持续时间(ms)'
      },
      icon: {
        type: 'string',
        title: '图标'
      },
      mask: {
        type: 'boolean',
        title: '是否显示透明蒙层，防止触摸穿透'
      },
    }
  }
};

/**
 * 数据源
 * @param id 定时器ID
 * @param delay 延迟时间
 * @param useCancel 开启取消
 */
export interface Data {
  id: string;
  delay: number;
  useCancel?: boolean;
}
