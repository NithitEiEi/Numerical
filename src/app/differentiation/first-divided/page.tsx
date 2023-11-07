"use client";
import graph from "@/app/component/graph";
import { firstDiff } from "@/app/script/derivativeMethod";
import { abs } from "mathjs";
import { useState } from "react";
import axios from "axios";

export default function page() {
  const [equation, setEquation] = useState("");
  const [order, setOrder] = useState("1");
  const [h, setH] = useState("");
  const [x, setX] = useState("");
  const [answer, setAnswer] = useState("");
  const [exact, setExact] = useState("");
  const [data, setData] = useState<{ y: number }[]>();

  const calculate = (mode: string) => {
    console.log(equation, order, h, x, mode);
    const result = firstDiff(
      equation,
      Number(order),
      Number(x),
      Number(h),
      mode
    );
    setAnswer(String(result?.approx));
    setExact(String(result?.exact));
    const problem = {
      equation: equation,
    }

    handler(problem);
  };

  const handler = async (req: any) => {
    const response = axios.post("/api/differentiation", {
      equation: req.equation,
    });
  }

  return (
    <>
      <div className="mt-12 flex justify-center items-center">
        <div className="mb-14 p-8 grid grid-cols-12 border-2 border-green-400 w-1/2 gap-4">
          <div className="col-span-12 text-2xl w-full font-bold">
            First Divided-difference
          </div>
          <input
            className="col-span-12 border-green-500 p-2 text-lg focus:outline-green-700"
            type="text"
            value={equation}
            placeholder="Equation"
            onChange={(e) => setEquation(e.currentTarget.value)}
          />
          <div className="col-span-4 flex justify-center font-bold">
            Error of Order (h<sup className="flex items-center">x</sup>)
          </div>
          <div className="col-span-4 flex justify-center font-bold">
            Value
          </div>
          <div className="col-span-4 flex justify-center font-bold">
            Range
          </div>
          <input
            className="col-span-4 border-green-500 p-2 text-lg focus:outline-green-700"
            type="number"
            value={order}
            min={0}
            placeholder="h^x"
            onChange={(e) =>
              Number(e.currentTarget.value) < 1
                ? setOrder("1")
                : Number(e.currentTarget.value) > 2
                ? setOrder("2")
                : setOrder(e.currentTarget.value)
            }
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
            onChange={(e) =>
              Number(e.currentTarget.value) < 0
                ? setH("")
                : setH(e.currentTarget.value)
            }
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
            Approximate Value {answer}
          </div>
          <div className="col-span-12 text-lg font-bold text-green-500">
            Exactly Value {exact}
          </div>
          <div className="col-span-12 text-lg font-bold text-green-500">
            Error{" "}
            {isNaN(Number(answer) / Number(exact))
              ? ""
              : abs((Number(answer) / Number(exact)) * 100 - 100).toFixed(4) +
                "%"}
          </div>
          <div className="col-span-12 flex justify-center">
            <div className="w-full pr-10 h-72">{graph(data)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
