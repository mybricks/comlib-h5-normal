import { uuid } from "../utils";

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":slot": {},
  ":root": {
    style: [
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
    ],
    items({ data, output, input, style, slots }, cate0, cate1, cate2) {
      cate0.items = [
        {
          title: "列表",
          type: "array",
          options: {
            getTitle: (item, index) => {
              return [`${item.title}`];
            },
            onAdd() {
              let uid = uuid("", 5);
              let id = `column_${uid}`;
              let title = `列${uid}`;

              slots.add({
                id,
                title: `表格列 ${title} | ${id}`,
                type: "scope",
                inputs: [
                  {
                    id: "columnData",
                    title: "当前列数据",
                    schema: {
                      type: "any",
                    },
                  },
                  {
                    id: "rowData",
                    title: "当前行数据",
                    schema: {
                      type: "any",
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

              return {
                id: id,
                title: title,
                dataIndex: id,
                width: "100",
                autoWidth: true,
                fixed: "",
              };
            },
            onRemove(_id) {
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let id = data.columns[index].id;
              slots.remove(id);
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
                slots
                  .get(column.id)
                  .setTitle(`表格列 ${column.title} | ${column.dataIndex}`);
              });
            },
          },
        },
      ];
    },
  },
  ".mybricks-thead .mybricks-td": {
    title: "表格列",
    style: [
      {
        title: "样式",
        options: ["font", "background"],
        target: ".mybricks-thead .mybricks-td",
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
              slots
                .get(column.id)
                .setTitle(`表格列 ${column.title} | ${column.dataIndex}`);
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
              slots
                .get(column.id)
                .setTitle(`表格列 ${column.title} | ${column.dataIndex}`);
            },
          },
        },
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

        {
          title: "列固定",
          type: "select",
          options: [
            { label: "无", value: "" },
            { label: "左", value: "left" },
            { label: "右", value: "right" },
          ],
          value: {
            get({ data }) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              return data.columns[index].fixed;
            },
            set({ data }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].fixed = value;
              data.columns = columns;
            },
          },
        },
      ];
    },
  },
};
