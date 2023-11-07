"use client";

import { graphRegression } from "../component/regressionGraph";
import {
  linearLeastSquares,
  multipleLinear,
  findMax,
  findMin,
} from "../script/regressionMethod";
import { useState } from "react";

export default function Page() {
  const [x, setX] = useState<string[][]>([[""], [""]]);
  const [y, setY] = useState<string[]>(["", ""]);
  const [field, setField] = useState("2");
  const [multipleValue, setMultipleValue] = useState("1");
  const [target, setTarget] = useState("");
  const [m, setM] = useState("");
  const [ans, setAns] = useState("");
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [ansData, setAnsData] = useState<{ x: number; line: number }[]>([]);

  const handleField = () => {
    const newX: any[] = [];
    const newY: any[] = [];

    for (let i = 0; i < Number(field); i++) {
      newX[i] = [];
      newY.push("");
      for (let j = 0; j < Number(multipleValue); j++) {
        newX[i].push("");
      }
    }

    setX(newX);
    setY(newY);
    setAns("");
  };

  const calculate = () => {
    const parameterX = x.map((value, row) =>
      x[row].map((value, col) => parseFloat(value))
    );
    const parameterY = y.map((value) => Number(value));
    console.log(parameterX);
    console.log(parameterY);
    if (Number(multipleValue) == 1) {
      const result = linearLeastSquares(
        parameterX,
        parameterY,
        Number(m),
        Number(target)
      );
      const givenAnswer = [
        { x: Number(findMin(parameterX)), line: result.start },
        { x: Number(target), line: result.answer },
        { x: Number(findMax(parameterX)), line: result.end },
      ];

      setAnsData(givenAnswer);
      setAns(String(result.answer));
    } else if (Number(multipleValue) > 1) {
      const result = multipleLinear(parameterX, parameterY, Number(target));
      const givenAnswer = [
        { x: Number(findMin(parameterX)), line: result.start },
        { x: Number(target), line: result.answer },
        { x: Number(findMax(parameterX)), line: result.end },
      ];

      setAnsData(givenAnswer);
      setAns(String(result.answer));
    }

    const giveData = [];

    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[0].length; j++) {
        giveData.push({
          x: parameterX[i][j],
          y: parameterY[i],
        });
      }
    }
    setData(giveData);
  };

  const clear = () => {
    const newX = [];
    const newY = [];
    const newP: boolean[] = [];
    for (let i = 0; i < Number(field); i++) {
      const row = [];
      for (let j = 0; j < Number(multipleValue); j++) {
        row.push("");
      }
      newX.push(row);
      newP.push(false);
      newY.push("");
    }
    console.log(newX);

    setTarget("");
    setX(newX);
    setY(newY);
    setAns("");
  };

  const handleChange = (row: number, col: number, value: any) => {
    const newMatrix = [...x];
    newMatrix[row][col] = value;
    setX(newMatrix);
  };

  return (
    <>
    <title>Least-Square Regression</title>
      <div className="mt-12 flex justify-center items-center">
        <div className="mb-16 p-8 grid grid-cols-12 border-2 border-purple-400 w-1/2 gap-4">
          <div className="col-span-12 text-2xl font-bold">
            Least square Regression
          </div>
          <input
            id="field"
            className="col-span-3 border-purple-500 p-2 focus:outline-purple-700 text-lg"
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
            id="multiple"
            className="col-span-3 border-purple-500 p-2 focus:outline-purple-700 text-lg"
            type="number"
            min={1}
            max={3}
            value={multipleValue}
            placeholder="Field (2-10)"
            onChange={(e) =>
              Number(e.currentTarget.value) > 3
                ? setMultipleValue("3")
                : Number(e.currentTarget.value) < 1
                ? setMultipleValue("1")
                : setMultipleValue(e.currentTarget.value)
            }
          />
          <input
            key={"target"}
            id="target"
            className="col-span-3 border-purple-500 p-2 focus:outline-purple-700 text-lg
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            placeholder="Target"
            value={target}
            onChange={(e) => setTarget(e.currentTarget.value)}
          />
          <input
            key={"m"}
            id="m"
            className="col-span-3 border-purple-500 p-2 focus:outline-purple-700 text-lg
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            placeholder="m"
            min={1}
            value={m}
            onChange={(e) =>
              Number(e.currentTarget.value) < 1
                ? setM("")
                : Number(multipleValue) > 1
                ? setM("1")
                : setM(e.currentTarget.value)
            }
          />
          <button
            className="col-span-6 bg-purple-300 hover:bg-purple-400 font-bold py-2 px-4 border-b-4 border-purple-500 active:border-b-0 rounded focus:outline-purple-600"
            onClick={handleField}
          >
            Generate
          </button>
          <button
            className="h-12 flex justify-center items-center col-span-6 bg-purple-300 hover:bg-purple-400 font-bold py-2 px-4 border-b-4 border-purple-500 active:border-b-0 rounded focus:outline-purple-600"
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
          <div className={`col-span-12`}>
            {x.map((rowValue, row) => (
              <div key={row} className={`grid grid-flow-col gap-4`}>
                {x[0].map((colValue, col) => (
                  <input
                    className="mb-4 w-full border-purple-500 border-2 p-2 focus:outline-purple-700 text-lg
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    key={col}
                    id={`A${row}${col}`}
                    value={x[row][col]}
                    type="number"
                    placeholder={`A${row}${col}`}
                    onChange={(e) => {
                      const newValue = e.currentTarget.value;
                      handleChange(row, col, newValue);
                    }}
                  />
                ))}
                <input
                  id={`B${row}`}
                  className="mb-4 w-full border-purple-700 border-2 p-2 focus:outline-purple-700 text-lg
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={y[row]}
                  type="number"
                  placeholder={`B${row}`}
                  onChange={(e) => {
                    const newAnswer = [...y];
                    newAnswer[row] = e.currentTarget.value;
                    setY(newAnswer);
                  }}
                />
              </div>
            ))}
          </div>
          <button
            className="h-12 col-span-4 bg-purple-500 hover:bg-purple-400 font-bold py-2 px-4 border-b-4 border-purple-700 active:border-b-0 rounded focus:outline-purple-600"
            onClick={calculate}
          >
            Calculate
          </button>
          <div className="col-span-8 flex items-center text-lg text-purple-600 font-bold">
            Ans {ans}
          </div>
          <div className="col-span-12 w-full px-10 h-72">
            {graphRegression(data, ansData)}
          </div>
        </div>
      </div>
    </>
  );
}
