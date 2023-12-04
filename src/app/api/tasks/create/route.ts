import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { LabelType } from "@/types/calendar-types";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { calendarId, content, orderNumber, labels } = await req.json();
    const { id } = await prisma.task.create({
      data: {
        content,
        calendarId,
        orderNumber,
        ...(labels && {
          labels: {
            connect: labels.map((entity: LabelType) => ({ id: entity.id })),
          },
        }),
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
