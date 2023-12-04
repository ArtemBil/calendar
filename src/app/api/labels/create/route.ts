import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { color, name } = await req.json();
    const { id } = await prisma.label.create({
      data: {
        name,
        color,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({ id, success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Invalid input", message: error.message },
        { status: 404 },
      );
    }
  }
}
