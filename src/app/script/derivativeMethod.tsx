import { evaluate, derivative } from "mathjs";

const diff = (equation:string, n:number) => {
    let diff = derivative(equation, "x").toString();
    for(let i = 0; i < n - 1;i++) {
        diff = derivative(diff, "x").toString();
    }
    return diff;
}

export const firstDiff = (equation: string, error: number ,x: number, h: number, mode: string) => {
    switch(mode){
        case "backward":
            switch(error){
                case 1: return {approx: (evaluate(equation, { x: x }) - evaluate(equation, { x: x-h })) / h, exact: evaluate(diff(equation, 1), {x:x})};
                case 2: return {approx: (3*evaluate(equation, { x: x }) - 4*evaluate(equation, { x: x-h }) + evaluate(equation, {x: x-h*2})) / (2 * h), exact: evaluate(diff(equation, 1), {x:x})};
            }
        case "forward":
            switch(error){
                case 1: return {approx: (evaluate(equation, { x: x+h }) - evaluate(equation, { x: x })) / h, exact: evaluate(diff(equation, 1), {x:x})};
                case 2: return {approx: (-evaluate(equation, { x: x+2*h }) + 4*evaluate(equation, { x: x+h }) - 3*evaluate(equation, { x: x })) / (2 * h), exact: evaluate(diff(equation, 1), {x:x})};
            }
        case "central":
            switch(error){
                case 1: return {approx: (evaluate(equation, { x: x+h }) - evaluate(equation, { x: x-h })) / (2 * h), exact: evaluate(diff(equation, 1), {x:x})};
                case 2: return {approx: (-evaluate(equation, { x: x+2*h })+ 8*evaluate(equation, { x: x+h }) - 8*evaluate(equation, { x: x-h }) + evaluate(equation, { x: x-2*h })) / (12 * h), exact: evaluate(diff(equation, 1), {x:x})};
            }
    }
}

export const secondDiff = (equation: string, error: number, x: number, h:number, mode: string) => {
    switch(mode){
        case "backward":
            switch(error){
                case 1: return {approx: (evaluate(equation, { x: x }) - 2*evaluate(equation, { x: x-h }) + evaluate(equation, { x: x-(2*h) })) / h**2, exact: evaluate(diff(equation, 2), { x:x })};
                case 2: return {approx: (2*evaluate(equation, { x: x }) - 5*evaluate(equation, { x: x-h }) + 4*evaluate(equation, {x: x-(h*2)}) - evaluate(equation, {x: x-(h*3)})) / h**2, exact: evaluate(diff(equation, 2), {x:x})};
            }
        case "forward":
            switch(error){
                case 1: return {approx: (evaluate(equation, { x: x+(2*h) }) - 2*evaluate(equation, { x: x+h }) + evaluate(equation, { x: x })) / h**2, exact: evaluate(diff(equation, 2), { x:x })};
                case 2: return {approx: (-evaluate(equation, { x: x+(3*h) }) + 4*evaluate(equation, { x: x+(2*h) }) - 5*evaluate(equation, { x: x+h }) + 2*evaluate(equation, { x: x })) / h**2, exact: evaluate(diff(equation, 2), {x:x})};
            }
        case "central":
            switch(error){
                case 1: return {approx: (evaluate(equation, { x: x+h }) - 2*evaluate(equation, { x: x }) + evaluate(equation, { x: x-h })) / h**2, exact: evaluate(diff(equation, 2), { x:x })};
                case 2: return {approx: (-evaluate(equation, { x: x+(2*h) }) + 16*evaluate(equation, { x: x+h }) - 30*evaluate(equation, { x: x }) + 16*evaluate(equation, { x: x-h }) - evaluate(equation, { x: x-2*h })) / (12 * h**2), exact: evaluate(diff(equation, 2), {x:x})};
            }
    }   
}