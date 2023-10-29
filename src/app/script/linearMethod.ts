import { det, inv, multiply, abs } from "mathjs";

const replace_column = (
  matrix: number[][],
  answer_matrix: number[],
  dimension: number,
  column: number
) => {
  const new_matrix: number[][] = matrix.map((row) => [...row]);
  for (let i = 0; i < dimension; i++) {
    new_matrix[i][column] = answer_matrix[i];
  }
  return new_matrix;
}

const find_det = (input: number[][]) => {
  const determinant = det(input);
  return determinant;
}

const partialPivot = (matrix: number[][], column: number) => {
  let maxRow = column;
  for (let i = column + 1; i < matrix.length; i++) {
    if (abs(matrix[i][column]) > abs(matrix[maxRow][column])) {
      maxRow = i;
    }
  }
  return maxRow;
}

export const cramer = (input: number[][], answer_input: number[]) => {
  const Answer = [];
  const dimension = input.length;
  const detA = find_det(input);
  for (let i = 0; i < dimension; i++) {
    let new_mat: number[][] = replace_column(input, answer_input, dimension, i);
    const detX = find_det(new_mat);
    Answer.push(detX / detA);
  }
  return Answer;
};

export const gaussElimination = (matrix: number[][]) => {
  const totalRows = matrix.length;
  const lastRowIndex = totalRows - 1;

  for (let pivotRow = 0; pivotRow < lastRowIndex; pivotRow++) {
    for (let row = pivotRow + 1; row < totalRows; row++) {
      const factor = matrix[row][pivotRow] / matrix[pivotRow][pivotRow];
      for (let col = pivotRow; col <= totalRows; col++) {
        matrix[row][col] -= factor * matrix[pivotRow][col];
      }
    }
  }

  const solution = new Array(totalRows).fill(0);

  for (let row = lastRowIndex; row >= 0; row--) {
    let sum = 0;
    for (let col = row + 1; col < totalRows; col++) {
      sum += matrix[row][col] * solution[col];
    }
    solution[row] = (matrix[row][totalRows] - sum) / matrix[row][row];
  }

  return solution;
};

export function gaussJordanElimination(matrix: number[][]) {
  const n = matrix.length;
  const solution = new Array(n).fill(0);

  for (let col = 0; col < n; col++) {
    const pivotRow = partialPivot(matrix, col);
    if (matrix[pivotRow][col] === 0) {
      matrix.pop();
      for (let i = 0; i < n-1; i++) {
        solution[i] = matrix[i][n];
      }
      return solution;
    }

    [matrix[col], matrix[pivotRow]] = [matrix[pivotRow], matrix[col]];

    const pivot = matrix[col][col];
    for (let i = col; i < n + 1; i++) {
      matrix[col][i] /= pivot;
    }
    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = matrix[row][col];
        for (let i = col; i < n + 1; i++) {
          matrix[row][i] -= factor * matrix[col][i];
        }
      }
    }
  }
  for (let i = 0; i < n; i++) {
    solution[i] = matrix[i][n];
  }

  return solution;
}

export const inverseMatrix = (matrix:number[][] ,answerMatrix:number[]) => {
  let inverseMatrixA = inv(matrix);
  const answer = multiply(inverseMatrixA,answerMatrix);
  return answer;
}

export const LU = (Ax: number[][], B: number[]): number[] => {
  const n = Ax.length;

  const L: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const U: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    L[i][i] = 1;
  }

  for (let i = 0; i < n; i++) {
    for (let k = i; k < n; k++) {
      let sum = 0;

      for (let j = 0; j < i; j++) {
        sum += L[i][j] * U[j][k];
      }
      U[i][k] = Ax[i][k] - sum;
    }

    for (let k = i; k < n; k++) {
      let sum = 0;

      for (let j = 0; j < i; j++) {
        sum += L[k][j] * U[j][i];
      }
      L[k][i] = (Ax[k][i] - sum) / U[i][i];
    }
  }

  const y: number[] = new Array(n);

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += L[i][j] * y[j];
    }
    y[i] = (B[i] - sum) / L[i][i];
  }
  const x: number[] = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += U[i][j] * x[j];
    }
    x[i] = (y[i] - sum) / U[i][i];
  }
  return x;
}

