import { uuid } from "./../utils";

function findEle({ data, focusArea }, dataname) {
  const id = focusArea.dataset[dataname];
  return data.items.find((item) => item.key === id) || {};
}

const contentSchema = {
  type: "string",
};

export default {
  "@init": ({ data, input, style }) => {
    const uid = uuid();
    data.items.push({
      text: "这是示例内容",
      key: uid,
    });

    data.count = 0;

    input.add(uid, `修改文本「这是示例内容」内容`, contentSchema);

    style.width = "fit-content";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "文本排版",
        // options: ['border', { type: 'font', config: { disableTextAlign: true } }],
        options: ["font", "border", "padding", "background"],
        target: ".mybricks-typography",
      },
    ],
    items({ data, input, output }, cate0) {
      (cate0.title = "文本排版"),
        (cate0.items = [
          {
            title: "元素列表",
            description: "可拖拽改变各元素的位置",
            type: "array",
            options: {
              editable: false,
              getTitle: (item) => {
                return item?.text;
              },
              onAdd: () => {
                const uid = uuid();
                const text = `示例文本${++data.count}`;
                input.add(uid, `修改文本「${text}」内容`, contentSchema);
                output.add(uid, `单击`, { type: "string" });

                return {
                  text: text,
                  key: uid,
                };
              },
              onRemove: (_id) => {
                const findItem = data.items.find((t) => t._id === _id);
                if (input.get(findItem.key)) {
                  input.remove(findItem.key);
                }
              },
            },
            value: {
              get({ data }: any) {
                return data.items || [];
              },
              set({ data }: any, val: any[]) {
                data.items = val;
              },
            },
          },
        ]);
    },
  },
  "[data-text-id]": {
    title: "文本",
    "@dblclick": {
      type: "text",
      value: {
        get({ data, focusArea }) {
          if (!focusArea) return;
          return findEle({ data, focusArea }, "textId").text;
        },
        set({ data, focusArea, input }, value) {
          if (!focusArea) return;
          findEle({ data, focusArea }, "textId").text = value;
          input
            .get(focusArea.dataset["textId"])
            ?.setTitle?.(`修改文本「${value}」内容`);
        },
      },
    },
    style: [
      {
        title: "文本样式",
        options: [
          { type: "font", config: { disableTextAlign: true } },
          "padding",
          "margin",
          "border",
          "background",
        ],
        target({ data, focusArea }) {
          return `.typography_${findEle({ data, focusArea }, "textId").key}`;
        },
      },
      // {
      //   title: '间距',
      //   type: 'Inputnumber',
      //   options: [
      //     { title: '左', min: 0, max: 50, width: 50 },
      //     { title: '右', min: 0, max: 50, width: 50 }
      //   ],
      //   value: {
      //     get({ data, focusArea }) {
      //       return findEle({ data, focusArea }, 'textId').stylePadding;
      //     },
      //     set({ data, focusArea }, value) {
      //       findEle({ data, focusArea }, 'textId').stylePadding = value;
      //     }
      //   }
      // }
    ],
    items: [
      {
        title: "文本内容",
        type: "Textarea",
        value: {
          get({ data, focusArea }) {
            if (!focusArea) return;
            return findEle({ data, focusArea }, "textId").text;
          },
          set({ data, focusArea, input }, value) {
            if (!focusArea) return;
            findEle({ data, focusArea }, "textId").text = value;
            input
              .get(focusArea.dataset["textId"])
              ?.setTitle?.(`修改文本「${value}」内容`);
          },
        },
      },
      {
        title: "单击",
        type: "_Event",
        // ifVisible({ data, focusArea }) {
        //   if (!focusArea) return;
        //   return findEle({ data, focusArea }, 'textId').click ? true : false;
        // },
        options: ({ data, focusArea }) => {
          return {
            outputId: findEle({ data, focusArea }, "textId").key,
          };
        },
      },
      {
        title: "删除元素",
        type: "Button",
        value: {
          set({ data, focusArea, input }) {
            if (!focusArea || data.items.length === 0) return;
            const id = focusArea.dataset["textId"];
            const idx = data.items.findIndex((item) => item.key === id);
            if (input.get(data.items[idx].key)) {
              input.remove(data.items[idx].key);
            }
            idx !== -1 && data.items.splice(idx, 1);
          },
        },
      },
    ],
  },
};
