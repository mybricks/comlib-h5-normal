import { uuid } from "../utils";
import setSlotLayout from "../utils/setSlotLayout";

function getItem({ data, focusArea }) {
  if (!focusArea) return {};
  const index = focusArea.index;
  const item = data.items[index];
  return item;
}

export default {
  "@init"({ style, data, slots }) {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":slot": {},
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "排列方式",
        type: "select",
          options: [
            { label: '竖向', value: 'column' },
            { label: '横向', value: 'row' },
          ],
        value: {
          get(props) {
            return props.data?.slotStyle?.flexDirection;
          },
          set(props, value) {
            props.data?.slotStyle?.flexDirection = value;
          },
        },
      },
      {
        title: "插槽",
        type: "array",
        options: {
          getTitle: (item, index) => {
            return [`插槽 ${index + 1}`];
          },
          editable: false,
          onAdd() {
            return {
              id: uuid(),
              slotStyle: {},
            };
          },
          items: [
            {
              title: "插槽宽度",
              type: "slider",
              options: [
                {
                  max: 24,
                  min: 1,
                  steps: 1,
                },
              ],
              value: "span",
            },
            {
              title: "插槽偏移距离",
              type: "slider",
              options: [
                {
                  max: 24,
                  min: 0,
                  steps: 1,
                },
              ],
              value: "offset",
            },
          ],
        },
        value: {
          get({ data }) {
            return data.items;
          },
          set({ data, slot }, value) {
            // 新增
            if (value.length > data.items.length) {
              const item = value[value.length - 1];
              slot.add(item.id, `${item.id}`);
            }

            // 删除
            if (value.length < data.items.length) {
              const item = data.items.find(
                (item) => !value.find((v) => v.id === item.id)
              );
              slot.remove(item.id);
            }

            data.items = value;
          },
        },
      },
    ];
    // cate1.title = "样式";
    // cate1.items = [
    //   {
    //     title: "自动布局",
    //     type: "layout",
    //     options: [],
    //     value: {
    //       get({ data, slots }) {
    //         const { slotStyle = {} } = data;
    //         const slotInstance = slots.get("content");
    //         setSlotLayout(slotInstance, slotStyle);
    //         return slotStyle;
    //       },
    //       set({ data, slots }, val: any) {
    //         if (!data.slotStyle) {
    //           data.slotStyle = {};
    //         }
    //         data.slotStyle = {
    //           ...data.slotStyle,
    //           ...val,
    //         };
    //         const slotInstance = slots.get("content");
    //         setSlotLayout(slotInstance, val);
    //       },
    //     },
    //   },
    // ];
  },
  ".mybricks-item": {
    title: "插槽",
    items: (props, cate0) => {
      cate0.title = "插槽";
      cate0.items = [
        {
          title: "宽度",
          type: "select",
          options: [
            { label: '固定值', value: 'number' },
            { label: '填充剩余空间', value: 'auto' },
            { label: '适应内容', value: 'fit-content' },
            { label: '百分比', value: 'percent' },
          ],
          value: {
            get(props) {
              return getItem(props).widthMode;
            },
            set(props, value) {
              getItem(props).widthMode = value;
              props.data.items = [...props.data.items];
            },
          },
        },
        {
          title: "宽度值",
          type: "text",
          ifVisible(props: EditorResult<Data>) {
            const widthMode = getItem(props).widthMode
            return widthMode !== 'auto' && widthMode !== 'fit-content';
          },
          value: {
            get(props) {
              return getItem(props).width;
            },
            set(props, value) {
              getItem(props).width = value;
              props.data.items = [...props.data.items];
            },
          },
        },
        {
          title: "布局",
          type: "layout",
          value: {
            get(props) {
              let item = getItem(props);
              const { slotStyle = {} } = item;
              const slotInstance = props.slots.get(item.id);
              setSlotLayout(slotInstance, slotStyle);
              return slotStyle;
            },
            set(props, val: any) {
              let item = getItem(props);

              if (!item.slotStyle) {
                item.slotStyle = {};
              }
              item.slotStyle = {
                ...item.slotStyle,
                ...val,
              };
              const slotInstance = props.slots.get(item.id);
              setSlotLayout(slotInstance, val);
            },
          },
        },
        {
          title: "删除",
          type: "button",
          value: {
            set(props) {
              props.data.items = props.data.items.filter((item, index) => {
                return index !== props.focusArea.index;
              });
            },
          },
        },
      ];
    },
  },
};
