"use client";

import areaGraph from "@/app/component/areaGraph";
import { trapezoidal } from "@/app/script/integrateMethod";
import { useState } from "react";
import axios from "axios";

export default function page() {
  const [equation, setEquation] = useState("");
  const [n, setN] = useState("");
  const [x0, setX0] = useState("");
  const [x1, setX1] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

  const calculate = () => {
    const result = trapezoidal(equation, Number(n), Number(x0), Number(x1));
    setAnswer(result.area);
    setData(result.data);
    const problem = {
      equation: equation,
    }

    handler(problem)
  };

  const handler = async (req: any) => {
    const response = axios.post("/api/integration", {
      equation: req.equation,
    });
  }

  return (
    <>
    <title>Trapezoidal Rule</title>
      <div className="mt-12 flex justify-center items-center mb-12">
        <div className="p-8 grid grid-cols-12 border-2 border-pink-400 w-1/2 gap-4">
          <div className="col-span-12 text-2xl font-bold">
            Trapezoidal Method
          </div>
            <input
              className="col-span-6 text-lg border-pink-500 p-2 focus:outline-pink-700"
              type="text"
              value={equation}
              placeholder="Equation"
              onChange={(e) => setEquation(e.currentTarget.value)}
            />
            <input
              className="col-span-2 text-lg border-pink-500 p-2 focus:outline-pink-700"
              type="number"
              value={x0}
              placeholder="X₀"
              onChange={(e) => setX0(e.currentTarget.value)}
            />
            <input
              className="col-span-2 text-lg border-pink-500 p-2 focus:outline-pink-700"
              type="number"
              value={x1}
              min={Number(x0) + 1}
              placeholder="X₁"
              onChange={(e) => Number(e.currentTarget.value) <= Number(x0) ? setX1(""): setX1(e.currentTarget.value)}
            />
            <input
              className="col-span-2 border-pink-500 p-2 focus:outline-pink-700"
              type="number"
              value={n}
              placeholder="n"
              min={1}
              onChange={(e) => Number(e.currentTarget.value) < 1 ? setN(""): setN(e.currentTarget.value)}
            />
            <button
              className="col-span-4 h-14 bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 border-b-4 border-pink-600 active:border-pink-500 rounded focus:outline-pink-600"
              onClick={calculate}
            >
              calculate
            </button>
            <div className="col-span-8 flex items-center text-lg font-bold text-pink-500">
              Ans {answer}
            </div>
          <div className="col-span-12 flex justify-center">
            <div className="w-full h-72 pr-10">{areaGraph(data, false)}</div>
          </div>
        </div>
      </div>
    </>
  );
}