import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const isExist = await prisma.integration.findFirst({
      where: {
        equation: body.equation,
      },
    });

    if (isExist) {
      return Response.json({message: "Duplicate"});
    }
    const integration = await prisma.integration.create({
      data: {
        equation: body.equation,
      },
    });
    return Response.json(integration);
  } catch (e: any) {
    return Response.json({ message: e.message });
  }

}

export async function GET(req: NextRequest) {
  try {
    const problems = await prisma.integration.findMany({
      take: 100,
    });

    if (problems.length === 0) {
      return Response.json({ error: "No record" }, { status: 404 });
    }

    const data = problems.map(problem => problem.equation);

    return Response.json(data);
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}
