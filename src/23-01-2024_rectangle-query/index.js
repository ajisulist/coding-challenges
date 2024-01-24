function createRectangle(h, w) {
  // console.log(h, w);
  return Array(h).fill(Array(w).fill(1));
}

function executeQuery({
  rectangle,
  rowNumber,
  colNumber,
  rowIndex,
  colIndex,
  operator,
}) {
  if (rowIndex < rowNumber && colIndex < colNumber) {
    switch (operator) {
      case ">":
        for (let i = colIndex + 1; i < colNumber; i++) {
          if (rectangle[rowIndex][i] === 1) {
            return [rowIndex, i];
          }
        }
        break;
      case "<":
        for (let i = colIndex - 1; i >= 0; i--) {
          if (rectangle[rowIndex][i] === 1) {
            return [rowIndex, i];
          }
        }
        break;
      case "^":
        for (let i = rowIndex - 1; i >= 0; i--) {
          if (rectangle[i][colIndex] === 1) {
            return [i, colIndex];
          }
        }
        break;
      case "v":
        for (let i = rowIndex + 1; i < rowNumber; i++) {
          if (rectangle[i][colIndex] === 1) {
            return [i, colIndex];
          }
        }
        break;
      default:
        break;
    }
  }
  return [-1, -1];
}

function solution({ height, width, queries }) {
  let rectangle = createRectangle(height, width);
  let queryResult = [];

  for (const query of queries) {
    const [queryOperator, queryRow, queryCol] = query.split(" ");
    const rowIndex = Number(queryRow);
    const colIndex = Number(queryCol);

    if (queryOperator === "x") {
      rectangle = [
        ...rectangle.slice(0, rowIndex),
        [
          ...rectangle[rowIndex].slice(0, colIndex),
          0,
          ...rectangle[rowIndex].slice(colIndex + 1),
        ],
        ...rectangle.slice(rowIndex + 1),
      ];
    } else {
      queryResult = [
        ...queryResult,
        executeQuery({
          rectangle,
          rowNumber: height,
          colNumber: width,
          rowIndex,
          colIndex,
          operator: queryOperator,
        }),
      ];
    }
  }
  console.log(queryResult);
}

solution({
  height: 3,
  width: 5,
  queries: ["v 1 2", "x 2 2", "v 1 2", "> 2 1", "x 2 3", "> 2 1", "< 2 0"],
});
