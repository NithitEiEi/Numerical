import { cramer } from "./linearMethod";

export const findMax = (x: number[][]) => {
  let max = x[0][0];

  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x[i].length; j++) {
      if (x[i][j] > max) {
        max = x[i][j];
      }
    }
  }

  return max;
}

export const findMin = (x: number[][]) => {
  let min = x[0][0];

  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < x[i].length; j++) {
      if (x[i][j] < min) {
        min = x[i][j];
      }
    }
  }

  return min;
}

const sumX = (x: number[], square: number) => {
  const xSquare = x.map((element) => element ** square);
  const xSum = xSquare.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return xSum;
};

const sumXY = (x: number[], y: number[], m: number) => {
  const newMatrixB = [];
  for (let i = 0; i < m + 1; i++) {
    let value = 0;
    for (let j = 0; j < x.length; j++) {
      value += x[j] ** i * y[j];
    }
    newMatrixB.push(value);
  }
  return newMatrixB;
};

const createZeroMatrix = (m: number) => {
  const matrix: number[][] = [];
  for (let i = 0; i < m + 1; i++) {
    matrix[i] = [];
    for (let j = 0; j < m + 1; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
};

const createMultipleMatrix = (x: number[][]) => {
  const matrix: number[][] = [];
  for (let i = 0; i < x[0].length + 1; i++) {
    matrix[i] = [];
    for (let j = 0; j < x[0].length + 1; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
};

const getX = (x: number[][], col: number) => {
  const xn = [];
  for (let row = 0; row < x.length; row++) {
    xn.push(x[row][col]);
  }
  return xn;
};

const sumXX = (x1: number[], x2: number[]) => {
  const sum = [];
  for (let i = 0; i < x2.length; i++) {
    sum.push(x1[i] * x2[i]);
  }
  const xSum = sum.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return xSum;
};

const sumXnY = (x:number[][], y:number[]) => {
  let matrixB = [];
  const result = [sumX(y, 1)];
  for(let j = 0; j < x[0].length; j ++) {
    matrixB = [];
    for(let i = 0; i < x.length; i++) {
      const xn = getX(x, j);
      matrixB.push(xn[i] * y[i]);
    }
    let value = sumX(matrixB, 1);
    result.push(value);
    
  }
  return result;
}

export const linearLeastSquares = (
  x: number[][],
  y: number[],
  m: number,
  target: number
) => {
  let answer = 0;
  let start = 0;
  let end = 0;
  const X = x.map((item) => item[0]);

  const matrixA = createZeroMatrix(m);
  for (let row = 0; row < matrixA.length; row++) {
    for (let col = 0; col < matrixA.length; col++) {
      if (row == 0 && col == 0) {
        matrixA[row][col] = x.length;
      } else {
        matrixA[row][col] = sumX(X, row + col);
      }
    }
  }
  const matrixB = sumXY(X, y, m);
  const result = cramer(matrixA, matrixB);

  for (let i = 0; i < m + 1; i++) {
    answer += result[i] * target ** i;
    start += result[i] * X[0] ** i;
    end += result[i] * X[X.length - 1] ** i;
  }

  return {
    answer: answer,
    start: start,
    end: end,
  };
};

export const multipleLinear = (x: number[][], y: number[], target: number) => {
  const matrixA = createMultipleMatrix(x);
  let answer = 0;
  let start = 0;
  let end = 0;  
  for (let row = 0; row < matrixA.length; row++) {
    for (let col = 0; col < matrixA[0].length; col++) {
      if( row == 0 && col == 0) {
        matrixA[row][col] = x.length;
      } else if (row == 0) {
            const xn = getX(x, col - 1);
            matrixA[row][col] = sumX(xn, 1);
      }  else if(col == 0) {
            const xn = getX(x, row - 1);
            matrixA[row][col] = sumX(xn, 1);

      } else {
            const xRow = getX(x, row - 1);
            const xCol = getX(x, col - 1);            
            matrixA[row][col] = sumXX(xRow, xCol);
          }
    }
  }
  const matrixB = sumXnY(x, y);
  const result = cramer(matrixA, matrixB);

  for(let i = 0; i < x[0].length; i++) {
    if(i == 0) {
      start += result[i];
      answer += result[i];
      end += result[i];
    } else {
      start += result[i] + findMin(x);
      answer += result[i] + target;
      end += result[i] + findMax(x);
    }
  }

  

  return {
    start: start,
    answer: answer,
    end: end
  }
};
