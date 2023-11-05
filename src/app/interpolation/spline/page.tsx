"use client";

import { graphInter } from "@/app/component/graphInter";
import { linearSpline, quadraticSpline } from "@/app/script/interpolateMethod";
import { useState } from "react";

export default function Page() {
  const [x, setX] = useState<string[]>(["", ""]);
  const [y, setY] = useState<string[]>(["", ""]);
  const [field, setField] = useState("2");
  const [target, setTarget] = useState("");
  const [ans, setAns] = useState("");
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [ansData, setAnsData] = useState<{ x: number; y: number }[]>([]);
  const [curve, setCurve] = useState(false);

  const handleField = () => {
    const newX = [];
    const newY = [];
    const oldX = [...x];
    const oldY = [...y];
    
    for (let i = 0; i < Number(field); i++) {
      newX.push("");
      newY.push("");
    }
    for (let i = 0; i < Number(field); i++) {
      newX[i] = oldX[i];
      newY[i] = oldY[i];
    }

    setX(newX);
    setY(newY);
    setAns("");
  };

  const calculate = (mode:string) => {
    const parameterX = x.map((value) => Number(value));
    const parameterY = y.map((value) => Number(value));


    if(mode === "quadratic") {
      const result = quadraticSpline(parameterX, parameterY, Number(target));
      setAns(String(result.answer));
      setData(result.data);
      setAnsData([{x: Number(target), y: result.answer}])
      setCurve(true);
    } else if(mode === "linear") {
      const result = linearSpline(parameterX, parameterY, Number(target));
      setAns(String(result.answer));
      setData(result.data);
      setAnsData([{x: Number(target), y: result.answer}])
      setCurve(false);
    }
  };

  const clear = () => {
    const newX = [];
    const newY = [];
    const newP: boolean[] = [];
    for (let i = 0; i < Number(field); i++) {
      newP.push(false);
      newX.push("");
      newY.push("");
    }
    setTarget("");
    setX(newX);
    setY(newY);
    setAns("");
  };

  return (
    <>
      <div className="mt-12 flex justify-center items-center">
        <div className="mb-16 p-8 grid grid-cols-12 border-2 border-amber-400 w-1/2 gap-4">
          <div className="col-span-12 text-2xl font-bold">
            Spline Interpolation
          </div>
          <input
            id="field"
            className="col-span-3 border-amber-500 p-2 focus:outline-amber-700 text-lg"
            type="number"
            min={2}
            max={10}
            value={field}
            placeholder="Field (2-10)"
            onChange={(e) =>
              Number(e.currentTarget.value) > 10
                ? setField("10")
                : Number(e.currentTarget.value) < 2
                ? setField("2")
                : setField(e.currentTarget.value)
            }
          />
          <input
            id="target"
            className="col-span-3 border-amber-500 p-2 focus:outline-amber-700 text-lg
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            placeholder="Target"
            value={target}
            onChange={(e) => setTarget(e.currentTarget.value)}
          />
          <button
            className="col-span-3 bg-amber-300 hover:bg-amber-400 font-bold py-2 px-4 border-b-4 border-amber-500 active:border-b-0 rounded focus:outline-amber-600"
            onClick={handleField}
          >
            Generate
          </button>
          <button
            className="h-12 flex justify-center items-center col-span-3 bg-amber-300 hover:bg-amber-400 font-bold py-2 px-4 border-b-4 border-amber-500 active:border-b-0 rounded focus:outline-amber-600"
            onClick={clear}
          >
            <svg
              className="h-7 w-7 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              {" "}
              <polyline points="3 6 5 6 21 6" />{" "}
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
              <line x1="10" y1="11" x2="10" y2="17" />{" "}
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
          <div className="col-span-12 grid grid-flow-col ml-4">
            <div className="text-xl font-bold">Given</div>
          </div>
          {x.map((item, index) => (
            <div key={index} className="col-span-12 grid grid-flow-col gap-4">
              <input
                id={`X${index}`}
                className="w-full border-amber-500 border-2 p-2 focus:outline-amber-700 text-lg
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                value={x[index]}
                placeholder={`X${index}`}
                onChange={(e) => {
                  const xNew = [...x];
                  xNew[index] = e.currentTarget.value;
                  setX(xNew);
                }}
              />
              <input
                id={`Y${index}`}
                className="w-full border-amber-500 border-2 p-2 focus:outline-amber-700 text-lg
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                placeholder={`Y${index}`}
                value={y[index]}
                onChange={(e) => {
                  const yNew = [...y];
                  yNew[index] = e.currentTarget.value;
                  setY(yNew);
                }}
              />
            </div>
          ))}
          <button
            className="h-12 col-span-4 bg-amber-500 hover:bg-amber-400 font-bold py-2 px-4 border-b-4 border-amber-700 active:border-b-0 rounded focus:outline-amber-600"
            onClick={() => calculate("linear")}
          >
            Linear
          </button>
          <button
            className="h-12 col-span-4 bg-amber-500 hover:bg-amber-400 font-bold py-2 px-4 border-b-4 border-amber-700 active:border-b-0 rounded focus:outline-amber-600"
            onClick={() => calculate("quadratic")}
          >
            Quadratic
          </button>
          <button
            hidden
            className="h-12 col-span-4 bg-amber-500 hover:bg-amber-400 font-bold py-2 px-4 border-b-4 border-amber-700 active:border-b-0 rounded focus:outline-amber-600"
            onClick={() => calculate("cubic")}
          >
            Cubic
          </button>
          <div className="col-span-8 flex items-center text-lg text-amber-600 font-bold">
            Ans {ans}
          </div>
          <div className="col-span-12 w-full px-10 h-72">
            {graphInter(data, ansData, curve)}
          </div>
        </div>
      </div>
    </>
  );
}
