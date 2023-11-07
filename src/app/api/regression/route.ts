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

    const isExist = await prisma.regression.findFirst({
        where: {
          x: { equals: body.x },
          y: { hasEvery: body.y },
        },
      });

      if(isExist) {
        return Response.json({ message: "Duplicated" });
      }

    const regression = await prisma.regression.create({
      data: {
        size: body.size,
        xn: body.xn,
        x: body.x,
        y: body.y
      },
    });
    return Response.json(regression);
  } catch (e: any) {
    return Response.json({ message: e.message });
  }

}

export async function GET(req: NextRequest) {
  const field = req.nextUrl.searchParams.get("size") || "2";
  const mutiple = req.nextUrl.searchParams.get("xn") || "1";
  

  try {
    const problems = await prisma.regression.findMany({
      take: 100,
      where: {
        size: parseInt(field),
        xn: parseInt(mutiple),
      },
    });
    
    if (problems.length === 0) {
      return Response.json({ error: "No record" }, { status: 404 });
    }
    const randomNum = getRandomInt(0, problems.length);
      
    const data ={x: problems[randomNum].x, y: problems[randomNum].y};

    return Response.json(data);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      console.log(field, mutiple);
      return Response.json({ error: field }, { status: 500 });
    }
  }
}

