export default {
  '@init': ({ style, data }) => {
    style.width = "100%";

    style.marginTop = 12;
    style.marginRight = 12;
    style.marginBottom = 12;
    style.marginLeft = 12;
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规';
    cate0.items = [
      {
        title: 'label',
        type: 'text',
        value: {
          get({ data }) {
            return data.label;
          },
          set({ data }, value) {
            data.label = value;
          },
        }
      },
      {
        title: 'name',
        type: 'text',
        value: {
          get({ data }) {
            return data.name;
          },
          set({ data }, value) {
            return data.name = value;
          },
        },
      },
      {
        title: '键盘类型',
        type: 'Select',
        options: [
          { value: 'text', label: '文本输入键盘' },
          { value: 'number', label: '数字输入键盘' },
          { value: 'idcard', label: '身份证输入键盘' },
          { value: 'digit', label: '带小数点的数字键盘' },
          { value: 'nickname', label: '昵称输入键盘' },
          { value: 'numberpad', label: '数字输入键盘' },
          { value: 'digitpad', label: '带小数点的数字键盘' },
          { value: 'idcardpad', label: '身份证输入键盘' },
        ],
        value: {
          get({ data }) {
            return data.type;
          },
          set({ data }, value) {
            return data.type = value;
          },
        },
      },
    ]

    cate1.title = '样式';
    cate1.items = [
      {
        title: '样式',
        type: 'Style',
        options: {
          plugins: ['bgColor'],
        },
        value: {
          get({ data }) {
            return data.formFieldStyle
          },
          set({ data }, val) {
            data.formFieldStyle = {
              ...data.formFieldStyle,
              ...val,
            }
          },
        },
      },
    ]

    cate2.title = '动作';
    cate2.items = [
      {
        title: '单击',
        type: '_event',
        options: {
          outputId: 'click',
        },
      }
    ]
  }
};
