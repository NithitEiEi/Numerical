import { cramer } from "./linearMethod";

const sumX = (x:number[], square:number) => {
  const xSquare = x.map((element) => element ** square);
  const xSum = xSquare.reduce((accumulator, currentValue) => accumulator + currentValue,0);
  return xSum;
};

const sumXY = (x:number[], y:number[], m:number) => {
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

const createZeroMatrix = (m:number) => {
  const matrix:number[][] = [];
  for (let i = 0; i < m + 1; i++) {
    matrix[i] = [];
    for (let j = 0; j < m + 1; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
};

export const linearLeastSquares = (x:number[], y:number[], m:number, target:number) => {
  let answer = 0;
  let start = 0;
  let end = 0;
  const matrixA = createZeroMatrix(m);
  for (let row = 0; row < matrixA.length; row++) {
    for (let col = 0; col < matrixA.length; col++) {
      if (row == 0 && col == 0) {
        matrixA[row][col] = x.length;
      } else {
        matrixA[row][col] = sumX(x, row + col);
      }
    }
  }
  const matrixB = sumXY(x, y, m);
  const result = cramer(matrixA, matrixB);
  console.log(result);
  
  for (let i = 0; i < m + 1; i++) {
    answer += result[i] * target ** i;
    start += result[i] * x[0] ** i;
    end += result[i] * x[x.length-1] ** i;
  }
  
  return {
        answer: answer,
        start: start,
        end: end
        }
};