export const cholesky = (Ax: number[][], B: number[]): number[] => {
  const n = Ax.length;

  const L: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    let sum = 0;

    for (let k = 0; k < i; k++) {
      sum += Math.pow(L[i][k], 2);
    }

    L[i][i] = Math.sqrt(Ax[i][i] - sum);

    for (let j = i + 1; j < n; j++) {
      let sum = 0;

      for (let k = 0; k < i; k++) {
        sum += L[i][k] * L[j][k];
      }

      L[j][i] = (Ax[j][i] - sum) / L[i][i];
    }
  }

  const y: number[] = new Array(n);

  for (let i = 0; i < n; i++) {
    let sum = 0;

    for (let j = 0; j < i; j++) {
      sum += L[i][j] * y[j];
    }

    y[i] = (B[i] - sum) / L[i][i];
  }

  const x: number[] = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;

    for (let j = i + 1; j < n; j++) {
      sum += L[j][i] * x[j];
    }

    x[i] = (y[i] - sum) / L[i][i];
  }

  return x;
}

export const jacobi = (A:number[][], b:number[], x0:number[]) => {
  let answers = [...x0];
  let calAns = [...x0];
  const check = 1e-6;
  let diff = 0, loop = 0;

  while (loop < 100) {
    for (let i = 0; i < A.length; i++) {
      let sum = 0;

      for (let j = 0; j < A.length; j++) {
        if (j != i) {
          sum += A[i][j] * calAns[j];
        }
      }

      let old = calAns[i];
      answers[i] = (b[i] - sum) / A[i][i];
      let new_var = answers[i];
      diff = Math.abs(new_var - old);
    }
    if (diff < check) {
      break;
    }
    calAns = [...answers];
    loop++;
  }
  return answers;
}

export const seidel = (A: number[][], b: number[], x0: number[]) => {
  let answers = [...x0];
  let loop = 0;
  const maxLoops = 10;
  const check = 1e-6;

  while (loop < maxLoops) {
    let maxDiff = 0;

    for (let i = 0; i < A.length; i++) {
      let sum = 0;
      for (let j = 0; j < A.length; j++) {
        if (j !== i) {
          sum += A[i][j] * answers[j];
        }
      }

      let old_var = answers[i];
      answers[i] = (b[i] - sum) / A[i][i];
      let new_var = answers[i];

      let diff = abs(new_var - old_var);

      maxDiff = Math.max(maxDiff, diff);
    }

    if (maxDiff < check) {
      break
    }

    loop++;
  }
  return answers;
};

export const conjugateGradient = (
  Ax: number[][],
  B: number[],
  x0: number[],
): number[] => {
  const dotProduct = (a: number[], b: number[]) => {
    return a.reduce(
      (acc: number, val: number, index: number) => acc + val * b[index],
      0,
    );
  };

  const matrixVectorMult = (A: number[][], vec: number[]) => {
    return A.map((row) => dotProduct(row, vec));
  };

  const subtractVectors = (a: number[], b: number[]) => {
    return a.map((val, index) => val - b[index]);
  };

  const addVectors = (a: number[], b: number[]) => {
    return a.map((val, index) => val + b[index]);
  };

  const scalarMult = (scalar: number, vec: number[]) => {
    return vec.map((val) => scalar * val);
  };

  let x = [...x0];
  let r = subtractVectors(B, matrixVectorMult(Ax, x0));
  let p = [...r];
  let rsold = dotProduct(r, r);

  for (const i of Ax) {
    const Ap = matrixVectorMult(Ax, p);
    const alpha = rsold / dotProduct(p, Ap);
    x = addVectors(x, scalarMult(alpha, p));
    r = subtractVectors(r, scalarMult(alpha, Ap));

    const rsnew = dotProduct(r, r);
    if (Math.sqrt(rsnew) < 1e-10) break;
    p = addVectors(r, scalarMult(rsnew / rsold, p));
    rsold = rsnew;
  }

  return x;
}