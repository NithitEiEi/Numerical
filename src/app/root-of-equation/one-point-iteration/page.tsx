"use client";
import graph from "@/app/component/graph";
import { onePoint } from "@/app/script/rootMethod";
import { useState } from "react";
import axios from "axios";

export default function page() {
  const [equation, setEquation] = useState("");
  const [x0, setX0] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState<{ x: number; y: number }[]>();
  const [ishidden, setIshidden] = useState(false);
  const [problem, setProblem] = useState([]);

  const handleHidden = () => {
    setIshidden(!ishidden);
    select();
  };

  const calculate = () => {
    const result = onePoint(Number(x0), equation);
    setAnswer(result[result.length - 1].y);
    setData(result);
    const problem = {
      equation: equation,
      type: "gx"
    }
    handler(problem);
  };

  const handler = async (req: any) => {
    const response = axios.post("/api/root-of-equation", {
      equation: req.equation,
      type: req.type,
    });
  }

  const select = async () => {
    axios
      .get("/api/root-of-equation", { params: { type: "gx" } })
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

  return (
    <>
    {ishidden && (
        <div
          id="dropdown"
          className="z-10 absolute top-7 left-10 rounded-lg shadow w-48"
        >
          <ul
            className="py-2 text-sm bg-blue-300 overflow-y-auto h-48 hide-scroll-bar"
            aria-labelledby="dropdownDefaultButton"
          >
            {problem.map((value, index) => (
              <li
                onClick={() => handlerProblem(value)}
                key={`problem${index}`}
                className="block font-bold font-bold px-4 py-2 transition hover:bg-blue-100"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    <title>One-Point Iteration</title>
      <div className="mt-12 flex justify-center items-center">
        <div className="p-8 grid grid-cols-12 border-2 border-blue-400 w-1/2 gap-4">
        <div className="col-span-12 flex justify-between">
            <span className="text-2xl font-bold">One-Point Iteration</span>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 active:border-blue-400 rounded focus:outline-blue-600"
              onClick={handleHidden}
            >
              Select
            </button>
          </div>
          <input
              className="col-span-9 border-blue-500 p-2 focus:outline-blue-700 text-lg"
              type="text"
              value={equation}
              placeholder="Equation"
              onChange={(e) => setEquation(e.currentTarget.value)}
            />
          <input
              className="col-span-3 border-blue-500 p-2 focus:outline-blue-700 text-lg"
              type="number"
              value={x0}
              placeholder="X₀"
              onChange={(e) => setX0(e.currentTarget.value)}
            />
          <button
            className="col-span-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 active:border-blue-400 rounded focus:outline-blue-600"
            onClick={calculate}
          >
            calculate
          </button>
          <div className="col-span-8 flex items-center font-bold text-blue-500 text-lg">
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
