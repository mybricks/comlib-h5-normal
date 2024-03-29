import { CSSProperties } from "react";

import { uuid } from "../../utils";
import ColWidth, { WidthType } from "./ColWidth";
import { getColOutputId, getRowOutputId } from "./util";

export default {
  "@init"({ style }) {
    style.width = "100%";
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {

    cate0.title = '布局';
    cate0.items = [
      {
        title: "添加列",
        ifVisible({ data }) {
          return data.rows.length === 1;
        },
        type: "button",
        value: {
          set({ data, slots }) {
            const row = data.rows[0];
            addCol({ slots, row, colId: row.cols?.[0]?.id, type: "AFTER" });
          },
        },
      },
      {
        title: "添加行",
        type: "button",
        value: {
          set({ data, slots }) {
            addRow({
              data,
              slots,
              rowId: data.rows[data.rows.length - 1].id,
              type: "AFTER",
              title: `行${data.rows.length + 1}`,
            });
          },
        },
      },
      {
        title: "布局",
        type: "layout",
        value: {
          get({ data }) {
            return data.layout ?? { flexDirection: 'column' };
          },
          set({ data, slots }, ly) {
            data.layout = ly;
  
            data.rows.forEach((row) => {
              row.cols.forEach((col) => {
                /** 找到最终生效的CSS */
                const finalLayoutCss = {
                  ...(data?.layout ?? {}),
                  ...(row?.layout ?? {}),
                  ...(col?.layout ?? {}),
                };
                const slot = slots.get(col.id);
                /** 根据最终生效的CSS设置布局 */
                setSlotLayoutByCss(slot, finalLayoutCss);
              });
            });
          },
        },
      },
      {
        title: "单击",
        type: "_Event",
        options: {
          outputId: "click",
        },
      },
    ];
    cate1.title = '样式';
    cate1.items = [
      {
        title: "样式",
        type: "styleNew",
        options: ["background", "border", "padding", "boxshadow"],
        value: {
          get({ data }) {
            return (
              // 兜底编辑器 bug
              data.style ?? {
                paddingTop: "0px",
                paddingLeft: "0px",
                paddingBottom: "0px",
                paddingRight: "0px",
              }
            );
          },
          set({ data }, value) {
            console.error("set style", value);
            data.style = JSON.parse(JSON.stringify(value));
          },
        },
      },
    ]
  },
  // ":root": [
    
  // ],

  "div[data-col-id]": {
    title: '列',
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = '列';
      cate0.items = [
        {
          title: "固定宽度",
          type: "switch",
          value: {
            get({ data, focusArea }) {
              const colId = focusArea.dataset.colId;
              const col = getCol(data, colId);
              return typeof col.width === "number";
            },
            set({ data, focusArea }, val) {
              const colId = focusArea.dataset.colId;
              const col = getCol(data, colId);
  
              if (val) {
                if (!focusArea?.ele?.getBoundingClientRect) {
                  return;
                }
                const { width } = focusArea?.ele?.getBoundingClientRect();
                col.width = width;
              } else {
                col.width = WidthType.AUTO;
              }
            },
          },
        },
        {},
        {
          title: "布局",
          type: "layout",
          value: {
            get({ data, focusArea }) {
              const colId = focusArea.dataset.colId;
              const col = getCol(data, colId);
              return col.layout ?? { flexDirection: 'column' };
            },
            set({ data, slots, focusArea }, ly) {
              const colId = focusArea.dataset.colId;
              const col = getCol(data, colId);
              col.layout = ly;
  
              /** 设置layout属性 */
              const slot = slots.get(colId);
              setSlotLayoutByCss(slot, ly);
            },
          },
        },
        {},
        {
          title: "前移",
          type: "button",
          ifVisible({ data, focusArea }) {
            const colId = focusArea.dataset.colId;
            const row = getRowByColId(data, colId);
            return row?.cols?.[0]?.id !== colId;
          },
          value: {
            set({ data, focusArea }) {
              const colId = focusArea.dataset.colId;
              const row = getRowByColId(data, colId);
              swapCol({ row, colId, type: "BEFORE" });
            },
          },
        },
        {
          title: "后移",
          type: "button",
          ifVisible({ data, focusArea }) {
            const colId = focusArea.dataset.colId;
            const row = getRowByColId(data, colId);
            return row?.cols?.[row?.cols?.length - 1]?.id !== colId;
          },
          value: {
            set({ data, focusArea }) {
              const colId = focusArea.dataset.colId;
              const row = getRowByColId(data, colId);
              swapCol({ row, colId, type: "AFTER" });
            },
          },
        },
        {
          title: "向前添加一列",
          type: "button",
          value: {
            set({ data, slots, focusArea }) {
              const colId = focusArea.dataset.colId;
              const row = getRowByColId(data, colId);
              addCol({ slots, row, colId, type: "BEFORE" });
            },
          },
        },
        {
          title: "向后添加一列",
          type: "button",
          value: {
            set({ data, slots, focusArea }) {
              const colId = focusArea.dataset.colId;
              const row = getRowByColId(data, colId);
              addCol({ slots, row, colId, type: "AFTER" });
            },
          },
        },
        {},
        {
          title: "单击",
          type: "_Event",
          options: ({ data, focusArea, output }) => {
            if (!output) {
              return;
            }
            const colId = focusArea.dataset.colId;
            const col = getCol(data, colId);
  
            if (!output.get(getColOutputId(colId)) && col) {
              output.add(getColOutputId(colId), col.title, { type: "any" });
            }
            return {
              outputId: getColOutputId(colId),
            };
          },
        },
        {},
        {
          title: "删除",
          type: "button",
          ifVisible({ data, focusArea }) {
            const colId = focusArea.dataset.colId;
  
            const row = data.rows.find((row) => {
              if (
                row.cols.find((col) => {
                  if (col.id === colId) {
                    return true;
                  }
                })
              ) {
                return true;
              }
            });
  
            if (row && row.cols.length > 1) {
              return true;
            } else {
              return false;
            }
          },
          value: {
            set({ data, slots, focusArea }) {
              const colId = focusArea.dataset.colId;
  
              const row = data.rows.find((row) => {
                if (
                  row.cols.find((col) => {
                    if (col.id === colId) {
                      return true;
                    }
                  })
                ) {
                  return true;
                }
              });
  
              row.cols = row.cols.filter((col, idx) => {
                if (col.id === colId) {
                  if (idx === row.cols.length - 1) {
                    //最后
                    const prevCol = row.cols[idx - 1];
                    prevCol.width = "auto";
                  } else {
                    const nextCol = row.cols[idx + 1];
                    nextCol.width = "auto";
                  }
                } else {
                  return true;
                }
              });
  
              slots.remove(colId);
            },
          },
        },
      ];
      cate1.title = '样式';
      cate1.items = [
        {
          title: "样式",
          type: "styleNew",
          options: ["background", "border", "padding", "boxshadow"],
          value: {
            get({ data, focusArea }) {
              const colId = focusArea.dataset.colId;
              return getCol(data, colId)?.style ?? {};
            },
            set({ data, focusArea }, value) {
              const colId = focusArea.dataset.colId;
              const col = getCol(data, colId);
              col.style = value;
            },
          },
        },
      ];
    }
  },
  "div[data-row-id]": {
    title: '行',
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = '行';
      cate0.items = [
        {
          title: "布局",
          type: "layout",
          value: {
            get({ data, focusArea }) {
              const rowId = focusArea.dataset.rowId;
              const row = getRow(data, rowId);
              return row.layout ?? { flexDirection: 'column' };
            },
            set({ data, slots, focusArea }, ly) {
              const rowId = focusArea.dataset.rowId;
              const row = getRow(data, rowId);
  
              row.layout = ly;
  
              row.cols.forEach((col) => {
                /** 找到最终生效的CSS */
                const finalLayoutCss = {
                  ...(data?.layout ?? {}),
                  ...(row?.layout ?? {}),
                  ...(col?.layout ?? {}),
                };
                const slot = slots.get(col.id);
                /** 根据最终生效的CSS设置布局 */
                setSlotLayoutByCss(slot, finalLayoutCss);
              });
            },
          },
        },
        {},
        {
          title: "添加列",
          type: "button",
          value: {
            set({ data, slots, focusArea }) {
              const rowId = focusArea.dataset.rowId;
              const row = data.rows.find((row) => {
                return row.id === rowId;
              });
              addCol({
                slots,
                row,
                colId: row.cols?.[row.cols.length - 1]?.id,
                type: "AFTER",
              });
            },
          },
        },
        {
          title: "向上添加一行",
          type: "button",
          value: {
            set({ data, slots, focusArea }) {
              const rowId = focusArea.dataset.rowId;
              addRow({ data, slots, rowId, type: "BEFORE" });
            },
          },
        },
        {
          title: "向下添加一行",
          type: "button",
          value: {
            set({ data, slots, focusArea }) {
              const rowId = focusArea.dataset.rowId;
              addRow({ data, slots, rowId, type: "AFTER" });
            },
          },
        },
        {},
        {
          title: "单击",
          type: "_Event",
          options: ({ data, focusArea, output }) => {
            if (!output) {
              return;
            }
            const rowId = focusArea.dataset.rowId;
            const row = getRow(data, rowId);

  
            if (!output.get(getRowOutputId(rowId))) {
              output.add(getRowOutputId(rowId), row.title, { type: "any" });
            }
            return {
              outputId: getRowOutputId(rowId),
            };
          },
        },
        {},
        {
          title: "删除",
          type: "button",
          ifVisible({ data }) {
            if (data.rows.length > 1) {
              return true;
            } else {
              return false;
            }
          },
          value: {
            set({ data, slots, focusArea }) {
              const rowId = focusArea.dataset.rowId;
  
              data.rows = data.rows.filter((row) => {
                if (row.id === rowId) {
                  if (Array.isArray(row.cols)) {
                    row.cols.forEach((col) => {
                      slots.remove(col.id);
                    });
                  }
                } else {
                  return true;
                }
              });
            },
          },
        },
      ];
      cate1.title = '样式';
      cate1.items = [
        {
          title: "样式",
          type: "styleNew",
          options: ["background", "border", "padding", "boxshadow"],
          value: {
            get({ data, focusArea }) {
              const rowId = focusArea.dataset.rowId;
              return getRow(data, rowId)?.style ?? {};
            },
            set({ data, focusArea }, value) {
              const rowId = focusArea.dataset.rowId;
              const row = getRow(data, rowId);
              row.style = value;
            },
          },
        },
      ];
    }
  }
  
};

