import { gaussJordanElimination } from "./linearMethod";

export const newtonDivide = (x:number[],y:number[],target: number, points?: number[]): number => {

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

  console.log(result)
  return result;
}

export const lagrange = (x:number[], y:number[], target:number, point:number[]) => {
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
}

function scope(x:number[], target:number) {
  let check = 0;
  while(target > x[check]) {
    check++;
  }
  return check - 1
}

export const linearSpline = (x:number[], y:number[], target:number) => {
  let m = 0;
  const range = scope(x, target);

  m = (y[range + 1] - y[range]) / (x[range + 1] - x[range]);

  const targetFx = m * (target - x[range]) + y[range];
  return targetFx
}

export function quadraticSpline(x:number[], y:number[], target:number) {
  const point_quantity = x.length;
  const row_size = 2 * point_quantity + 2;
  const col_size = 13;
  const matrix:number[][] = [];
  let changeCol = 0;
  let changeX:number = 1;

  let range = scope(x,target);  

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
  for (let row = 2; row < row_size - 3; row += 2) {
    for (let col = 2; col >= 0; col--) {
      matrix[row - 1][col + changeCol] = Math.pow(x[changeX - 1], 2 - col);
      matrix[row][col + changeCol] = Math.pow(x[changeX], 2 - col);
    }
    matrix[row - 1][col_size - 1] = y[changeX - 1];
    matrix[row][col_size - 1] = y[changeX];
    changeCol += 3;
    changeX++;
  }

  let nextVar = 0;
  let multiple:number = 0;
  // x slope
  for (let row = 0; row < point_quantity - 2; row++) {
    multiple = 2;
    for (let col = 0 + nextVar; col < point_quantity - 2 + nextVar; col++) {
      if (col == 1 + nextVar) {
        matrix[row + row_size - 3][col] = 1;
        matrix[row + row_size - 3][col + 3] = -1;
      } else {
        matrix[row + row_size - 3][col] = multiple * x[row + 1];
        matrix[row + row_size - 3][col + 3] = multiple * x[row + 1] * -1;
      }
      multiple--;
    }
    nextVar += 3;
  }
  console.log(matrix);
  
  // return matrix
  const variable = gaussJordanElimination(matrix);
  let answer = 0;
  multiple= 2;
  for(let i = range * 3; i < (range * 3) + 3; i++){
    if(multiple == 0) {
    answer += variable[i] 
    }
    else {
      answer += variable[i] * target**multiple;
    }
    multiple--;
  }
  console.log(answer);
  
  return answer;
}