import { useAppDispatch } from "@/hooks/store/hooks";
import React, { useCallback } from "react";
import { addTask } from "@/store/slices/tasks-slice";
import { TaskType } from "@/types/calendar-types";

export default function useTasks(
  tasks: TaskType[] | undefined,
  cellKey: string,
) {
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  const dispatch = useAppDispatch();

  const handleSave = useCallback(
    (labels: string[], cardContent: string) => {
      dispatch(
        addTask({ tasks, dateKey: cellKey, content: cardContent, labels }),
      );
    },
    [tasks],
  );

  return { handleSave, handleOnClick };
}
