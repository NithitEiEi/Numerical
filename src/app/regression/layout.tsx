"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <div className="flex justify-end items-center w-full px-10 bg-purple-200 h-28">
          <Link href="/">
            <button className="h-14 bg-purple-300 rounded py-2 px-4 font-bold hover:bg-purple-400 border-b-4 active:border-b-0 border-purple-500">
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
