import { getFilterItem } from "./utils";

export default {
  ":slot": {},
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = 30;
  },
  "@resize": {
    options: ["width", "height"],
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
        target: ".mbs-filters_extra",
      },
      {
        title: "筛选项宽度",
        type: "select",
        options: [
          { label: "拉伸铺满", value: "fill" },
          { label: "适应内容", value: "fit" },
        ],
        value: {
          get({ data }) {
            return data.tabWidthType ?? "fill";
          },
          set({ data }, value) {
            data.tabWidthType = value;
          },
        },
      },
      {
        title: "筛选栏",
        options: ["border", "background"],
        target: ".mbs-filters",
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "筛选栏";
      cate0.items = [
        {
          title: "基础属性",
          items: [
            {
              title: "添加筛选项",
              type: "comSelector",
              options: {
                schema: "mybricks.taro.filters/item*",
                type: "add",
              },
              value: {
                set({ data, slot }: EditorResult<Data>, namespace: string) {
                  slot.get("content").addCom(namespace, false, {
                    deletable: true,
                    movable: true,
                  });
                },
              },
            },
          ],
        },

        {
          title: "高级属性",
          items: [
            {
              title: "显示「更多筛选项」",
              description: "开启后，会在筛选栏右侧显示一个「筛选」按钮",
              type: "switch",
              value: {
                get({ id, data }: any) {
                  return data.extraButton;
                },
                set({ data }: any, val: string) {
                  data.extraButton = val;
                },
              },
            },
            {
              title: "文案",
              description: "筛选按钮的文案",
              type: "text",
              value: {
                get({ id, data }: any) {
                  return data.extraButtonText;
                },
                set({ data }: any, val: string) {
                  data.extraButtonText = val;
                },
              },
            },
          ],
        },
        {
          title: "事件",
          items: [
            {
              title: "数据变化时",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
          ],
        },
      ];
    },
  },
  ":child(mybricks.taro.filters/item)": {
    title: "筛选项",
    items: [
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
  ".mbs-filters_extra": {
    title: "筛选",
    "@dblclick": {
      type: "text",
      value: {
        get(props) {
          return props.data?.extraButtonText;
        },
        set({ data }, val: string) {
          data.extraButtonText = val;
        },
      },
    },
  },
};
