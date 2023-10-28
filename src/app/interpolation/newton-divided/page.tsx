"use client";

import { graphInter } from "@/app/component/graphInter";
import { newtonDivide } from "@/app/script/interpolateMethod";
import { useState } from "react";

export default function Page() {
  const [x, setX] = useState<string[]>(["", ""]);
  const [y, setY] = useState<string[]>(["", ""]);
  const [field, setField] = useState("2");
  const [target, setTarget] = useState("");
  const [point, setPoint] = useState<boolean[]>([false, false]);
  const [ans, setAns] = useState("");
  const [data, setData] = useState<{ x: string; y: string }[]>([]);
  const [ansData, setAnsData] = useState<{ x: number; y: number }[]>([]);

  const handleField = () => {
    const newX = [];
    const newY = [];
    const newP: boolean[] = [];
    const oldX = [...x];
    const oldY = [...y];
    for (let i = 0; i < Number(field); i++) {
      newP.push(false);
      newX.push("");
      newY.push("");
    }
    for (let i = 0; i < Number(field); i++) {
      newX[i] = oldX[i];
      newY[i] = oldY[i];
    }

    setX(newX);
    setY(newY);
    setPoint(newP);
    setAns("");
  };

  const calculate = () => {
    const parameterX = x.map((value) => Number(value));
    const parameterY = y.map((value) => Number(value));
    const parameterP: number[] = [];

    point.map((value, index) => {
      if (point[index]) {
        parameterP.push(index);
      }
    });
    const trueCount = point.filter((item) => item === true).length;
    if (trueCount < 2) {
      return;
    }

    const result = newtonDivide(parameterX, parameterY, Number(target), parameterP);
    const GivenData = x.map((value, index) => ({
      x: value,
      y: y[index],
    }));
    setData(GivenData);
    setAnsData([{ x: Number(target), y: result }]);
    setAns(String(result));
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
    setPoint(newP);
    setAns("");
  };

  const handleCheck = (index: number) => {
    const newPointBool = [...point];
    newPointBool[index] = !newPointBool[index];
    setPoint(newPointBool);
  };

  return (
    <>
      <div className="mt-12 flex justify-center items-center">
        <div className="mb-16 p-8 grid grid-cols-12 border-2 border-amber-400 w-1/2 gap-4">
          <div className="col-span-12 text-2xl font-bold">
            Newton Divided
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
              Number(e.currentTarget.value) > 6
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
              <div className="flex items-center justify-center">
                <input
                  id={`check${index}`}
                  checked={point[index]}
                  type="checkbox"
                  readOnly
                  className="h-6 w-6 accent-amber-500"
                  onClick={() => handleCheck(index)}
                />
                <label htmlFor={`check${index}`} className="ml-5 font-bold">
                  {index}
                </label>
              </div>
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
            onClick={calculate}
          >
            Calculate
          </button>
          <div className="col-span-8 flex items-center text-lg text-amber-600 font-bold">
            Ans {ans}
          </div>
          <div className="col-span-12 w-full px-10 h-72">
            {graphInter(data, ansData)}
          </div>
        </div>
      </div>
    </>
  );
}