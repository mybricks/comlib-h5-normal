import { uuid } from '../utils';
import { SLIDER_TYPE } from './const';
// import { EVT_TYPE } from '../utils/event-editor/const';

const isObject = (o: any) => Object.prototype.toString.call(o).slice(8, -1) === 'Object';

function computedAction({ before, after }) {
  let beforeIds = before.map((item) => item._id);
  let afterIds = after.map((item) => item._id);

  switch (true) {
    case before.length > after.length: {
      let diffId = beforeIds.filter((x) => !afterIds.includes(x))[0];
      let diffItem = before.filter((x) => diffId.includes(x._id))[0];
      return {
        name: "remove",
        value: diffItem,
      };
    }
    case before.length < after.length: {
      let diffId = afterIds.filter((x) => !beforeIds.includes(x))[0];
      let diffItem = after.filter((x) => diffId.includes(x._id))[0];
      return {
        name: "add",
        value: diffItem,
      };
    }

    case before.length === after.length: {
      let diffItem = null;

      for (let i = 0; i < before.length; i++) {
        if (before[i].title !== after[i].title) {
          diffItem = after[i];
          console.warn("diffItem", diffItem);
          break;
        }
      }

      return {
        name: "update",
        value: diffItem,
      };
    }
  }
}

export default {
  '@init'({ data, style, input, output }) {
    style.width = 375;
    style.height = 204;
    data.items = data.items.map((item, index) => {
      // const id = uuid();
      // output.add(id, `点击轮播图${index}`);
      return {
        ...item,
        // id,
        event: null,
      };
    });
  },
  '@resize': {
    options: ['width', 'height'],
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    (cate0.title = '常规'),
      (cate0.items = [
        // {
        //   title: '类型',
        //   type: 'select',
        //   options: [
        //     { label: '普通', value: SLIDER_TYPE.normal },
        //     { label: '横滑', value: SLIDER_TYPE.swipe },
        //   ],
        //   value: {
        //     get({ data, focusArea }) {
        //       return data.type;
        //     },
        //     set({ data, focusArea }, value: string) {
        //       data.type = value;
        //     },
        //   },
        // },
        {
          title: '轮播项',
          type: 'array',
          options: {
            selectable: true,
            getTitle: (item, index) => {
              return [`${item.title || ""}`];
            },
            onAdd() {
              let defaultItem = {
                title: "轮播项",
              };
              return defaultItem;
            },
            onSelect: (_id, index) => {
              if (index !== -1) {
                data.slideIndex = index;
              }
            },
            items: [
              {
                title: "名称",
                type: "text",
                value: "title",
              },
              // {
              //   title: '图片',
              //   type: 'imageSelector',
              //   value: 'url',
              // },
              // {
              //   title: '类型',
              //   type: 'select',
              //   options: [
              //     { label: '页面跳转', value: EVT_TYPE.JUMP },
              //     { label: '跳转主播', value: EVT_TYPE.AUTHOR },
              //     { label: '自定义', value: EVT_TYPE.CUSTOM },
              //   ],
              //   value: 'evtType',
              // },
              // {
              //   title: '主播ID',
              //   type: 'textarea',
              //   options: {
              //     placeholder: '请输入当前主播ID',
              //   },
              //   ifVisible: (item) => {
              //     return item.evtType === EVT_TYPE.AUTHOR;
              //   },
              //   value: 'authorId',
              // },
              // {
              //   title: '跳转链接',
              //   type: 'textarea',
              //   options: {
              //     placeholder: '目前支持http、https、kwai链接',
              //   },
              //   ifVisible: (item) => {
              //     return item.evtType === EVT_TYPE.JUMP;
              //   },
              //   value: 'jumpUrl',
              // },
            ],
          },
          value: {
            get({ data }) {
              return data.items;
            },
            set({ data, slot }, val) {
              let action = computedAction({
                before: data.items,
                after: val,
              });

              switch (action?.name) {
                case "remove":
                  slot.remove(action?.value._id);
                  break;
                case "add":
                  slot.add(action?.value._id);
                  break;
                case "update":
                  slot.setTitle(action?.value._id, action?.value.title);
                  break;
              }

              data.items = val;
            },
          },
        },
        {
          title: '自动播放',
          items: [
            {
              title: '开启',
              type: 'Switch',
              value: {
                get({ data }) {
                  return data.autoplay;
                },
                set({ data }, autoplay: any) {
                  data.autoplay = autoplay;
                },
              },
            },
            // {
            //   title: '播放方向',
            //   type: 'Select',
            //   ifVisible({ data }) {
            //     return !!data.autoplay;
            //   },
            //   options() {
            //     return [
            //       { value: false, label: '从左到右' },
            //       { value: true, label: '从右到左' },
            //     ];
            //   },
            //   value: {
            //     get({ data }) {
            //       return data?.autoplay?.reverseDirection || false;
            //     },
            //     set({ data }, reverseDirection: boolean) {
            //       if (!isObject(data.autoplay)) {
            //         data.autoplay = {};
            //       }
            //       data.autoplay = { ...data.autoplay, reverseDirection };
            //     },
            //   },
            // },
            {
              title: '播放间隔（毫秒）',
              type: 'text',
              ifVisible({ data }) {
                return !!data.autoplay;
              },
              value: {
                get({ data }) {
                  return data.autoplay.delay || 3000;
                },
                set({ data }, delay: number) {
                  if (!isObject(data.autoplay)) {
                    data.autoplay = {};
                  }
                  data.autoplay = { ...data.autoplay, delay };
                },
              },
            },
          ],
        },
        {
          title: '分页指示器',
          type: 'Switch',
          ifVisible({ data }) {
            return data.type === SLIDER_TYPE.normal;
          },
          value: {
            get({ data }) {
              return data.pagination;
            },
            set({ data }, pagination: any) {
              data.pagination = pagination;
            },
          },
        },
        {
          title: '卡片宽度',
          type: 'text',
          ifVisible({ data }) {
            return data.type === SLIDER_TYPE.swipe;
          },
          options: {
            type: 'number',
          },
          value: {
            get({ data }) {
              return data.cardWidth;
            },
            set({ data }, cardWidth: any) {
              data.cardWidth = cardWidth;
            },
          },
        },
        {
          items: [
            {
              type: 'style',
              options: ['border'],
              catelog: '默认',
              value: {
                get({ data }) {
                  return data.style;
                },
                set({ data }, value) {
                  data.style = { ...data.style, ...value };
                },
              },
            },
          ],
        },
        // {
        //   title: '当轮播图变化时',
        //   type: '_event',
        //   options: {
        //     outputId: 'onIndexChange',
        //   },
        // },
        // {
        //   title: '添加轮播图',
        //   type: 'Button',
        //   value: {
        //     set({ data, output, input }) {
        //       const id = uuid();
        //       data.items.push({ id, url: '', evtType: 'JUMP' });
        //       output.add(id, `点击轮播图${data.items?.length}`);
        //     },
        //   },
        // },
        // {
        //   title: '上一个轮播图',
        //   type: 'Button',
        //   ifVisible({ data }) {
        //     return data.slideIndex > 0;
        //   },
        //   value: {
        //     set({ data, output, input }) {
        //       data.slideIndex--;
        //     },
        //   },
        // },
        // {
        //   title: '下一个轮播图',
        //   type: 'Button',
        //   ifVisible({ data }) {
        //     return data.slideIndex < data.items.length - 1;
        //   },
        //   value: {
        //     set({ data, output, input }) {
        //       data.slideIndex++;
        //     },
        //   },
        // },
      ]);
  },
  '[class^="carousel-pagination-"]': {
    title: '分页指示器',
    items: [
      {
        title: '点的间距',
        description: '点与点之间的间距',
        type: 'text',
        options: {
          type: 'number',
        },
        value: {
          get({ data }) {
            return data.dotColGap;
          },
          set({ data }, dotColGap) {
            data.dotColGap = dotColGap;
          },
        },
      },
      {
        title: '点的偏移',
        description: '点到外部轮播容器的间距',
        type: 'text',
        options: {
          type: 'number',
        },
        value: {
          get({ data }) {
            return data.dotOffset;
          },
          set({ data }, dotOffset) {
            data.dotOffset = dotOffset;
          },
        },
      },
      {
        catelogChange: {
          value: {
            get({ data }) {
              return data.catelogDot;
            },
            set({ data, catelog }) {
              data.catelogDot = catelog;
            },
          },
        },
        items: [
          {
            title: '默认样式',
            type: 'style',
            options: ['width', 'height', 'border', 'background'],
            catelog: '默认',
            value: {
              get({ data }) {
                return data.dotStyle;
              },
              set({ data }, value) {
                data.dotStyle = value;
              },
            },
          },
          {
            title: '聚焦样式',
            type: 'style',
            options: ['width', 'height', 'border', 'background'],
            catelog: '聚焦',
            value: {
              get({ data }) {
                return data.dotActiveStyle;
              },
              set({ data }, value) {
                data.dotActiveStyle = value;
              },
            },
          },
        ],
      },
    ],
  },
};
