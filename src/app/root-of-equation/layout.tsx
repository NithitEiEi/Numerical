"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [ishidden, setIshidden] = useState(false);

  const handleHidden = () => {
    setIshidden(!ishidden);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full px-10 bg-blue-200 h-28">
        <button
          id="dropdownDefaultButton"
          onClick={handleHidden}
          className="h-14 bg-blue-300 hover:bg-blue-400 font-bold rounded-md text-md px-5 py-2.5 text-center inline-flex items-center border-b-4 active:border-b-0 border-blue-500"
        >
          Root of Equation{" "}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {ishidden && (
          <div
            id="dropdown"
            className="z-10 absolute top-24 rounded-lg shadow w-44"
          >
            <ul
              className="py-2 text-sm bg-blue-300"
              aria-labelledby="dropdownDefaultButton"
            >
              <Link onClick={handleHidden} href="/root-of-equation/graphical">
                <li className="block font-bold font-bold px-4 py-2 transition hover:bg-blue-100">
                  Graphical Method
                </li>
              </Link>
              <Link onClick={handleHidden} href="/root-of-equation/bisection">
                <li className="block font-bold px-4 py-2 transition hover:bg-blue-100">
                  Bisection Method
                </li>
              </Link>
              <Link onClick={handleHidden} href="/root-of-equation/false-position">
                <li className="block font-bold px-4 py-2 transition hover:bg-blue-100">
                  False Position
                </li>
              </Link>
              <Link onClick={handleHidden} href="/root-of-equation/one-point-iteration">
                <li className="block font-bold px-4 py-2 transition hover:bg-blue-100">
                  One-point Iteration
                </li>
              </Link>
              <Link onClick={handleHidden} href="/root-of-equation/newton-raphson">
                <li className="block font-bold px-4 py-2 transition hover:bg-blue-100">
                  Newton Raphson
                </li>
              </Link>
              <Link onClick={handleHidden} href="/root-of-equation/secant">
                <li className="block font-bold px-4 py-2 transition hover:bg-blue-100">
                  Secant Method
                </li>
              </Link>
            </ul>
          </div>
        )}

          <Link href="/">
            <button className="h-14 bg-blue-300 hover:bg-blue-400 font-bold rounded-md text-md px-5 py-2.5 text-center inline-flex items-center border-b-4 active:border-b-0 border-blue-500">
              <svg
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </Link>
        </div>
      {children}
    </>
  );
};

export default Layout;
