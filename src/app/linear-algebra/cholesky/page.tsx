"use client";

import { cholesky } from "@/app/script/linearMethod";
import { useState } from "react";

export default function Page() {
  const [field, setField] = useState("2");
  const [a, setA] = useState<string[][]>([
    ["", ""],
    ["", ""],
  ]);
  const [b, setB] = useState<string[]>(["", ""]);
  const [answer, setAnswer] = useState<number[]>([]);

  const handleField = () => {
    const oldA = [...a];
    const oldB = [...b];
    const newA = [];
    const newB = [];
    for (let i = 0; i < Number(field); i++) {
      newB.push("");
      const row = [];
      for (let j = 0; j < Number(field); j++) {
        row.push("");
      }
      newA.push(row);
    }
    for (let i = 0; i < oldA.length; i++) {
      if (i < Number(field)) {
        newB[i] = oldB[i];
      }
      for (let j = 0; j < oldA[0].length; j++) {
        if (i < Number(field) && j < Number(field)) {
          newA[i][j] = oldA[i][j];
        }
      }
    }
    setAnswer([]);
    setA(newA);
    setB(newB);
  };

  const calculate = () => {
    for (let i = 0; i < b.length; i++) {
      if (b[i] === "") {
        console.log("should input all fields");
        return;
      }
      for (let j = 0; j < a[0].length; j++) {
        if (a[i][j] === "") {
          console.log("should input all fields");
          return;
        }
      }
    }
    const matrixNumberA: number[][] = a.map((row) => row.map(Number));
    const matrixNumberB: number[] = b.map((row) => Number(row));
    const result = cholesky(matrixNumberA, matrixNumberB);
    setAnswer(result);
  };

  const clear = () => {
    const newA = [];
    const newB = [];

    for (let i = 0; i < Number(field); i++) {
      newB.push("");
      const row = [];
      for (let j = 0; j < Number(field); j++) {
        row.push("");
      }
      newA.push(row);
    }
    setA(newA);
    setB(newB);
    setAnswer([]);
  };

  const handleChange = (row: number, col: number, value: any) => {
    const newMatrix = [...a];
    newMatrix[row][col] = value;
    setA(newMatrix);
  };

  return (
    <>
    <title>Cholesky's Method</title>
      <div className="mt-12 flex justify-center items-center">
        <div className="mb-16 p-8 grid grid-cols-12 border-2 border-red-400 w-1/2 gap-4">
          <div className="col-span-12 text-2xl font-bold">Cholesky's Method</div>
          <input
            className="col-span-3 border-red-500 p-2 focus:outline-red-700 text-lg"
            type="number"
            min={2}
            max={6}
            value={field}
            placeholder="Field (2-7)"
            onChange={(e) =>
              Number(e.currentTarget.value) > 6
                ? setField("6")
                : Number(e.currentTarget.value) < 2
                ? setField("2")
                : setField(e.currentTarget.value)
            }
          />
          <button
            className="col-span-5 bg-red-300 hover:bg-red-400 font-bold py-2 px-4 border-b-4 border-red-500 active:border-b-0 rounded focus:outline-red-600"
            onClick={handleField}
          >
            Generate
          </button>
          <button
            className="h-12 flex justify-center items-center col-span-4 bg-red-300 hover:bg-red-400 font-bold py-2 px-4 border-b-4 border-red-500 active:border-b-0 rounded focus:outline-red-600"
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
          <div className={`col-span-12`}>
            {a.map((rowValue, row) => (
              <div key={row} className={`grid grid-flow-col gap-4`}>
                {a.map((colValue, col) => (
                  <input
                    className="mb-4 w-full border-red-500 border-2 p-2 focus:outline-red-700 text-lg
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    key={col}
                    id={`A${row}${col}`}
                    value={a[row][col]}
                    type="number"
                    placeholder={`A${row}${col}`}
                    onChange={(e) => {
                      const newValue = e.currentTarget.value;
                      handleChange(row, col, newValue);
                    }}
                  />
                ))}
                <input
                  key={row}
                  id={`B${row}`}
                  className="mb-4 w-full border-red-700 border-2 p-2 focus:outline-red-700 text-lg
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={b[row]}
                  type="number"
                  placeholder={`B${row}`}
                  onChange={(e) => {
                    const newAnswer = [...b];
                    newAnswer[row] = e.currentTarget.value;
                    setB(newAnswer);
                  }}
                />
              </div>
            ))}
          </div>
          <button
            className="h-12 col-span-12 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 active:border-red-400 rounded focus:outline-red-600"
            onClick={calculate}
          >
            Calculate
          </button>
          <div className="col-span-12 grid grid-cols-2">
            {answer.map((ansValue, index) => (
              <div
                key={`Ans${index}`}
                className="text-lg text-red-400 font-bold p-3"
              >
                X<sub>{index}</sub> = {answer[index]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
