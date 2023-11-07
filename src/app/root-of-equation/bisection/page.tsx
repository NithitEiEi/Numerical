"use client";
import graph from "@/app/component/graph";
import { bisection } from "@/app/script/rootMethod";
import { useState } from "react";
import axios from "axios";

export default function page() {
  const [equation, setEquation] = useState("");
  const [x0, setX0] = useState("");
  const [x1, setX1] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

  const calculate = () => {
    const result = bisection(equation, Number(x0), Number(x1));
    setAnswer(String(result[result.length - 1].y));
    setData(result);
    const problem = {
      equation: equation,
      type: "fx"
    }
    handler(problem);
  };

  const handler = async (req: any) => {
    const response = axios.post("/api/root-of-equation", {
      equation: req.equation,
      type: req.type,
    });
  }

  return (
    <>
    <title>Bisection Method</title>
      <div className="mt-12 flex justify-center items-center">
        <div className="p-8 grid grid-cols-12 border-2 border-blue-400 w-1/2 gap-4">
        <div className="col-span-12 text-2xl font-bold">Bisection Method</div>
            <input
              className="col-span-8 border-blue-500 p-2 focus:outline-blue-700 text-lg"
              type="text"
              value={equation}
              placeholder="Equation"
              onChange={(e) => setEquation(e.currentTarget.value)}
            />
            <input
              className="col-span-2 border-blue-500 p-2 focus:outline-blue-700 text-lg"
              type="number"
              value={x0}
              placeholder="X₀"
              onChange={(e) => setX0(e.currentTarget.value)}
            />
            <input
              className="col-span-2 border-blue-500 p-2 focus:outline-blue-700 text-lg"
              type="number"
              value={x1}
              min={Number(x0) + 1}
              placeholder="X₁"
              onChange={(e) => Number(e.currentTarget.value) <= Number(x0) ? setX1(""): setX1(e.currentTarget.value)}
            />
            <button
              onClick={calculate}
              className="col-span-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 active:border-blue-400 rounded focus:outline-blue-600"
            >
              calculate
            </button>
            <div className="flex items-center col-span-9 text-lg font-bold text-blue-500">Ans {answer}</div>
          <div className="col-span-12 flex justify-center">
            <div className="w-full pr-10 h-72">{graph(data)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