function getCol(data, colId) {
  let rtnCol;
  data.rows.forEach((row) => {
    row.cols.find((col) => {
      if (col.id === colId) {
        rtnCol = col;
      }
    });
  });

  return rtnCol;
}

/**
 * @description 通过rowId找到当前对应的row
 */
function getRow(data, rowId) {
  return data.rows.find((row) => row.id === rowId);
}

/**
 * @description 通过colId找到当前对应的父级row
 * @param data
 * @param colId
 */
function getRowByColId(data, colId) {
  let rtnRow;
  data.rows.some((row) => {
    if (Array.isArray(row.cols) && row.cols.some((col) => col.id === colId)) {
      rtnRow = row;
    }
  });
  return rtnRow;
}

/**
 * @description 向目标col的前方或者后方添加一列
 * @param colId 目标col
 * @param type BEFORE | AFTER
 * @returns
 */
function addCol({
  slots,
  row,
  colId,
  type,
  title = `列（纵向排列）`,
}: {
  slots: any;
  row: any;
  colId: string;
  type: "BEFORE" | "AFTER";
  title?: string;
}) {
  if (!Array.isArray(row?.cols)) {
    console.warn(`插入col失败，没有目标row`);
    return;
  }

  const id = uuid();
  const currentColIndex = row.cols.findIndex((col) => col.id === colId);

  row.cols.splice(
    type === "BEFORE" ? currentColIndex : currentColIndex + 1,
    0,
    {
      id,
      title,
      width: "auto",
    }
  );
  slots.add({ id, title });
  return;
}

