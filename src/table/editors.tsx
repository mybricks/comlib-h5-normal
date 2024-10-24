import { uuid } from "../utils";

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":slot": {},
  ":root": {
    style: [
      {
        title: "表格",
        options: ["border"],
        target: ".mybricks-table",
      },
      {
        title: "表头",
        options: [{ type: "size" }, "font", "background"],
        target: ".mybricks-thead .mybricks-col",
      },
      {
        title: "表格行(奇数)",
        options: ["font", "background"],
        target: ".mybricks-row .mybricks-col",
      },
      {
        title: "表格行(偶数)",
        options: ["font", "background"],
        target: ".mybricks-row-double .mybricks-col",
      },
    ],
    items({ data, output, input, style, slots }, cate0, cate1, cate2) {
      cate0.items = [
        {
          title: "隐藏表头",
          type: "switch",
          value: {
            get({ data }) {
              return data.hiddenTableHeader;
            },
            set({ data }, value) {
              data.hiddenTableHeader = value;
            },
          },
        },
        {},
        {
          title: "表格列",
          type: "array",
          options: {
            getTitle: (item, index) => {
              return [`${item.title}`];
            },
            onAdd() {
              let uid = uuid("", 5);
              let id = `column_${uid}`;
              let title = `列${uid}`;
              return {
                id: id,
                title: title,
                dataIndex: id,
                type: "text",
                autoWidth: true,
                minWidth: "90",
                width: "100",
              };
            },
            onRemove(_id) {
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let id = data.columns[index].id;
              try {
                slots.remove(id);
              } catch (e) {}
            },
            items: [
              {
                title: "列名",
                type: "text",
                value: "title",
              },
              {
                title: "列字段",
                type: "text",
                value: "dataIndex",
              },
            ],
          },
          value: {
            get({ data }) {
              return data.columns;
            },
            set({ data, slots }, value) {
              data.columns = value;

              //更新 slots 的 title
              value.forEach((column) => {
                let slot = slots.get(column.id);
                if (slot) {
                  slot.setTitle(`表格列 ${column.title} | ${column.dataIndex}`);
                }
              });
            },
          },
        },
        {
          ifVisible({ data }) {
            return data.columns.length > 1;
          },
          title: "固定首列",
          type: "switch",
          value: {
            get({ data }) {
              return data.useLeftSticky;
            },
            set({ data }, value) {
              data.useLeftSticky = value;
            },
          },
        },
        {
          ifVisible({ data }) {
            return data.columns.length > 1;
          },
          title: "固定末列",
          type: "switch",
          value: {
            get({ data }) {
              return data.useRightSticky;
            },
            set({ data }, value) {
              data.useRightSticky = value;
            },
          },
        },
        {
          title: "展示列边框",
          type: "switch",
          value: {
            get({ data }) {
              return data.bordered;
            },
            set({ data }, value) {
              data.bordered = value;
            },
          },
        },
        {},
        {
          title: "单击行时",
          type: "_event",
          options: {
            outputId: "onClickRow",
          },
        },
      ];
    },
  },
  ".mybricks-thead .mybricks-col": {
    title: "表格列",
    style: [
      {
        title: "样式",
        options: [{ type: "size" }, "font", "background"],
        target: ".mybricks-thead .mybricks-col",
      },
    ],
    items: ({ data, focusArea }, cate0, cate1, cate2) => {
      if (!focusArea) {
        return;
      }

      cate0.items = [
        {
          title: "列名",
          type: "text",
          value: {
            get({ data }) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              return data.columns[index].title;
            },
            set({ data, slots }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].title = value;
              data.columns = columns;

              // 更新 slots 的 title
              let column = columns[index];

              let slot = slots.get(column.id);
              if (slot) {
                slot.setTitle(`表格列 ${column.title} | ${column.dataIndex}`);
              }
            },
          },
        },
        {
          title: "列字段",
          type: "text",
          value: {
            get({ data }) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              return data.columns[index].dataIndex;
            },
            set({ data, slots }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].dataIndex = value;
              data.columns = columns;

              // 更新 slots 的 title
              let column = columns[index];

              let slot = slots.get(column.id);
              if (slot) {
                slot.setTitle(`表格列 ${column.title} | ${column.dataIndex}`);
              }
            },
          },
        },
        {
          title: "类型",
          type: "select",
          options: [
            { label: "文本", value: "text" },
            { label: "自定义插槽", value: "slot" },
          ],
          value: {
            get({ data }) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              return data.columns[index].type;
            },
            set({ data, slots }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].type = value;
              data.columns = columns;

              if (value === "text") {
                slots.remove(columns[index].id);
              }

              if (value === "slot") {
                slots.add({
                  id: columns[index].id,
                  title: `表格列 ${columns[index].title} | ${columns[index].id}`,
                  type: "scope",
                  inputs: [
                    {
                      id: "text",
                      title: "当前列数据",
                      schema: {
                        type: "any",
                      },
                    },
                    {
                      id: "record",
                      title: "当前行数据",
                      schema: {
                        type: "object",
                      },
                    },
                    {
                      id: "index",
                      title: "当前行序号",
                      schema: {
                        type: "number",
                      },
                    },
                  ],
                });
              }
            },
          },
        },
        {},
        {
          title: "列宽",
          type: "radio",
          options: [
            { label: "适应剩余宽度", value: "auto" },
            { label: "固定宽度", value: "fixed" },
          ],
          value: {
            get({ data }) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              return data.columns[index].autoWidth ? "auto" : "fixed";
            },
            set({ data }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].autoWidth = value === "auto";
              data.columns = columns;
            },
          },
        },
        {
          ifVisible({ data }) {
            let _id = focusArea.ele.dataset.id;
            let index = data.columns.findIndex((column) => {
              return column._id === _id;
            });
            return data.columns[index].autoWidth;
          },
          title: "最小宽度",
          description: "单位：px",
          type: "text",
          options: {
            type: "Number",
          },
          value: {
            get({ data }) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              return data.columns[index].minWidth;
            },
            set({ data }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].minWidth = value;
              data.columns = columns;
            },
          },
        },
        {
          ifVisible({ data }) {
            let _id = focusArea.ele.dataset.id;
            let index = data.columns.findIndex((column) => {
              return column._id === _id;
            });
            return !data.columns[index].autoWidth;
          },
          title: "宽度",
          description: "单位：px",
          type: "text",
          options: {
            type: "Number",
          },
          value: {
            get({ data }) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              return data.columns[index].width;
            },
            set({ data }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].width = value;
              data.columns = columns;
            },
          },
        },
      ];
    },
  },
};
