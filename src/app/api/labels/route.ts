import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const labels = await prisma.label.findMany();

    return NextResponse.json(labels);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
  }
}
