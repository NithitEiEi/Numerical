import { evaluate, derivative } from "mathjs";

const diff = (equation:string) => {
    return derivative(equation, "x").toString();
}

export const firstDiff = (equation: string, error: number ,x: number, h: number, mode: string) => {
    switch(mode){
        case "backward":
            switch(error){
                case 1: return {approx: (evaluate(equation, { x: x }) - evaluate(equation, { x: x-h })) / h, exact: evaluate(diff(equation), {x:x})};
                // case 2: return (3*evaluate(equation, { x: x }) - 4*evaluate(equation, { x: x-h }) + evaluate(equation, {x: x-h*2})) / (2 * h);
            }
        // case "forward":
        //     switch(error){
        //         case 1: return (evaluate(equation, { x: x+h }) - evaluate(equation, { x: x })) / h;
        //         case 2: return (-evaluate(equation, { x: x+2*h }) + 4*evaluate(equation, { x: x+h }) - 3*evaluate(equation, { x: x })) / (2 * h);
        //     }
        // case "central":
        //     switch(error){
        //         case 1: return (evaluate(equation, { x: x+h }) - evaluate(equation, { x: x-h })) / (2 * h);
        //         case 2: return (-evaluate(equation, { x: x+2*h })+ 8*evaluate(equation, { x: x+h }) - 8*evaluate(equation, { x: x-h }) + evaluate(equation, { x: x-2*h })) / (12 * h);
        //     }
    }
}