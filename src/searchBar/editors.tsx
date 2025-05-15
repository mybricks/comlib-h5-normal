export default {
  "@init": ({ style, data }) => {
    style.width = 375;
    style.height = 34;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "搜索框样式",
        options: ["font","background","border"],
        target({id}){
          return [`.mybricks-searchBar`]
        }
      }, 
      {
        title: "内容文本",
        options: ["font"],
        target({id}){
          // console.log(`${id} .mybricks-searchBar .taroify-search .taroify-search__content .taroify-cell .taroify-cell__value .taroify-form-control .taroify-input`)
          return [`.mybricks-searchBar .mybricks-searchBar-input .taroify-input`]
        }
      },
      {
        title: "提示内容文本",
        options: ["font"],
        target({id}){
          return [`.mybricks-searchBar .mybricks-searchBar-input .taroify-input__placeholder`]
        }
      }
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "搜索框左侧文本",
          type: "text",
          value: {
            get({ data }) {
              return data.label;
            },
            set({ data }, value: string) {
              data.label = value;
            },
          },
        },
        {
          title: "提示文字",
          type: "text",
          value: {
            get({ data }) {
              return data.placeholderText;
            },
            set({ data }, value: string) {
              data.placeholderText = value;
            },
          },
        },
        {
          title: "展示搜索按钮",
          type: "switch",
          value: {
            get({ data }) {
              return data.showSearchButton;
            },
            set({ data }, value: boolean) {
              data.showSearchButton = value;
            },
          },
        },
        {
          title: "搜索按钮文本",
          type: "text",
          ifVisible({ data }) {
            return data.showSearchButton;
          },
          value: {
            get({ data }) {
              return data.searchButtonText;
            },
            set({ data }, value: string) {
              data.searchButtonText = value;
            },
          },
        },
        {
          title: '自定义图标',
          type: 'switch',
          description: '是否使用自定义图标，开启后可以上传自定义图标',
          value: {
            get({data}: EditorResult<Data>) {
              return data.isCustom;
            },
            set({data}: EditorResult<Data>, value: boolean) {
              data.isCustom = value;
            }
          }
        },
        {
          title: "展示清除图标",
          description: "当输入框有内容时可点击图标清除所有文字",
          type: "Switch",
          value: {
            get({ data }) {
              return data.clearable;
            },
            set({ data }, value) {
              data.clearable = value;
            },
          },
        },
        {
          title: '上传',
          type: 'ImageSelector',
          description: '上传自定义图标',
          ifVisible: ({ data }) => {
            return data.isCustom;
          },
          value: {
            get({ data }: EditorResult<Data>) {
              return data.src;
            },
            set({ data }: EditorResult<Data>, value: string) {
              data.src = value;
            }
          }
        },
        {
          title: '尺寸',
          type: 'InputNumber',
          description: '图标大小',
          options: [
            { title: '高度', min: 0, width: 100 },
            { title: '宽度', min: 0, width: 100 }
          ],
          ifVisible: ({ data }) => {
            return data.isCustom;
          },
          value: {
            get({ data }: EditorResult<Data>) {
              return data.contentSize || [14, 14];
            },
            set({ data }: EditorResult<Data>, value: [number, number]) {
              data.contentSize = value;
            }
          }
        },
        {
          title: '间距',
          type: 'Inputnumber',
          options: [{min: 0, max: 1000, width: 200}],
          description: '图标与文字间的距离',
          ifVisible({data}: EditorResult<Data>) {
            return data.isCustom;
          },
          value: {
            get({data}: EditorResult<Data>) {
              return [data.iconDistance];
            },
            set({data}: EditorResult<Data>, value: number[]) {
              data.iconDistance = value[0];
            }
          }
        },
        {
          title: "动作",
          items: [
            {
              title: "是否禁用输入框",
              type: "switch",
              value: {
                get({ data }) {
                  return data.disabled;
                },
                set({ data }, value: boolean) {
                  data.disabled = value;
                },
              },
            },
            //
            {
              ifVisible({ data }) {
                return data.disabled;
              },
              title: "单击",
              type: "_event",
              options: {
                outputId: "onClick",
              },
            },

            //
            {
              ifVisible({ data }) {
                return !data.disabled;
              },
              title: "输入框内容变化时",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
            {
              ifVisible({ data }) {
                return !data.disabled;
              },
              title: "点击清除按钮时",
              type: "_event",
              options: {
                outputId: "onClear",
              },
            },
            {
              ifVisible({ data }) {
                return !data.disabled;
              },
              title: "当触发搜索时",
              type: "_event",
              options: {
                outputId: "onSearch",
              },
            },
          ],
        },
      ];
    },
  },
  ".mybricks-searchButton": {
    '@dblclick': {
      type: 'text',
      value: {
        get({ data }) {
          return data.searchButtonText;
        },
        set({ data }, value) {
          data.searchButtonText = value;
        }
      }
    },
    style: [
      {
        title: "样式",
        options: ["border", "background", "size", "font", "margin"],
        target: `.mybricks-searchBar .mybricks-searchButton`,
      }
    ],
    items: (props, cate1, cate2, cate3) => {
      cate1.title = "常规";
      cate1.items = [
        {
          title: "按钮文本",
          type: "text",
          value: {
            get({ data, focusArea }) {
              return data.searchButtonText
            },
            set({ data, focusArea, slot, output }, value) {
              data.searchButtonText = value;
            },
          },
        },
      ]
    }
  }
};
