import { evaluate } from "mathjs";

const fx = (equation: string, x: any) => {
  return evaluate(equation, {x:x});
};

export const trapezoidal = (
  equation: string,
  n: number,
  x0: number,
  xn: number
) => {
  const data = [];
  const h = (xn - x0) / n;
  let area = fx(equation, x0) + fx(equation, xn);
  for (let i = x0; i <= xn; i += h) {
    if (i != x0 && i != xn) {
      area += 2 * fx(equation, i);
    }
    if(n != 1) data.push({ x: i, y: 2 * fx(equation, i) });
  }
  if (n == 1) {
    data.push({ x: (x0), y: fx(equation, x0) });
    data.push({ x: xn, y: fx(equation, xn) });
  }
  area = h/2 * area
  return { area: area, data: data };
};


export const simpson = (
    equation: string,
    n: number,
    x0: number,
    xn: number
) => {
    let point = 0;
    const data = []
    let area = fx(equation, x0) + fx(equation, xn);
    const h = (xn - x0) / (2 * n);
    for (let i = x0;i <= xn; i += h) {
        if(i != x0 && i != xn) {
            if(point % 2 != 0) {
                area += 4 * fx(equation, i);
                data.push({x: i,y: fx(equation, i)});
            } else {
                area += 2 * fx(equation, i);
                data.push({x: i,y: fx(equation, i)});
            }
        } else {
          data.push({x: i,y: fx(equation, i)});
        }
        point++
    }
    area = h/3 * area;
    return {area: area, data: data}
}