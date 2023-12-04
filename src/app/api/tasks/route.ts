import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        orderNumber: "asc",
      },
      include: {
        labels: true,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
  }
}
