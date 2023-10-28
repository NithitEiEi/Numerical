import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="absolute left-20 top-40 font-bold numer-title">
          Nummerical Method
        </h1>
        <div className="absolute top-80 left-20 h-28">
          <Link href="/root-of-equation/graphical">
            <button className="h-20 bg-zinc-200 rounded-l py-2 px-4 font-bold hover:bg-blue-400 active:bg-blue-500 transition">
              Root of Equation
            </button>
          </Link>
          <Link href="/linear-algebra/cramer-rule">
            <button className="h-20 bg-zinc-200 py-2 px-4 font-bold hover:bg-red-400 active:bg-red-500 transition">
              Linear Algebra
            </button>
          </Link>
          <Link href="/interpolation/newton-divided">
            <button className="h-20 bg-zinc-200 py-2 px-4 font-bold hover:bg-amber-400 active:bg-amber-500 transition">
              Interpolation
            </button>
          </Link>
          <Link href="/integration/simpson">
            <button className="h-20 bg-zinc-200 py-2 px-4 font-bold hover:bg-purple-400 active:bg-purple-500 transition">
              Regression
            </button>
          </Link>
          <Link href="/integration/trapezoidal">
            <button className="h-20 bg-zinc-200 py-2 px-4 font-bold hover:bg-pink-400 active:bg-pink-500 transition">
              Integration
            </button>
          </Link>
          <Link href="/differentiation/first-divided">
            <button className="h-20 bg-zinc-200 rounded-r py-2 px-4 font-bold hover:bg-green-400 active:bg-green-500 transition">
              Differentiation
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
