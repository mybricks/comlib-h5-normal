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
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "列元素",
        type: "array",
        options: {
          getTitle: (item, index) => {
            return [`列元素 ${index + 1}`];
          },
          onAdd() {
            return {
              id: uuid(),
              span: 8,
              offset: 0,
            };
          },
          items: [
            {
              title: "列元素宽度",
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
              title: "列元素偏移距离",
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
              slot.add(item.id, `slot_${item.id}`);
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
      {
        title: "列水平对齐方式",
        type: "select",
        options: [
          {
            label: "顶对齐",
            value: "start",
          },
          {
            label: "居中对齐",
            value: "center",
          },
          {
            label: "底对齐",
            value: "end",
          },
          {
            label: "两端对齐",
            value: "stretch",
          },
        ],
        value: {
          get({ data }) {
            return data.align;
          },
          set({ data }, value) {
            data.align = value;
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
    title: "列元素",
    items: (props, cate0) => {
      cate0.title = "列元素";
      cate0.items = [
        {
          title: "列元素宽度",
          type: "slider",
          options: [
            {
              max: 24,
              min: 1,
              steps: 1,
            },
          ],
          value: {
            get(props) {
              return getItem(props).span;
            },
            set(props, value) {
              getItem(props).span = value;
              props.data.items = [...props.data.items];
            },
          },
        },
        {
          title: "列元素偏移距离",
          type: "slider",
          options: [
            {
              max: 24,
              min: 0,
              steps: 1,
            },
          ],
          value: {
            get(props) {
              return getItem(props).offset;
            },
            set(props, value) {
              getItem(props).offset = value;
              props.data.items = [...props.data.items];
            },
          },
        },
        {
          title: "列布局",
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
          title: "删除列元素",
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
