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
        title: "样式",
        options: ["border", "background"],
        target: ".mybricks-table",
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
                title,
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
                width: 100,
                fixed: "",
              };
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
              {
                title: "列宽",
                type: "text",
                options: {
                  type: "Number",
                },
                value: "width",
              },
              {
                title: "列固定",
                type: "select",
                options: [
                  { label: "无", value: "" },
                  { label: "左", value: "left" },
                  { label: "右", value: "right" },
                ],
                value: "fixed",
              },
            ],
          },
          value: {
            get({ data }) {
              return data.columns;
            },
            set({ data }, value) {
              data.columns = value;
            },
          },
        },
      ];
      cate1.title = "高级";
      cate1.items = [
        {
          title: "修复",
          type: "button",
          value: {
            set({ data, style }) {
              console.warn("修复", style);
              style.height = "auto";
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
        options: ["font", "size", "background"],
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
            set({ data }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].title = value;
              data.columns = columns;
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
            set({ data }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              let columns = [...data.columns];
              columns[index].dataIndex = value;
              data.columns = columns;
            },
          },
        },
        {
          title: "列宽",
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
