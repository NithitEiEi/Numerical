import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { floor, random } from "mathjs";


const prisma = new PrismaClient();

function getRandomInt(min:number, max:number) {
  return floor(random() * (max - min) + min);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {

    const isExist = await prisma.matrix.findFirst({
        where: {
          Ax: { equals: body.Ax },
          B: { hasEvery: body.B },
        },
      });

      if(isExist) {
        return Response.json({ message: "Duplicated" });
      }

    const matrix = await prisma.matrix.create({
      data: {
        size: body.size,
        Ax: body.Ax,
        B: body.B,
        symetric: body.symetric
      },
    });
    return Response.json(matrix);
  } catch (e: any) {
    return Response.json({ message: e.message });
  }

}

export async function GET(req: NextRequest) {
  const size = req.nextUrl.searchParams.get("size") || "2";
  const symetric = req.nextUrl.searchParams.get("symetric") || false;

  try {
    const problems = await prisma.matrix.findMany({
      take: 100,
      where: {
        size: parseInt(size),
        symetric: symetric === "true"? true: false
      },
    });
    
    if (problems.length === 0) {
      return Response.json({ error: "No record" }, { status: 404 });
    }
    const randomNum = getRandomInt(0, problems.length);
      
    const data ={Ax: problems[randomNum].Ax, B: problems[randomNum].B};

    return Response.json(data);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}