/**
 * @description 交换col的位置，type === BEFORE 与前面一位交换，type === AFTER 与后面一位交换
 * @param colId 要移动的colId
 * @returns
 */
function swapCol({
  row,
  colId,
  type,
}: {
  row: any;
  colId: string;
  type: "BEFORE" | "AFTER";
}) {
  if (!Array.isArray(row?.cols)) {
    console.warn(`移动col失败，没有目标row`);
    return;
  }

  const currentColIndex = row.cols.findIndex((col) => col.id === colId);
  const targetColIndex =
    type === "BEFORE" ? currentColIndex - 1 : currentColIndex + 1;

  if (targetColIndex < 0 || targetColIndex > row.length - 1) {
    console.warn(`移动col失败，越界`);
    return;
  }

  [row.cols[currentColIndex], row.cols[targetColIndex]] = [
    row.cols[targetColIndex],
    row.cols[currentColIndex],
  ];
}

/**
 * @description 向目标row的前方或者后方添加一行
 * @param rowId 目标row
 * @param type BEFORE | AFTER
 * @returns
 */
function addRow({
  data,
  slots,
  rowId,
  type,
  title,
}: {
  data: any;
  slots: any;
  rowId: string;
  type: "BEFORE" | "AFTER";
  title?: string;
}) {
  const currentRowIndex = data.rows.findIndex((row) => row.id === rowId);
  const insertRowId = uuid(),
    rowTitle = title || `行${insertRowId}`;
  const cols: any = [];

  data.rows.splice(
    type === "BEFORE" ? currentRowIndex : currentRowIndex + 1,
    0,
    {
      id: insertRowId,
      title: rowTitle,
      height: "auto",
      cols,
    }
  );

  const col0Id = uuid(),
    col0Title = `列（竖向排列）`;
  cols.push({
    id: col0Id,
    title: col0Title,
    width: 100,
  });

  slots.add({
    id: col0Id,
    title: col0Title,
  });

  const col1Id = uuid(),
    col1Title = `列（竖向排列）`;
  cols.push({
    id: col1Id,
    title: col1Title,
    width: "auto",
  });

  slots.add({
    id: col1Id,
    title: col1Title,
  });
}

/**
 * 通过layoutEditor返回的CSSProperties设置slot的layout的
 * @param slot
 * @param cssStyles
 */
function setSlotLayoutByCss(slot: any, cssStyles: CSSProperties) {
  switch (true) {
    case cssStyles.position === "absolute": {
      slot.setLayout("absolute");
      slot.setTitle("列（自由排列）");
      break;
    }
    case cssStyles.position !== "absolute" && cssStyles.display === "flex": {
      if (cssStyles.flexDirection === "row") {
        slot.setLayout("flex-row");
        slot.setTitle("列（横向排列）");
      }
      if (cssStyles.flexDirection === "column") {
        slot.setLayout("flex-column");
        slot.setTitle("列（竖向排列）");
      }
      break;
    }
  }
}
