import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id, field, value } = await req.json();

    if (field === "all") {
      await prisma.label.update({
        where: {
          id: id,
        },
        data: {
          name: value.name,
          color: value.color,
        },
      });

      return NextResponse.json({ success: true });
    } else {
      await prisma.label.update({
        where: {
          id: id,
        },
        data: {
          [field]: value,
        },
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Invalid input", message: error.message },
        { status: 404 },
      );
    }
  }
}
