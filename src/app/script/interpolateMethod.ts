export const newtonDivide = (x:number[],y:number[],target: number, points?: number[]): number => {
  // if (data.length < 2) {
  //   throw new Error("Not enough data to interpolate");
  // }

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