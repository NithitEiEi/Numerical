import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
