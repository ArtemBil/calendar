import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { TaskType } from "@/types/calendar-types";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const importedTasks = (await req.json()) as TaskType[];

    const batchQueryRequest = importedTasks.map((task, idx) => {
      return prisma.task.upsert({
        where: { id: task.id },
        create: formatRequestData(task, importedTasks.length + idx),
        update: formatRequestData(task, importedTasks.length + idx),
      });
    });

    const allTasks = await prisma.$transaction([
      ...batchQueryRequest,
      prisma.task.findMany({
        include: {
          labels: true,
        },
      }),
    ]);

    return NextResponse.json({
      tasks: allTasks.slice(-1).flat(),
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Invalid input", message: error.message },
        { status: 404 },
      );
    }
  }
}

function formatRequestData(task: TaskType, orderNumber: number) {
  return {
    id: task.id,
    content: task.content,
    calendarId: task.calendarId,
    orderNumber: orderNumber,
    ...(task.labels &&
      task.labels.length && {
        labels: {
          connectOrCreate: task.labels.map((label) => {
            return {
              where: { id: label.id },
              create: {
                id: label.id,
                name: label.name,
                color: label.color,
              },
            };
          }),
        },
      }),
  };
}
