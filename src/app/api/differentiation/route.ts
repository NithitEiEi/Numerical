import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const isExist = await prisma.differentiation.findFirst({
      where: {
        equation: body.equation,
      },
    });

    if (isExist) {
      return Response.json({message: "Duplicate"});
    }
    const differentiation = await prisma.differentiation.create({
      data: {
        equation: body.equation,
      },
    });
    return Response.json(differentiation);
  } catch (e: any) {
    return Response.json({ message: e.message });
  }

}
