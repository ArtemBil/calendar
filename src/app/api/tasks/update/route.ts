import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { LabelType } from "@/types/calendar-types";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      id,
      field,
      value,
      currentOrder,
      newOrder,
      cellKey,
      previousLabels,
    } = await req.json();

    switch (field) {
      case "content":
        await prisma.task.update({
          where: {
            id: id,
          },
          data: {
            [field]: value,
          },
        });

        return NextResponse.json({ success: true });

      case "labels":
        await prisma.task.update({
          where: {
            id: id,
          },
          data: {
            labels: {
              ...(previousLabels?.length && {
                disconnect: getDisconnectValues(previousLabels, value),
              }),
              connect: value.map((entity: LabelType) => ({ id: entity.id })),
            },
          },
        });

        return NextResponse.json({ success: true });
      case "all":
        await prisma.task.update({
          where: {
            id: id,
          },
          data: {
            content: value.content,
            labels: {
              ...(previousLabels?.length && {
                disconnect: getDisconnectValues(previousLabels, value.labels),
              }),
              connect: value.labels.map((entity: LabelType) => ({
                id: entity.id,
              })),
            },
          },
        });

        return NextResponse.json({ success: true });
      case "updatePosition":
        await prisma.task.update({
          where: {
            id: id,
          },
          data: {
            calendarId: value,
          },
        });

        return NextResponse.json({ success: true });

      case "updateOrder": {
        const response = await prisma.task.update({
          where: { id },
          data: {
            orderNumber: newOrder,
          },
        });

        if (newOrder < currentOrder) {
          await prisma.task.updateMany({
            where: {
              id: { not: id },
              calendarId: cellKey,
              orderNumber: { gte: newOrder, lt: currentOrder },
            },
            data: {
              orderNumber: { increment: 1 },
            },
          });
        }

        if (newOrder > currentOrder) {
          await prisma.task.updateMany({
            where: {
              id: { not: id },
              calendarId: cellKey,
              orderNumber: { gt: currentOrder, lte: newOrder },
            },
            data: {
              orderNumber: { decrement: 1 },
            },
          });
        }

        return NextResponse.json({ success: true });
      }
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

function getDisconnectValues(
  previousLabels: LabelType[],
  updatedLabels: LabelType[],
) {
  return previousLabels
    .filter((prevLabel) => {
      const foundMissingLabel = updatedLabels.find(
        (entity) => prevLabel.id !== entity.id,
      );

      return !!foundMissingLabel;
    })
    .map((entity) => ({ id: entity.id }));
}
