import { useAppDispatch } from "@/hooks/store/hooks";
import React from "react";
import { createTask } from "@/store/slices/tasks-slice";
import { LabelType, TaskType } from "@/types/calendar-types";
import { ActionsType, OnModalClose, TaskActions } from "@/types/modal-types";
import { Button } from "@mui/material";

export default function useTasks(
  tasks: TaskType[] | undefined,
  cellKey: string,
  handleClose: OnModalClose,
) {
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  const dispatch = useAppDispatch();

  const handleSave =
    ({
      content,
      labels,
      afterAction,
      validate,
    }: {
      content: string;
      labels: LabelType[];
      afterAction: () => void;
      validate: () => boolean;
    }) =>
    async (event: React.MouseEvent<HTMLElement>) => {
      if (validate()) {
        handleClose(event);

        await dispatch(
          createTask({
            calendarId: cellKey,
            orderNumber: tasks ? tasks.length : 0,
            content,
            labels,
          }),
        );

        afterAction();
      }
    };

  const actions: ActionsType[] = [
    {
      id: TaskActions.CREATE,
      render(actionInfo): React.ReactNode {
        return <Button onClick={handleSave(actionInfo)}>Create</Button>;
      },
    },
  ];

  return { actions, handleOnClick };
}
