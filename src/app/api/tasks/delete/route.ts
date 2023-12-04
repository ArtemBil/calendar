import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    await prisma.task.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
  }
}
