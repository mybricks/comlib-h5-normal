import { uuid } from "../utils";
import { connectorEditor } from "./../utils/connector/editor";

function getColumnsFromSchema(
  schema: any,
  config?: { defaultWidth: number | "auto" }
) {
  const { defaultWidth } = config || { defaultWidth: 140 };
  function getColumnsFromSchemaProperties(properties) {
    const columns: any = [];
    Object.keys(properties).forEach((key) => {
      if (
        properties[key].type === "number" ||
        properties[key].type === "string" ||
        properties[key].type === "boolean"
      ) {

        let uid = uuid("", 5);
        let id = `column_${uid}`;

        columns.push({
          title: key,
          dataIndex: key,
          id: id,
          _id: uid,
          autoWidth: true,
          type: "text",
          minWidth: "90",
          width: "100",
        });
      }
    });
    return columns;
  }
  let columnSchema: any = {};
  if (schema.type === "array") {
    columnSchema = schema.items.properties;
  } else if (schema.type === "object") {
    const dataSourceKey = Object.keys(schema.properties).find(
      (key) => schema.properties[key].type === "array"
    );
    if (dataSourceKey) {
      columnSchema = schema.properties[dataSourceKey].items.properties;
    }
  }
  return getColumnsFromSchemaProperties(columnSchema);
}

export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":slot": {},
  ...connectorEditor<EditorResult<Data>>({
    set({ data, input }: EditorResult<Data>, { schema }) {
      data.columns = getColumnsFromSchema(schema, {
        defaultWidth: "auto",
      });
      // if (data.columns.length) {
      //   data.rowKey = data.columns[0].dataIndex as string;
      //   data.columns[0].isRowKey = true;
      // }

      // input.get(InputIds.SET_DATA_SOURCE).setSchema(schema);
      // data[`input${InputIds.SET_DATA_SOURCE}Schema`] = schema;
    },
  }),
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
              } catch (e) { }
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
        {},
        {
          title: "分页配置",
          items: [
            {
              title: "开启触底加载",
              type: "switch",
              value: {
                get({ data }) {
                  return data.enableLoadMore;
                },
                set({ data }, value) {
                  data.enableLoadMore = value;
                },
              },
            },
            {
              title: "起始页码",
              type: "Text",
              ifVisible: ({ data }) => {
                return data.enableLoadMore;
              },
              options: {
                type: "number",
              },
              value: {
                get({ data }) {
                  return data.pagenation.page;
                },
                set({ data }, value: number) {
                  if (value) {
                    data.pagenation.page = +value;
                  }
                },
              },
            },
            {
              title: "每次加载条数",
              type: "Text",
              ifVisible: ({ data }) => {
                return data.enableLoadMore;
              },
              options: {
                type: "number",
              },
              value: {
                get({ data }) {
                  return data.pagenation.pageSize;
                },
                set({ data }, value: number) {
                  if (value) {
                    data.pagenation.pageSize = +value;
                  }
                },
              },
            },
            {
              title: "当触发加载时",
              type: "_event",
              ifVisible: ({ data }) => {
                return data.enableLoadMore;
              },
              options: {
                outputId: "onScrollLoad",
              },
            },
          ],
        },
      ];
      cate1.title = "高级";
      cate1.items = [
        // {
        //   title: "升级",
        //   type: "button",
        //   value: {
        //     set({ input }: EditorResult<Data>) {
        //       input.add({
        //         id: "noMore",
        //         title: "切换到加载完毕",
        //         desc: "切换到加载完毕状态，且不再触底加载",
        //         schema: { type: "any" },
        //         deletable: true,
        //         editable: true,
        //       });
        //     },
        //   },
        // },
      ];
    },
  },
  ".mybricks-thead .mybricks-col": {
    "@dblclick": {
      type: "text",
      value: {
        get({ data, focusArea }) {
          let _id = focusArea.ele.dataset.id;
          console.log("table focusArea",focusArea)
          let index = data.columns.findIndex((column) => {
            return column._id === _id;
          });

          return data.columns[index].title;
        },
        set({ data, focusArea, slots }, value) {
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
          title: "表格列头背景色",
          description: "单独配置列头背景色",
          type: "colorpicker",
          value: {
            get({ data }) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              return data.columns[index].bgColor;
            },
            set({ data }, value) {
              let _id = focusArea.ele.dataset.id;
              let index = data.columns.findIndex((column) => {
                return column._id === _id;
              });

              console.log("set", value, "index", index);

              let columns = [...data.columns];
              columns[index].bgColor = value;
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
