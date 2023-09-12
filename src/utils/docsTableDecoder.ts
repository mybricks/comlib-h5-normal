interface Cell {
  text: string;
  rowSpan?: number;
  colSpan?: number;
}
export const convertHtmlToJSON = (htmlString: string): any => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const table = doc.querySelector('table');
  if (!table) throw new Error('No table found in provided HTML');

  const rows = table.querySelectorAll('tr');
  let jsonArray: Cell[][] = [];

  rows.forEach((row, rowIndex) => {
    if (!jsonArray[rowIndex]) {
      jsonArray[rowIndex] = [];
    }
    const cells = row.querySelectorAll('td');
    cells.forEach((cell) => {
      const text = extractAllTextFromCell(cell);
      const rowSpan = cell.hasAttribute('rowspan') ? parseInt(cell.getAttribute('rowspan') || '1', 10) : 1;
      const colSpan = cell.hasAttribute('colspan') ? parseInt(cell.getAttribute('colspan') || '1', 10) : 1;

      for (let i = 0; i < rowSpan; i++) {
        for (let j = 0; j < colSpan; j++) {
          if (i === 0 && j === 0) {
            jsonArray[rowIndex + i].push({
              text,
              ...(rowSpan && rowSpan > 1 ? { rowSpan } : {}),
              ...(colSpan && colSpan > 1 ? { colSpan } : {}),
            });
          } else {
            if (!jsonArray[rowIndex + i]) {
              jsonArray[rowIndex + i] = [];
            }
            jsonArray[rowIndex + i].push({ text: '文本' });
          }
        }
      }
    });
  });

  return jsonArray;
};

export const getTableJsonColumnsInfo = (jsonArray: Cell[][]): any => {
  const longestRow = jsonArray.reduce((max, row) => Math.max(max, row.length), 0);
  return Array(longestRow).fill({ width: 30 });
};

const extractAllTextFromCell = (cell: Element): string => {
  let texts: string[] = [];
  cell.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elem = node as Element;
      texts.push(elem.textContent || '');
    } else if (node.nodeType === Node.TEXT_NODE) {
      texts.push(node.nodeValue || '');
    }
  });
  return texts.join('').trim();
};
