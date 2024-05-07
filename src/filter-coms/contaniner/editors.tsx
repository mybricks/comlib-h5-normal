import { getFilterItem } from './utils'

export default {
  ":slot": {},
  "@init": ({ style, data }) => {
    style.width = "100%";
  },
  "@resize": {
    options: ["width"],
  },
  "@childAdd"({ data, inputs, outputs, logs, slots }, child, curSlot) {
    if (curSlot.id === "content") {
      const { id, inputDefs, outputDefs, name } = child;
      if (!Array.isArray(data.items)) {
        data.items = [];
      }
      const item = data.items.find((item) => item.id === id);
      // const com = outputDefs.find((item) => item.id === 'returnValue');

      if (isNaN(data.nameCount)) {
        data.nameCount = 0;
      }

      const label = `筛选项${++data.nameCount}`;

      if (item) {
        // item.schema = com.schema;
      } else {
        data.items.push({
          id,
          comName: name,
          // schema: com.schema,
          name: label,
          label: label,
          hidden: false,
          rules: [],
        });
      }
    }
  },
  "@childRemove"({ data, inputs, outputs, logs, slots }, child) {
    const { id, name, title } = child;

    data.items = data.items.filter((item) => {
      if (item?.comName) {
        return item.comName !== name;
      }

      return item.id !== id;
    });

    // refreshSchema({ data, inputs, outputs, slots });
  },
  ":root": {
    style: [
      {
        title: "全部筛选",
        ifVisible({ data }: EditorResult<Data>) {
          return !!data.extraButton;
        },
        options: ["font", "border", "padding", "background"],
        target: ".mbs-filters_extra"
      }
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "添加筛选项",
          type: "comSelector",
          options: {
            schema: "mybricks.taro.filters/item*",
            type: "add",
          },
          value: {
            set({ data, slot }: EditorResult<Data>, namespace: string) {
              slot
                .get("content")
                .addCom(namespace, false, { deletable: true, movable: true });
            },
          },
        },
        {
          title: "全部筛选",
          items: [
            {
              title: "显示「全部筛选」",
              type: "switch",
              value: {
                get({ id, data }: any) {
                  return data.extraButton
                },
                set({ data }: any, val: string) {
                  data.extraButton = val
                },
              },
            },
            {
              title: "文案",
              type: "text",
              value: {
                get({ id, data }: any) {
                  return data.extraButtonText
                },
                set({ data }: any, val: string) {
                  data.extraButtonText = val
                },
              },
            }
          ]
        },
      ];
    },
  },
  ":child(mybricks.taro.filters/item)": {
    title: "筛选项",
    items: [
      // {
      //   title: "标题",
      //   type: "text",
      //   value: {
      //     get({ id, data, name }: any) {
      //       const item = getFilterItem(data.items, { id, name });
      //       return item?.label;
      //     },
      //     set({ id, name, data, slot }: any, val) {
      //       const item = getFilterItem(data.items, { id, name });

      //       if (item) {
      //         if (item.label === item.name) {
      //           item.label = val;
      //           item.name = val;
      //         } else {
      //           item.label = val;
      //         }
      //       }
      //     },
      //   },
      // },
      {
        title: "字段",
        type: "text",
        value: {
          get({ id, data, name }: any) {
            const item = getFilterItem(data.items, { id, name });
            return item?.name;
          },
          set({ id, data, name, input, output, slots }: any, val: string) {
            const item = getFilterItem(data.items, { id, name });
            if (item) {
              item.name = val;
            }
          },
        },
      },
      {},
    ],
  },
}