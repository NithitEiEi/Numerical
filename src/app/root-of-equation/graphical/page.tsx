"use client";
import graph from "@/app/component/graph";
import { graphical } from "@/app/script/rootMethod";
import axios from "axios";
import { useState } from "react";

export default function page() {
  const [equation, setEquation] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState<{ y: number }[]>();
  const [ishidden, setIshidden] = useState(false);
  const [problem, setProblem] = useState([]);

  const handleHidden = () => {
    setIshidden(!ishidden);
    select();
  };

  const calculate = () => {
    const result = graphical(equation);
    setAnswer(String(result[result.length - 1].y));
    setData(result);
    const problem = {
      equation: equation,
      type: "fx",
    };
    handler(problem);
  };

  const handler = async (req: any) => {
    const response = axios.post("/api/root-of-equation", {
      equation: req.equation,
      type: req.type,
    });
  };

  const select = async () => {
    axios
      .get("/api/root-of-equation", { params: { type: "fx" } })
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
      <title>Graphical Method</title>
      <div className="mt-12 flex justify-center items-center">
        <div className="p-8 grid grid-cols-12 border-2 border-blue-400 w-1/2 gap-4">
          <div className="col-span-12 flex justify-between">
            <span className="text-2xl w-full font-bold">Graphical Method</span>
            <button
              className="col-span-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 active:border-blue-400 rounded focus:outline-blue-600"
              onClick={handleHidden}
            >
              Select
            </button>
          </div>
          <input
            className="col-span-8 border-blue-500 p-2 text-lg focus:outline-blue-700"
            type="text"
            value={equation}
            placeholder="Equation"
            onChange={(e) => setEquation(e.currentTarget.value)}
          />
          <button
            className="col-span-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 active:border-blue-400 rounded focus:outline-blue-600"
            onClick={calculate}
          >
            calculate
          </button>
          <div className="col-span-12 text-lg font-bold text-blue-500">
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
