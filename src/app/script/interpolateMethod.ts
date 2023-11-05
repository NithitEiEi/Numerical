import { gaussJordanElimination } from "./linearMethod";

export const newtonDivide = (
  x: number[],
  y: number[],
  target: number,
  points?: number[]
): number => {
  const array: number[][] = new Array(x.length)
    .fill(false)
    .map(() => new Array(x.length).fill(false));

  array[0][0] = y[0];

  for (let i = 1; i < x.length; i++) {
    array[1][i - 1] = (y[i] - y[i - 1]) / (x[i] - x[i - 1]);
  }

  for (let i = 2; i < x.length; i++) {
    for (let j = 1; j < x.length - i + 1; j++) {
      array[i][j - 1] = array[i - 1][j] - array[i - 1][j - 1];
      array[i][j - 1] /= x[j + i - 1] - x[j - 1];
    }
  }

  let result = array[0][0];

  for (let i = 1; i < array.length; i++) {
    let temp = array[i][0];

    for (let j = 0; j < i; j++) {
      temp *= target - x[i];
    }

    result += temp;
  }

  console.log(result);
  return result;
};

export const lagrange = (
  x: number[],
  y: number[],
  target: number,
  point: number[]
) => {
  const quantity = point.length;
  const xn = [];
  const yn = [];
  let ans = 0;
  for (let i = 0; i < quantity; i++) {
    xn.push(x[point[i]]);
    yn.push(y[point[i]]);
  }
  for (let i = 0; i < quantity; i++) {
    let top = 1,
      bot = 1;
    for (let j = 0; j < quantity; j++) {
      if (j != i) {
        top = top * (xn[j] - target);
        bot = bot * (xn[j] - xn[i]);
      }
    }
    ans = ans + (top / bot) * yn[i];
  }

  return ans;
};

function scope(x: number[], target: number) {
  let check = 0;
  while (target > x[check]) {
    check++;
  }
  return check - 1;
}

const findAns = (value: number, range: number, variable: number[]) => {
  let answer = 0;
  let multiple = 2;
  for (let i = 0; i < +3; i++) {
    if (multiple == 0) {
      answer += variable[i + range * 3];
    } else {
      answer += variable[i + range * 3] * value ** multiple;
    }
    multiple--;
  }
  return answer;
};

export const linearSpline = (x: number[], y: number[], target: number) => {
  let m = 0;
  const range = scope(x, target);

  m = (y[range + 1] - y[range]) / (x[range + 1] - x[range]);

  const targetFx = m * (target - x[range]) + y[range];
  const data = x.map((value, index) => ({
    x: value,
    y: y[index],
  }));
  return { answer: targetFx, data: data };
};

export function quadraticSpline(x: number[], y: number[], target: number) {
  const points = x.length;
  const row_size = 2 * (points - 2) + 2 + (points - 2) + 1;
  const col_size = 3 * (points - 1) + 1;
  console.log(row_size, col_size);

  const matrix: number[][] = [];
  let changeCol = 0;
  let changeX: number = 1;

  // Initial matrix
  for (let i = 0; i < row_size; i++) {
    matrix[i] = [];
    for (let j = 0; j < col_size; j++) {
      matrix[i][j] = 0;
    }
  }

  // first row has only 1 in first column
  matrix[0][0] = 1;

  // Add x0 - xn
  let count = 0;
  for (let row = 2; row < row_size - (points - 2); row += 2) {
    for (let col = 2; col >= 0; col--) {
      matrix[row - 1][col + changeCol] = Math.pow(x[changeX - 1], 2 - col);
      matrix[row][col + changeCol] = Math.pow(x[changeX], 2 - col);
    }
    count++;
    matrix[row - 1][col_size - 1] = y[changeX - 1];
    matrix[row][col_size - 1] = y[changeX];
    changeCol += 3;
    changeX++;
  }

  let nextVar = 0;
  let multiple: number = 0;
  // x slope
  for (let row = 0; row < points - 2; row++) {
    multiple = 2;
    for (let col = 0; col < 2; col++) {
      if (col == 1) {
        matrix[row + row_size - (points - 2)][col + nextVar] = 1;
        matrix[row + row_size - (points - 2)][col + 3 + nextVar] = -1;
      } else {
        matrix[row + row_size - (points - 2)][col + nextVar] =
          multiple * x[row + 1];
        matrix[row + row_size - (points - 2)][col + 3 + nextVar] =
          multiple * x[row + 1] * -1;
      }
      multiple--;
    }
    nextVar += 3;
  }

  const variable = gaussJordanElimination(matrix);

  const dataX = [...x];
  const dataY = [...y];

  for (let i = 0; i < x.length * 2 - 2; i += 2) {
    const insertValue = (dataX[i] + dataX[i + 1]) / 2;
    dataX.splice(i + 1, 0, insertValue);

    dataY.splice(
      i + 1,
      0,
      findAns(insertValue, scope(x, insertValue), variable)
    );
  }

  const answer = findAns(target, scope(x, target), variable);
  const data = dataX.map((value, index) => ({
    x: value,
    y: dataY[index],
  }));
  return { answer: answer, data: data };
}
