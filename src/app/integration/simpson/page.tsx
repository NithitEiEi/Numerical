"use client";

import areaGraph from "@/app/component/areaGraph";
import { simpson } from "@/app/script/integrateMethod";
import { useState } from "react";
import axios from "axios";

export default function page() {
  const [equation, setEquation] = useState("");
  const [n, setN] = useState("");
  const [x0, setX0] = useState("");
  const [x1, setX1] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [ishidden, setIshidden] = useState(false);
  const [problem, setProblem] = useState([]);

  const handleHidden = () => {
    setIshidden(!ishidden);
    select();
  };

  const select = async () => {
    axios
      .get("/api/integration")
      .then((response) => {
        setProblem(response.data);
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlerProblem = (value: string) => {
    setEquation(value);
    setIshidden(false);
  };

  const calculate = () => {
    const result = simpson(equation, Number(n), Number(x0), Number(x1));
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
    {ishidden && (
        <div
          id="dropdown"
          className="z-10 absolute top-7 left-10 rounded-lg shadow w-48"
        >
          <ul
            className="py-2 text-sm bg-pink-300 overflow-y-auto h-48 hide-scroll-bar"
            aria-labelledby="dropdownDefaultButton"
          >
            {problem.map((value, index) => (
              <li
                onClick={() => handlerProblem(value)}
                key={`problem${index}`}
                className="block font-bold font-bold px-4 py-2 transition hover:bg-pink-100"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    <title>Simpson's Rule</title>
      <div className="mt-12 flex justify-center items-center mb-12">
        <div className="p-8 grid grid-cols-12 border-2 border-pink-400 w-1/2 gap-4">
        <div className="col-span-12 flex justify-between">
            <span className="text-2xl font-bold">Simpson Rule</span>
            <button
              className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 active:border-pink-400 rounded focus:outline-pink-600"
              onClick={handleHidden}
            >
              Select
            </button>
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
            onChange={(e) =>
              Number(e.currentTarget.value) <= Number(x0)
                ? setX1("")
                : setX1(e.currentTarget.value)
            }
          />
          <input
            className="col-span-2 border-pink-500 p-2 focus:outline-pink-700"
            type="number"
            value={n}
            placeholder="n"
            min={1}
            onChange={(e) =>
              Number(e.currentTarget.value) < 1
                ? setN("")
                : setN(e.currentTarget.value)
            }
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
            <div className="w-full h-72 pr-10">{areaGraph(data, true)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
