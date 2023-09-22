
const setSlotLayout = (slot, val) => {
  if(!slot) return;
  if (val.position === 'absolute') {
    slot.setLayout(val.position);
  } else if (val.display === 'flex') {
    if (val.flexDirection === 'row') {
      slot.setLayout('flex-row');
    } else if (val.flexDirection === 'column') {
      slot.setLayout('flex-column');
    }
  }
};

export default {
  '@init'({ style }) {
    style.height = 100;
  },
  '@resize': {
    options: ['width', 'height']
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规'
    cate0.items = [
      {
        title: '默认样式',
        type: 'style',
        options: {
          plugins: ['padding', 'border', 'bgcolor', 'bgimage']
        },
        value: {
          get: ({ data }: EditorResult<any>) => {
            return data.style;
          },
          set: ({ data }: EditorResult<any>, value) => {
            data.style = value;
          }
        }
      },
    ]
    cate1.title = '样式'
    cate1.items = [
      {
        title: '自动布局',
        type: 'layout',
        options: [],
        value: {
          get({ data, slots }) {
            const { slotStyle = {} } = data;
            const slotInstance = slots.get('content');
            setSlotLayout(slotInstance, slotStyle);
            return slotStyle;
          },
          set({ data, slots }, val: any) {
            if (!data.slotStyle) {
              data.slotStyle = {};
            }
            data.slotStyle = {
              ...data.slotStyle,
              ...val
            };
            const slotInstance = slots.get('content');
            setSlotLayout(slotInstance, val);
          }
        }
      }
    ]
    cate2.title = '行为'
    cate2.items = [
      {
        title: '单击',
        type: '_event',
        options: {
          outputId: 'onClick'
        }
      }
    ]
  },
}
