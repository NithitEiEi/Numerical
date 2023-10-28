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
      <div className="sticky top-0 flex justify-between items-center w-full px-10 bg-amber-200 h-28">
        <button
          id="dropdownDefaultButton"
          onClick={handleHidden}
          className="h-14 bg-amber-300 hover:bg-amber-400 font-bold rounded-md text-md px-5 py-2.5 text-center inline-flex items-center border-b-4 active:border-b-0 border-amber-500"
        >
          Interpolation{" "}
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
              className="py-2 text-sm bg-amber-300"
              aria-labelledby="dropdownDefaultButton"
            >
              <Link onClick={handleHidden} href="/interpolation/newton-divided">
                <li className="block font-bold font-bold px-4 py-2 transition hover:bg-amber-100">
                  Newton's Divided
                </li>
              </Link>
              <Link onClick={handleHidden} href="/interpolation/lagrange">
                <li className="block font-bold px-4 py-2 transition hover:bg-amber-100">
                  Lagrange Method
                </li>
              </Link>
              <Link onClick={handleHidden} href="/interpolation/spline">
                <li className="block font-bold px-4 py-2 transition hover:bg-amber-100">
                  Spline Method
                </li>
              </Link>
            </ul>
          </div>
        )}

          <Link href="/">
            <button className="h-14 bg-amber-300 hover:bg-amber-400 font-bold rounded-md text-md px-5 py-2.5 text-center inline-flex items-center border-b-4 active:border-b-0 border-amber-500">
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