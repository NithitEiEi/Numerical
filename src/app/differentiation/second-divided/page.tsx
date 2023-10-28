"use client";
import graph from "@/app/component/graph";
import { graphical } from "@/app/script/rootMethod";
import { useState } from "react";

export default function page() {
  const [equation, setEquation] = useState("");
  const [h, setH] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState<{ y: number }[]>();

  const calculate = () => {
    const result = graphical(equation);
    setAnswer(String(result[result.length - 1].y));
    setData(result);
  };

  return (
    <>
      <div className="mt-12 flex justify-center items-center">
        <div className="p-8 grid grid-cols-12 border-2 border-green-400 w-1/2 gap-4">
          <div className="col-span-12 text-2xl w-full font-bold">
            Second Divided-difference
          </div>
          <input
            className="col-span-5 border-green-500 p-2 text-lg focus:outline-green-700"
            type="text"
            value={equation}
            placeholder="Equation"
            onChange={(e) => setEquation(e.currentTarget.value)}
          />
          <input
            className="col-span-3 border-green-500 p-2 text-lg focus:outline-green-700"
            type="number"
            value={h}
            min={0}
            placeholder="h"
            onChange={(e) => setH(e.currentTarget.value)}
          />
          <button
            className="col-span-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 active:border-green-400 rounded focus:outline-green-600"
            onClick={calculate}
          >
            calculate
          </button>
          <div className="col-span-12 text-lg font-bold text-green-500">
              Ans {answer}
          </div>
          <div className="col-span-12 flex justify-center">
            <div className="w-full pr-10 h-72">{graph(data)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
