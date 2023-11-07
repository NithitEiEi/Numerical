import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { random } from "mathjs";

const prisma = new PrismaClient();

function randomNum(min:number, max:number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const isExist = await prisma.roe.findFirst({
      where: {
        equation: body.equation,
        type: body.type,
      },
    });

    if (isExist) {
      return Response.json({message: "Duplicate"});
    }
    const roe = await prisma.roe.create({
      data: {
        type: body.type,
        equation: body.equation,
      },
    });
    return Response.json(roe);
  } catch (e: any) {
    return Response.json({ message: e.message });
  }

}

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") || "default";

  try {
    const problems = await prisma.roe.findMany({
      take: 100,
      where: {
        type: type,
      },
    });
    
    if (problems.length === 0) {
      return Response.json({ error: "No record" }, { status: 404 });
    }

    const num = randomNum(0, problems.length - 1);
    const data = [];
    for(let i = 0; i < problems.length; i++){
      data.push(problems[i].equation);
    }

    return Response.json(data);
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}
