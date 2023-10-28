"use client";
import graph from "@/app/component/graph";
import { secondDiff } from "@/app/script/derivativeMethod";
import { abs } from "mathjs";
import { useState } from "react";

export default function page() {
  const [equation, setEquation] = useState("");
  const [order, setOrder] = useState("");
  const [h, setH] = useState("");
  const [x, setX] = useState("");
  const [answer, setAnswer] = useState("");
  const [exact, setExact] = useState("");
  const [error, setError] = useState(0);
  const [data, setData] = useState<{ y: number }[]>();

  const calculate = (mode: string) => {
    const result = secondDiff(equation ,Number(order) ,Number(x), Number(h), mode);
    setAnswer(String(result?.approx));
    setExact(String(result?.exact));
  };

  return (
    <>
      <div className="mt-12 flex justify-center items-center">
        <div className="p-8 grid grid-cols-12 border-2 border-green-400 w-1/2 gap-4">
          <div className="col-span-12 text-2xl w-full font-bold">
            Second Divided-difference
          </div>
          <input
            className="col-span-12 border-green-500 p-2 text-lg focus:outline-green-700"
            type="text"
            value={equation}
            placeholder="Equation"
            onChange={(e) => setEquation(e.currentTarget.value)}
            />
            <div className="col-span-4 flex justify-center font-bold">Error of Order</div>
            <div className="col-span-4 flex justify-center font-bold">X value</div>
            <div className="col-span-4 flex justify-center font-bold">h range</div>
            <input
              className="col-span-4 border-green-500 p-2 text-lg focus:outline-green-700"
              type="number"
              value={order}
              min={0}
              placeholder="h^x"
              onChange={(e) => setOrder(e.currentTarget.value)}
            />
            <input
              className="col-span-4 border-green-500 p-2 text-lg focus:outline-green-700"
              type="number"
              value={x}
              min={0}
              placeholder="X"
              onChange={(e) => setX(e.currentTarget.value)}
            />
          <input
            className="col-span-4 border-green-500 p-2 text-lg focus:outline-green-700"
            type="number"
            value={h}
            min={0}
            placeholder="h"
            onChange={(e) => setH(e.currentTarget.value)}
          />
          <button
            className="col-span-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 active:border-green-400 rounded focus:outline-green-600"
            onClick={() => calculate("backward")}
          >
            Backward
          </button>
          <button
            className="col-span-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 active:border-green-400 rounded focus:outline-green-600"
            onClick={() => calculate("central")}
          >
            Central
          </button>
          <button
            className="col-span-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 active:border-green-400 rounded focus:outline-green-600"
            onClick={() => calculate("forward")}
          >
            Forward
          </button>
          <div className="col-span-12 text-lg font-bold text-green-500">
              Approx {answer}
          </div>
          <div className="col-span-12 text-lg font-bold text-green-500">
              Exact {exact}
          </div>
          <div className="col-span-12 text-lg font-bold text-green-500">
              Error {isNaN(Number(answer)/Number(exact)) ? "": abs((Number(answer)/Number(exact) * 100) - 100).toFixed(4) + "%"}
          </div>
          <div className="col-span-12 flex justify-center">
            <div className="w-full pr-10 h-72">{graph(data)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
