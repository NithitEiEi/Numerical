import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
