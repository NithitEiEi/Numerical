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
  const [ishidden, setIshidden] = useState(false);
  const [problem, setProblem] = useState([]);

  const handleHidden = () => {
    setIshidden(!ishidden);
    select();
  };

  const select = async () => {
    axios
      .get("/api/differentiation")
      .then((response) => {
        setProblem(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlerProblem = (value: string) => {
    setEquation(value);
    setIshidden(false);
  };

  const calculate = (mode: string) => {
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
    {ishidden && (
        <div
          id="dropdown"
          className="z-10 absolute top-7 left-10 rounded-lg shadow w-48"
        >
          <ul
            className="py-2 text-sm bg-green-300 overflow-y-auto h-48 hide-scroll-bar"
            aria-labelledby="dropdownDefaultButton"
          >
            {problem.map((value, index) => (
              <li
                onClick={() => handlerProblem(value)}
                key={`problem${index}`}
                className="block font-bold font-bold px-4 py-2 transition hover:bg-green-100"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    <title>Differentiation</title>
      <div className="mt-12 flex justify-center items-center">
        <div className="mb-14 p-8 grid grid-cols-12 border-2 border-green-400 w-1/2 gap-4">
        <div className="col-span-12 flex justify-between">
            <span className="text-2xl font-bold">First-Divided Diffence</span>
            <button
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 active:border-green-400 rounded focus:outline-green-600"
              onClick={handleHidden}
            >
              Select
            </button>
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
