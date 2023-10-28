import { evaluate, abs, derivative } from "mathjs";

const fdx = (input: string) => {
  const derivativeValue = derivative(input, "x").toString();
  return derivativeValue;
};

export const graphical = (equation: string) => {
  const result = [];
  const accuracy = 1e-6;
  let sum = 0;
  let fx = evaluate(equation, { x: sum });
  let scale = fx / 10;
  let positive = true;
  fx > accuracy ? (positive = false) : positive;
  positive ? (sum += scale) : (sum -= scale);
  for (let i = 0; i < 1000; i++) {
    if (Number(fx) > accuracy) {
      if (positive) {
        sum += scale;
        scale /= 10;
        sum -= scale;
      } else {
        sum -= scale;
        scale /= 10;
        sum += scale;
      }
    } else if (Number(fx) < -accuracy) {
      positive ? (sum -= scale) : (sum += scale);
    } else if (Number(fx) < accuracy && Number(fx) > -accuracy) {
      break;
    }
    result.push({ x: i, y: sum });
    fx = evaluate(equation, { x: sum });
  }
  return result;
};

export const bisection = (equation: string, xl: number, xr: number) => {
  const array = [];
  let Xl = xl;
  let Xr = xr;
  let Xm;
  let loop = 0;
  let result;
  while (loop < 1000) {
    Xm = (Xl + Xr) / 2;
    array.push({x:loop , y: Xm });
    result = evaluate(equation, { x: Xm });
    if (result >= -1e-6 && result <= 1e-6) {
      break;
    } else if (result > 0) {
      Xr = Xm;
    } else if (result <= 0) {
      Xl = Xm;
    }
    loop++;
  }

  return array;
};

export const falsePosition = (xl: number, xr: number, equation: string) => {
  let Xl = xl,
    Xr = xr,
    X;
  let fXl, fXr, fX;
  let loop = 0;
  const array = [];

  while (loop < 1000) {
    fXl = evaluate(equation, { x: Xl });
    fXr = evaluate(equation, { x: Xr });
    X = (Number(Xl) * fXr - Number(Xr) * fXl) / (fXr - fXl);
    array.push({x: loop, y: X });
    fX = evaluate(equation, { x: X });
    if (fX > -1e-6 && fX < 1e-6) {
      break;
    } else if (fX > 0) {
      Xr = X;
    } else if (fX <= 0) {
      Xl = X;
    }
    loop++;
  }
  return array;
};

export const onePoint = (initial: number, equation: string) => {
  let x = initial;
  let xNext;
  let gX;
  const gx = equation;
  const array = [];
  for (let i = 0; i < 1000; i++) {
    gX = evaluate(gx,{x:x});
    xNext = evaluate(gx, { x: x });
    if (abs(xNext - x) < 1e-6) {
      return array;
    }
    array.push({x:x, y: x });
    array.push({x:x, y: gX });
    x = xNext;
  }
  return array;
};

export const raphson = (initial: number, equation: string) => {
  const array = [];
  let x = initial;
  let loop = 0;
  let derivative = fdx(equation);
  let xNew;
  while (loop < 1000) {
    derivative = derivative.replace(/x/gi, String(x));
    xNew = x - evaluate(equation, { x: x }) / evaluate(derivative);
    if (abs(xNew - x) < 1e-6) {
      return array;
    }
    array.push({x: loop, y: xNew });
    x = xNew;
    loop++;
  }
  return array;
};

export const secant = (
  initial0: number,
  initial1: number,
  equation: string
) => {
  const array = [];
  let x0 = initial0;
  let x1 = initial1;
  let xNext;
  for (let i = 0; i < 1000; i++) {
    xNext =
      x1 -
      (evaluate(equation, { x: x1 }) * (x0 - x1)) /
        (evaluate(equation, { x: x0 }) - evaluate(equation, { x: x1 }));
    if (abs(xNext - x1) < 1e-6) {
      return array;
    }
    array.push({x: i, y: xNext });
    x0 = x1;
    x1 = xNext;
  }
  return array;
};
